"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getTutorCourses() {
  try {
    const session = await auth();

    if (!session?.user?.id) return [];

    const tutor = await db.tutor.findFirst({
      where: { userId: session.user.id },
    });

    if (!tutor) return [];

    const courses = await db.course.findMany({
      where: { tutorId: tutor.id },
      include: {
        modules: {
          include: { lessons: true },
        },
        enrollments: true,
        reviews: true,
        transactions: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return courses.map((course) => {
      const lessonsCount = course.modules.reduce(
        (sum, m) => sum + m.lessons.length,
        0
      );

      const duration = course.modules.reduce(
        (sum, m) =>
          sum + m.lessons.reduce((lsum, l) => lsum + (l.duration || 0), 0),
        0
      );

      const studentsCount = course.enrollments.length;
      const avgRating =
        course.reviews.length > 0
          ? course.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
            course.reviews.length
          : 0;

      const earnings =
        course.transactions?.reduce((sum, tx) => sum + (tx.amount || 0), 0) ??
        0;

      return {
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnail ?? null,
        status: course.status.toLowerCase() as "draft" | "published",
        isPopular: studentsCount > 1000, // simple heuristic
        lessonsCount,
        duration,
        studentsCount,
        avgRating,
        earnings,
        growth: 0, // placeholder
        completionRate: 0, // placeholder
        updatedAt: course.updatedAt.toISOString(),
      };
    });
  } catch (error) {
    console.error("❌ Error fetching tutor courses:", error);
    return [];
  }
}

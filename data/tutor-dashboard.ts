"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getTutorDashboardData() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const tutor = await db.tutor.findFirst({
    where: { userId: session.user.id },
  });
  if (!tutor) return null;

  // --- Core Stats ---
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
  });

  const totalStudents = courses.reduce(
    (sum, c) => sum + c.enrollments.length,
    0
  );

  const totalEarnings = courses.reduce(
    (sum, c) =>
      sum + c.transactions.reduce((txSum, tx) => txSum + (tx.amount || 0), 0),
    0
  );

  const monthlyEarnings = await db.transaction.aggregate({
    where: {
      course: { tutorId: tutor.id },
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    _sum: { amount: true },
  });

  const coursesSold = courses.reduce((sum, c) => sum + c.enrollments.length, 0);

  const averageRating = (() => {
    const allReviews = courses.flatMap((c) => c.reviews);
    if (allReviews.length === 0) return 0;
    return (
      allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
      allReviews.length
    );
  })();

  // --- Courses Summary ---
  const coursesSummary = courses.map((c) => ({
    id: c.id,
    title: c.title,
    students: c.enrollments.length,
    rating:
      c.reviews.length > 0
        ? c.reviews.reduce((sum, r) => sum + r.rating, 0) / c.reviews.length
        : 0,
    earnings: c.transactions.reduce((txSum, tx) => txSum + (tx.amount || 0), 0),
    status: c.status.toLowerCase(),
    thumbnail: c.thumbnail,
    lastUpdated: c.updatedAt.toLocaleDateString(),
  }));

  // --- Mock placeholders (to be wired later) ---
  const upcomingMentorships: any = []; // db.mentorshipSession.findMany(...)
  const pendingProjects: any = []; // db.project.findMany(...)
  const recentActivity: any = []; // WebSocket/notifications later

  return {
    stats: {
      totalStudents,
      totalEarnings,
      monthlyEarnings: monthlyEarnings._sum.amount || 0,
      coursesSold,
      averageRating,
      totalReviews: courses.reduce((sum, c) => sum + c.reviews.length, 0),
      mentorshipSessions: 0,
      projectsGraded: 0,
    },
    courses: coursesSummary,
    upcomingMentorships,
    pendingProjects,
    recentActivity,
    performance: {
      completionRate: tutor.completionRate || 0,
      satisfaction: tutor.averageRating || 0,
      responseTime: tutor.responseTime || 24,
    },
  };
}

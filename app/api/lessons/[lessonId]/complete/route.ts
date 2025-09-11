import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  try {
    // 1. Find the enrollment for this user & lesson’s course
    const enrollment = await db.enrollment.findFirst({
      where: {
        userId: session.user.id,
        course: {
          modules: {
            some: {
              lessons: {
                some: { id: lessonId },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found for this course" },
        { status: 400 }
      );
    }

    // 2. Upsert lesson progress correctly
    await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: { isCompleted: true },
      create: {
        userId: session.user.id,
        enrollmentId: enrollment.id, // ✅ correct foreign key
        lessonId,
        isCompleted: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lesson completion error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

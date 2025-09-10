import { db } from "@/lib/db";

export async function getPublicCourses() {
  return db.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: true,
      tags: true,
      tutor: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCourseById(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
        category: true,
        modules: {
          include: {
            lessons: true,
            quizzes: true,
            resources: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        enrollments: true,
      },
    });
    return course;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
}
export async function getCourseWithModules(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        tutor: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        modules: {
          include: {
            lessons: {
              orderBy: { sortOrder: "asc" },
            },
          },
          orderBy: { sortOrder: "asc" },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        category: true,
      },
    });
    return course;
  } catch (error) {
    console.error("❌ Error fetching course with modules:", error);
    return null;
  }
}

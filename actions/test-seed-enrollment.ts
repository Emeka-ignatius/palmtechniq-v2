import { db } from "@/lib/db";

export async function seedEnrollment() {
  const userId = "cmf07m83h0007fdtcrbeuzrop";
  const courseId = "cmfet5gd4000ifdt82i46cz1u";

  try {
    const enrollment = await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      update: {}, // nothing to update if it already exists
      create: {
        userId,
        courseId,
        progress: 0,
        status: "ACTIVE", // 👈 must match your EnrollmentStatus enum
      },
    });

    console.log("✅ Enrollment seeded:", enrollment);
  } catch (error) {
    console.error("❌ Error seeding enrollment:", error);
  } finally {
    await db.$disconnect();
  }
}

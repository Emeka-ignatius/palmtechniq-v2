"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getIO } from "@/lib/socket";

import { courseSchema, moduleSchema, lessonSchema } from "@/schemas";
import { z } from "zod";
import { notify } from "@/lib/notify";

export async function updateCourse(
  courseId: string,
  values: z.infer<typeof courseSchema>,
  modules: any[],
  isPublished: boolean
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Validate course fields
    const validatedCourse = courseSchema.safeParse(values);
    if (!validatedCourse.success) {
      return {
        error: validatedCourse.error.issues[0].message || "Invalid data",
      };
    }

    // Ensure tutor owns the course
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: { tutor: true },
    });

    if (!course) return { error: "Course not found" };
    if (course.tutor?.userId !== session.user.id) {
      return { error: "Unauthorized to update this course" };
    }

    const existingTags = await db.courseTag.findMany({
      where: { name: { in: validatedCourse.data.tags } },
      select: { id: true, name: true },
    });

    const connectTags = existingTags.map((tag) => ({ id: tag.id }));

    const newTagNames = validatedCourse.data.tags.filter(
      (tagName) => !existingTags.some((t) => t.name === tagName)
    );

    const createTags = newTagNames.map((name) => ({ name }));

    const {
      isPublished: _isPublished,
      allowDiscussions,
      ...safeData
    } = validatedCourse.data;

    console.log("🔎 Category id to connect:", validatedCourse.data.category);

    await db.course.update({
      where: { id: courseId },
      data: {
        ...safeData,
        outcomes: validatedCourse.data.outcomes,
        certificate: validatedCourse.data.certificate ?? false,
        allowDiscussions: allowDiscussions ?? false,
        status: isPublished ? "PUBLISHED" : "DRAFT",
        updatedAt: new Date(),
        category: {
          connect: { id: validatedCourse.data.category },
        },
        tags: {
          connect: connectTags,
          create: createTags,
        },
      },
    });

    // Handle modules + lessons
    for (const module of modules) {
      const validatedModule = moduleSchema.safeParse(module);
      if (!validatedModule.success) continue;

      let savedModule;

      if (module.id) {
        const existingModule = await db.courseModule.findUnique({
          where: { id: module.id },
        });

        if (existingModule) {
          savedModule = await db.courseModule.update({
            where: { id: module.id },
            data: {
              title: module.title,
              description: module.description,
              content: module.content,
              duration: module.duration,
              sortOrder: module.sortOrder,
              isPublished: module.isPublished,
            },
          });
        } else {
          // Create new module
          savedModule = await db.courseModule.create({
            data: {
              title: module.title,
              description: module.description,
              content: module.content,
              duration: module.duration,
              sortOrder: module.sortOrder,
              isPublished: module.isPublished,
              courseId,
            },
          });
        }
      } else {
        // Definitely a new module
        savedModule = await db.courseModule.create({
          data: {
            title: module.title,
            description: module.description,
            content: module.content,
            duration: module.duration,
            sortOrder: module.sortOrder,
            isPublished: module.isPublished,
            courseId,
          },
        });
      }

      for (const lesson of module.lessons || []) {
        const validatedLesson = lessonSchema.safeParse(lesson);
        // console.log("📦 Raw lesson from payload:", lesson);

        if (!validatedLesson.success) continue;

        const l = validatedLesson.data;

        if (lesson.id) {
          const existingLesson = await db.lesson.findUnique({
            where: { id: lesson.id },
          });

          if (existingLesson) {
            await db.lesson.update({
              where: { id: lesson.id },
              data: {
                title: l.title,
                description: l.description,
                lessonType: l.lessonType,
                duration: l.duration,
                content: l.content,
                videoUrl: l.videoUrl,
                sortOrder: l.sortOrder,
                isPreview: l.isPreview,
              },
            });
          } else {
            await db.lesson.create({
              data: {
                title: l.title,
                description: l.description,
                lessonType: l.lessonType,
                duration: l.duration,
                content: l.content ?? "",
                videoUrl: l.videoUrl,
                sortOrder: l.sortOrder,
                isPreview: l.isPreview,
                moduleId: savedModule.id,
              },
            });
          }
        }
      }
    }

    try {
      const io = getIO();
      if (io) {
        await notify.role("STUDENT", {
          type: "success",
          title: "Course Updated",
          message: `A Course you purchased "${course.title}" has just been updated!`,
          actionUrl: `/courses/${courseId}`,
          actionLabel: "View Course",
        });

        await notify.role("TUTOR", {
          type: "info",
          title: "Your Course Updated",
          message: `You updated “${course.title}”.`,
          actionUrl: `/tutor/courses/${courseId}/edit`,
          actionLabel: "Open Course",
        });

        await notify.role("ADMIN", {
          type: "info",
          title: "Course Updated",
          message: `Tutor updated “${course.title}”. Review changes.`,
          actionUrl: `/courses/${courseId}`,
          actionLabel: "Review Changes",
          metadata: { courseId },
        });
      }
    } catch (e) {
      console.warn("⚠️ Socket.IO not initialized yet, skipping emit");
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error updating course:", error);
    return { error: "Something went wrong while updating the course" };
  }
}

export async function publishCourse(courseId: string) {
  try {
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: { status: "PUBLISHED" },
    });

    // 🔔 Emit notification
    try {
      const io = getIO();
      if (io) {
        io.emit("notification", {
          type: "success",
          title: "Course Published",
          message: `The course "${updatedCourse.title}" is now live!`,
          actionUrl: `/courses/${updatedCourse.id}`,
          actionLabel: "View Course",
        });
      }
    } catch (e) {
      console.warn("⚠️ Socket.IO not initialized yet, skipping emit");
    }

    return { success: true, course: updatedCourse };
  } catch (error) {
    console.error("Error publishing course:", error);
    return { success: false, error: "Failed to publish course" };
  }
}

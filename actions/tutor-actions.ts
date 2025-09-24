// File: app/lib/actions/tutor-actions.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import slugify from "slugify";

import { courseSchema, lessonSchema, moduleSchema } from "@/schemas";
import { z } from "zod";
import { toSlug } from "@/lib/utils";
import { notify } from "@/lib/notify";
import { getIO } from "@/lib/socket";

export async function createCourse(data: any, modulesData: any[] = []) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "TUTOR") {
    return { error: "Unauthorized" };
  }
  // console.log("Looking for tutor with userId:", session.user.id);

  try {
    const validatedData = courseSchema.safeParse({
      ...data,
      level: data.level.toUpperCase().replace(" ", "_"),
      flashSaleEnd: data.flashSaleEnd ? new Date(data.flashSaleEnd) : undefined,
    });

    if (!validatedData.success) {
      return { error: validatedData.error.issues[0].message };
    }

    // const tutors = await db.tutor.findMany();
    // console.log("All tutors Prisma sees:", tutors);

    // console.log("Session userId raw:", session.user.id);
    // console.log("Session userId trimmed:", session.user.id.trim());

    const tutor = await db.tutor.findFirst({
      where: { userId: session.user.id.trim() },
    });

    // console.log("Tutor found:", tutor);

    if (!tutor) {
      throw new Error(
        "Tutor profile not found for this user. Please contact support."
      );
    }

    const course = await db.course.create({
      data: {
        title: validatedData.data.title,
        subtitle: validatedData.data.subtitle,
        description: validatedData.data.description,
        category: {
          connect: { name: validatedData.data.category },
        },
        level: validatedData.data.level as any,
        language: validatedData.data.language,
        price: validatedData.data.price,
        basePrice: validatedData.data.basePrice,
        currentPrice:
          validatedData.data.currentPrice || validatedData.data.price,
        demandLevel:
          validatedData.data.basePrice && validatedData.data.currentPrice
            ? validatedData.data.currentPrice <
              validatedData.data.basePrice * 0.7
              ? "high"
              : validatedData.data.currentPrice <
                validatedData.data.basePrice * 0.9
              ? "medium"
              : "low"
            : undefined,
        requirements: validatedData.data.requirements,
        outcomes: validatedData.data.outcomes,

        isFlashSale: validatedData.data.isFlashSale,
        duration: validatedData.data.duration,
        flashSaleEnd: validatedData.data.flashSaleEnd,

        publishedAt: validatedData.data.isPublished ? new Date() : null,
        slug: toSlug(validatedData.data.title),

        groupBuyingEnabled: validatedData.data.groupBuyingEnabled,
        groupBuyingDiscount: validatedData.data.groupBuyingDiscount,
        thumbnail: validatedData.data.thumbnail,
        previewVideo: validatedData.data.previewVideo,
        status: validatedData.data.isPublished ? "PUBLISHED" : "DRAFT",
        creator: { connect: { id: session.user.id } },
        tutor: { connect: { id: tutor.id } },
      },
    });

    // Create tags
    if (validatedData.data.tags.length > 0) {
      await db.courseTag.createMany({
        data: validatedData.data.tags.map((tag) => ({
          courseId: course.id,
          name: tag,
        })),
      });
    }

    // Create modules and lessons
    for (const mod of modulesData) {
      const validatedModule = moduleSchema.safeParse(mod);

      if (!validatedModule.success) {
        throw new Error(validatedModule.error.issues[0].message);
      }

      const newModule = await db.courseModule.create({
        data: {
          title: validatedModule.data.title,
          description: validatedModule.data.description,
          sortOrder: validatedModule.data.sortOrder,
          duration: validatedModule.data.duration || 0,
          isPublished: validatedModule.data.isPublished,
          courseId: course.id,
        },
      });

      for (const lesson of mod.lessons || []) {
        const validatedLesson = lessonSchema.safeParse(lesson);
        if (!validatedLesson.success) {
          throw new Error(validatedLesson.error.issues[0].message);
        }
        await db.lesson.create({
          data: {
            title: validatedLesson.data.title,
            lessonType: validatedLesson.data.lessonType,
            duration: validatedLesson.data.duration,
            content: validatedLesson.data.content,
            videoUrl: validatedLesson.data.videoUrl,
            sortOrder: validatedLesson.data.sortOrder,
            description: validatedLesson.data.description,
            isPreview: validatedLesson.data.isPreview,
            moduleId: newModule.id,
          },
        });
      }
    }

    await notify.user(session.user.id, {
      type: "success",
      title: "Course Created",
      message: `“${course.title}” has been created${
        validatedData.data.isPublished ? " and published" : ""
      }.`,
      actionUrl: `/tutor/courses/${course.id}/edit`,
      actionLabel: "Continue Editing",
      metadata: { courseId: course.id },
    });

    if (validatedData.data.isPublished) {
      await notify.role("STUDENT", {
        type: "course",
        title: "New Course is Live",
        message: `“${course.title}” is now available.`,
        actionUrl: `/courses/${course.id}`,
        actionLabel: "View Course",
        metadata: {
          courseId: course.id,
          category: validatedData.data.category,
        },
      });
    }

    return { success: true, courseId: course.id };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      error:
        error instanceof z.ZodError
          ? error.issues[0].message
          : "Failed to create course",
    };
  }
}

export async function addModuleToCourse(courseId: string, moduleData: any) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const course = await db.course.findUnique({ where: { id: courseId } });
    if (course?.creatorId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    const validatedModule = moduleSchema.safeParse(moduleData);
    if (!validatedModule.success) {
      return { error: validatedModule.error.issues[0].message };
    }

    const newModule = await db.courseModule.create({
      data: {
        title: validatedModule.data.title,
        description: validatedModule.data.description,
        duration: validatedModule.data.duration || 0,
        sortOrder: validatedModule.data.sortOrder,
        isPublished: validatedModule.data.isPublished,
        courseId,
      },
    });

    const io = getIO();
    if (io) {
      const sockets = await io.in(`course:${courseId}`).allSockets();
      console.log(
        `course:${courseId} ${newModule.id} sockets = ${sockets.size}`
      );
    }
    await notify.course(courseId, {
      type: "info",
      title: "New Module Added",
      message: `Module “${newModule.title}” was added to “${course?.title}”.`,
      actionUrl: `/courses/${courseId}`,
      actionLabel: "Open Course",
      metadata: { courseId, moduleId: newModule.id },
    });

    return { success: true, moduleId: newModule.id };
  } catch (error) {
    console.error("Error adding module:", error);
    return { error: "Failed to add module" };
  }
}

export async function removeModuleFromCourse(
  courseId: string,
  moduleId: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const module = await db.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (!module || module.course.creatorId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    await db.courseModule.delete({ where: { id: moduleId } });

    await notify.course(courseId, {
      type: "warning",
      title: "Module Removed",
      message: `Module “${module.title}” was removed from “${module.course.title}”.`,
      actionUrl: `/courses/${courseId}`,
      actionLabel: "Open Course",
      metadata: { courseId, moduleId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing module:", error);
    return { error: "Failed to remove module" };
  }
}
export async function addLessonToModule(
  courseId: string,
  moduleId: string,
  lessonData: any
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const module = await db.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (module?.course.creatorId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    const validatedLesson = lessonSchema.safeParse(lessonData);
    if (!validatedLesson.success) {
      return { error: validatedLesson.error.issues[0].message };
    }

    const newLesson = await db.lesson.create({
      data: {
        title: validatedLesson.data.title,
        lessonType: validatedLesson.data.lessonType,
        duration: validatedLesson.data.duration,
        content: validatedLesson.data.content,
        videoUrl: validatedLesson.data.videoUrl,
        sortOrder: validatedLesson.data.sortOrder,
        description: validatedLesson.data.description,
        isPreview: validatedLesson.data.isPreview,
        moduleId,
      },
    });

    const io = getIO();
    if (io) {
      const sockets = await io.in(`course:${courseId}`).allSockets();
      console.log(
        `course:${courseId},${newLesson.id} sockets = ${sockets.size}`
      );
    }
    await notify.course(courseId, {
      type: "info",
      title: "New Lesson Added",
      message: `Lesson “${newLesson.title}” was added to module “${module?.title}”.`,
      actionUrl: `/courses/${courseId}`,
      actionLabel: "Open Course",
      metadata: { courseId, moduleId, lessonId: newLesson.id },
    });

    return { success: true, lessonId: newLesson.id };
  } catch (error) {
    console.error("Error adding lesson:", error);
    return { error: "Failed to add lesson" };
  }
}

export async function removeLessonFromModule(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { course: true } } },
    });

    if (!lesson || lesson.module.course.creatorId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    await db.lesson.delete({ where: { id: lessonId } });

    await notify.course(courseId, {
      type: "warning",
      title: "Lesson Removed",
      message: `Lesson “${lesson.title}” was removed from module “${lesson.module.title}” in “${lesson.module.course.title}” .`,
      actionUrl: `/courses/${courseId}`,
      actionLabel: "Open Course",
      metadata: { courseId, moduleId, lessonId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing lesson:", error);
    return { error: "Failed to remove lesson" };
  }
}

export async function uploadCourseFile(
  formData: FormData,
  type: "thumbnail" | "video"
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "TUTOR") {
    return { error: "Unauthorized" };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        type,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { error: data.error || "Failed to generate upload URL" };
    }

    const { url, fields } = data;

    const uploadFormData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
      uploadFormData.append(key, value as string)
    );
    uploadFormData.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      return { error: `Failed to upload ${type}` };
    }

    return { success: true, url: `${url}${fields.key}` };
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    return { error: `Failed to upload ${type}` };
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

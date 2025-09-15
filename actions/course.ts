"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { courseSchema, moduleSchema, lessonSchema } from "@/schemas";
import { z } from "zod";

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
      certificateEnabled,
      allowDiscussions,
      ...safeData
    } = validatedCourse.data;

    console.log("🔎 Category id to connect:", validatedCourse.data.category);

    await db.course.update({
      where: { id: courseId },
      data: {
        ...safeData,
        outcomes: validatedCourse.data.outcomes, // 🔄 map it here
        certificate: validatedCourse.data.certificateEnabled,
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
        // Update existing module
        savedModule = await db.courseModule.update({
          where: { id: module.id },
          data: {
            title: module.title,
            description: module.description,
            content: module.content,
            duration: module.duration,
            sortOrder: module.order,
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
            sortOrder: module.order,
            isPublished: module.isPublished,
            courseId,
          },
        });
      }

      // Lessons inside module
      for (const lesson of module.lessons || []) {
        const validatedLesson = lessonSchema.safeParse(lesson);
        if (!validatedLesson.success) continue;

        if (lesson.id) {
          // Update existing lesson
          await db.lesson.update({
            where: { id: lesson.id },
            data: {
              title: lesson.title,
              description: lesson.description,
              lessonType: lesson.type,
              duration: lesson.duration,
              content: lesson.content,
              videoUrl: lesson.videoUrl,
              sortOrder: lesson.order,
              isPreview: lesson.isPreview,
            },
          });
        } else {
          await db.lesson.create({
            data: {
              title: lesson.title,
              description: lesson.description,
              lessonType: lesson.type,
              duration: lesson.duration,
              content: lesson.content,
              videoUrl: lesson.videoUrl,
              sortOrder: lesson.order,
              isPreview: lesson.isPreview,
              moduleId: savedModule.id,
            },
          });
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error updating course:", error);
    return { error: "Something went wrong while updating the course" };
  }
}

// export async function updateCourse(input: unknown) {
//   const parsed = updateCourseSchema.safeParse(input);
//   if (!parsed.success) {
//     return { success: false, error: parsed.error.flatten().fieldErrors };
//   }

//   const data = parsed.data;

//   try {
//     const updatedCourse = await db.course.update({
//       where: { id: data.id },
//       data: {
//         title: data.title,
//         subtitle: data.subtitle,
//         description: data.description,
//         categoryId: data.category, // ⚡ you may need to map category string → ID
//         level: data.level,
//         language: data.language,
//         price: data.price,
//         basePrice: data.basePrice,
//         currentPrice: data.currentPrice,
//         currency: data.currency,
//         thumbnail: data.thumbnail,
//         previewVideo: data.previewVideo,
//         requirements: data.requirements,
//         outcomes: data.learningOutcomes,
//         duration: data.duration,
//         totalLessons: data.totalLessons,
//         isFlashSale: data.isFlashSale,
//         flashSaleEnd: data.flashSaleEnd ? new Date(data.flashSaleEnd) : null,
//         groupBuyingEnabled: data.groupBuyingEnabled,
//         groupBuyingDiscount: data.groupBuyingDiscount,
//         certificate: data.certificate,
//         status: data.isPublished ? "PUBLISHED" : "DRAFT",

//         // New fields
//         targetAudience: data.targetAudience,
//         metaTitle: data.metaTitle,
//         metaDescription: data.metaDescription,
//         demandLevel: data.demandLevel,
//       },
//     });

//     return { success: true, course: updatedCourse };
//   } catch (error) {
//     console.error("Error updating course:", error);
//     return { success: false, error: "Failed to update course" };
//   }
// }

// export async function updateCourse(
//   courseId: string,
//   data: Partial<Pick<Course, "title" | "status">>
// ) {
//   try {
//     const updatedCourse = await db.course.update({
//       where: { id: courseId },
//       data,
//     });
//     return { success: true, course: updatedCourse };
//   } catch (error) {
//     console.error("Error updating course:", error);
//     return { success: false, error: "Failed to update course" };
//   }
// }

export async function publishCourse(courseId: string) {
  try {
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: { status: "PUBLISHED" },
    });
    return { success: true, course: updatedCourse };
  } catch (error) {
    console.error("Error publishing course:", error);
    return { success: false, error: "Failed to publish course" };
  }
}

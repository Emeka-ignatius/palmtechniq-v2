import { notFound } from "next/navigation";

import { getCourseById } from "@/data/course";
import { CourseEditClient } from "@/components/pages/tutor/edit-course/course-edit-client";
import { db } from "@/lib/db";

export default async function CourseEditPage(props: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await props.params;
  const categories = await db.category.findMany({
    select: { id: true, name: true },
  });

  const course = await getCourseById(courseId);

  if (!course) return notFound();

  return <CourseEditClient course={course} categories={categories} />;
}

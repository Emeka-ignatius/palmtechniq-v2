import { getCategories } from "@/actions/tutor-actions";
import { HeroSection } from "@/components/hero-section";
import CoursesGrid from "@/components/pages/courses/course-grid";
import { getPublicCourses } from "@/data/course";

export default async function CoursesPage() {
  const courses = await getPublicCourses();
  const categoriesResponse = await getCategories();

  const categories = categoriesResponse.success
    ? categoriesResponse.categories
    : [];

  return (
    <div className="">
      <HeroSection />
      <CoursesGrid courses={courses} categories={categories} />
    </div>
  );
}

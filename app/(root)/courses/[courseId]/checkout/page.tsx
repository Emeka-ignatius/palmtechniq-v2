import CheckoutCoursePage from "@/components/pages/courses/checkout/checkout-course";
import { getCourseById } from "@/data/course";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const p = await params;
  const courseId = p.courseId;

  const course = await getCourseById(courseId);
  return (
    <div>
      <CheckoutCoursePage
        duration={course?.duration}
        instructor={course?.tutor}
        rating={course?.reviews.length}
      />
    </div>
  );
}

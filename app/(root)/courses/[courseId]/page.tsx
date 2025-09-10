import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseHero from "@/components/pages/courses/courseId/course-slug-hero";
import CoursePreview from "@/components/pages/courses/courseId/course-slug-preview";
import CurriculumTab from "@/components/pages/courses/courseId/curriculumtab";
import InstructorTab from "@/components/pages/courses/courseId/instructortab";
import OverviewTab from "@/components/pages/courses/courseId/overviewtab";
import ReviewsTab from "@/components/pages/courses/courseId/review-tab";
import StickyPurchaseCard from "@/components/pages/courses/courseId/stickyPurchaseCard";
import { getCourseById } from "@/data/course";

export default async function CourseSlugPage(props: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await props.params;
  const course = await getCourseById(courseId);

  if (!course) {
    return <div className="">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CourseHero
              {...course}
              tutor={
                course.tutor
                  ? {
                      user: {
                        name: course.tutor.user.name,
                        image: course.tutor.user.avatar || undefined,
                      },
                    }
                  : { user: { name: "Unknown Tutor", image: undefined } }
              }
            />
            <CoursePreview
              thumbnail={course.thumbnail!}
              previewVideo={course.previewVideo!}
            />

            <Tabs defaultValue="overview" className="mt-6 w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 text-white backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <OverviewTab
                  description={course.description}
                  outcomes={course.outcomes}
                  requirements={course.requirements}
                />
              </TabsContent>
              <TabsContent value="curriculum">
                <CurriculumTab modules={course.modules} />
              </TabsContent>
              <TabsContent value="instructor">
                <InstructorTab
                  tutor={
                    course.tutor || {
                      user: { name: "Unknown Tutor", image: undefined },
                    }
                  }
                />
              </TabsContent>
              <TabsContent value="reviews">
                <ReviewsTab reviews={course.reviews} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <StickyPurchaseCard
              currentPrice={course.currentPrice!}
              originalPrice={course.basePrice!}
              discount={course.groupBuyingDiscount!}
              duration={`${course.duration} mins`}
              lessons={course.totalLessons}
              level={course.level}
              language={course.language}
              certificate={course.certificate!}
              isEnrolled={false}
              isInCart={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

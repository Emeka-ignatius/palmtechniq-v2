"use client";

import { updateCourse } from "@/actions/course";
import { CourseBasicForm } from "@/components/component/forms/create-course/course-basic-form";
import { CourseCurriculumForm } from "@/components/component/forms/create-course/course-curriculum-form";
import { CoursePricingForm } from "@/components/component/forms/create-course/course-pricing-form";
import { CourseSettingsForm } from "@/components/component/forms/create-course/course-settings-form";
import { NairaSign } from "@/components/shared/naira-sign-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, FileText, Settings } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categories: { id: string; name: string }[] = [
  { id: "cmfar9u390000fd1gw9f75qga", name: "Web Development" },
  { id: "cmfar9vrm0001fd1g8almpj1f", name: "Mobile Development" },
  { id: "cmfar9wrc0002fd1g9qkfx3yv", name: "Data Science" },
  { id: "cmfar9xvb0003fd1gqntzi3j4", name: "Machine Learning" },
  { id: "cmfar9ywt0004fd1gq6anbxmn", name: "UI/UX Design" },
  { id: "cmfara03d0005fd1grcbxxvx0", name: "Digital Marketing" },
  { id: "cmfara12w0006fd1g7pkbaabu", name: "Business" },
  { id: "cmfara26u0007fd1gonrbj5cj", name: "Entrepreneurship" },
  { id: "cmfara3ax0008fd1gfuzw13oj", name: "Finance & Accounting" },
  { id: "cmfara4i00009fd1gcfkhieyd", name: "Leadership & Management" },
  { id: "cmfara5w4000afd1ghx1xj8f7", name: "Personal Development" },
  { id: "cmfara6vs000bfd1g29m6ndc4", name: "Productivity" },
  { id: "cmfara7vb000cfd1gn8epux3l", name: "Photography" },
  { id: "cmfara97i000dfd1ghtt2p3br", name: "Graphic Design" },
  { id: "cmfaraaa8000efd1grxz6489o", name: "Music" },
  { id: "cmfarabj9000ffd1g1j5yv87v", name: "Film & Video" },
  { id: "cmfaracyg000gfd1gyu3ku19l", name: "Language Learning" },
  { id: "cmfarae61000hfd1g973qlulm", name: "Health & Fitness" },
  { id: "cmfaraf9y000ifd1gh02ore3m", name: "Nutrition & Diet" },
  { id: "cmfaragey000jfd1gw6x2p4yk", name: "Lifestyle" },
  { id: "cmfarahfn000kfd1gyufgu656", name: "Cooking" },
  { id: "cmfaraivn000lfd1gz2rf2qev", name: "Art & Creativity" },
  { id: "cmfarak3a000mfd1gnu0vijrw", name: "Cybersecurity" },
  { id: "cmfaral7c000nfd1g82q30roi", name: "Cloud Computing" },
  { id: "cmfaramb4000ofd1ge1cqfbbc", name: "DevOps" },
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export function CourseEditClient({
  course,
  categories,
}: {
  course: any;
  categories: { id: string; name: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState({
    thumbnail: false,
    video: false,
  });
  const [lessonUploading, setLessonUploading] = useState(false);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      ...course,
      isPublished: course.isPublished ?? false,
      category: course.category?.id || "",
      certificateEnabled: course.certificate,
      tags: course.tags || [],
      targetAudience: course.targetAudience || [],
      metaTitle: course.metaTitle || "",
      metaDescription: course.metaDescription || "",
      requirements: course.requirements || [],
      outcomes: course.outcomes || [],
    },
  });

  const [modules, setModules] = useState(course.modules || []);

  // 📌 Tags
  const [currentTag, setCurrentTag] = useState("");

  const addTag = () => {
    if (
      currentTag.trim() &&
      !form.getValues("tags").includes(currentTag.trim())
    ) {
      form.setValue("tags", [...form.getValues("tags"), currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagToRemove)
    );
  };

  // 📌 Requirements
  const [currentRequirement, setCurrentRequirement] = useState("");

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      form.setValue("requirements", [
        ...form.getValues("requirements"),
        currentRequirement.trim(),
      ]);
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    form.setValue(
      "requirements",
      form.getValues("requirements").filter((_, i) => i !== index)
    );
  };

  // 🎯 Outcomes
  const [currentOutcome, setCurrentOutcome] = useState("");

  const addLearningOutcome = () => {
    if (currentOutcome.trim()) {
      form.setValue("outcomes", [
        ...form.getValues("outcomes"),
        currentOutcome.trim(),
      ]);
      setCurrentOutcome("");
    }
  };

  const removeLearningOutcome = (index: number) => {
    form.setValue(
      "outcomes",
      form.getValues("outcomes").filter((_, i) => i !== index)
    );
  };

  const addModule = () => {
    const newModule = {
      title: `Module ${modules.length + 1}`,
      description: "",
      content: "",
      duration: 0,
      lessons: [],
      order: modules.length,
      isPublished: false,
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (e: React.MouseEvent, moduleId: string) => {
    e.preventDefault();
    setModules(modules.filter((m: any) => m.id !== moduleId));
  };

  const updateModule = (
    moduleId: string,
    updates: Partial<(typeof modules)[0]>
  ) => {
    setModules(
      modules.map((m: any) => (m.id === moduleId ? { ...m, ...updates } : m))
    );
  };

  const addLesson = (moduleId: string) => {
    setModules(
      modules.map((m: any) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  title: `Lesson ${m.lessons.length + 1}`,
                  type: "VIDEO",
                  duration: 0,
                  order: m.lessons.length,
                  isPreview: false,
                },
              ],
            }
          : m
      )
    );
  };

  const removeLesson = (
    e: React.MouseEvent,
    moduleId: string,
    lessonId: string
  ) => {
    e.preventDefault();
    setModules(
      modules.map((m: any) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l: any) => l.id !== lessonId) }
          : m
      )
    );
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<any>
  ) => {
    setModules(
      modules.map((m: any) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l: any) =>
                l.id === lessonId ? { ...l, ...updates } : l
              ),
            }
          : m
      )
    );
  };
  const onSubmit = (
    values: z.infer<typeof courseSchema>,
    isPublished: boolean
  ) => {
    startTransition(async () => {
      try {
        const res = await updateCourse(course.id, values, modules, isPublished);

        if (res.error) {
          toast.error(res.error);
          console.error("❌ Update failed:", res.error);
        } else {
          toast.success(
            isPublished ? "Course published!" : "Course saved as draft"
          );
          console.log("✅ Course updated:", res);
        }
      } catch (error) {
        console.error("❌ Error calling updateCourse:", error);
        toast.error("Something went wrong while updating");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <Card className="glass-card border-white/10 hover-glow">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => onSubmit(data, false))}
                  className="space-y-8">
                  <Tabs defaultValue="details" className="w-full">
                    {/* Tab Navigation */}
                    <TabsList className="grid w-full text-wrap text-white grid-cols-4 mb-8 bg-transparent">
                      <TabsTrigger
                        value="details"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Details
                      </TabsTrigger>{" "}
                      <TabsTrigger
                        value="content"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Content
                      </TabsTrigger>{" "}
                      <TabsTrigger
                        value="pricing"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange data-[state=active]:to-yellow-400 data-[state=active]:text-white">
                        <NairaSign className="w-4 h-4 mr-2" />
                        Pricing
                      </TabsTrigger>{" "}
                      <TabsTrigger
                        value="settings"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-pink-400 data-[state=active]:text-white">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </TabsTrigger>{" "}
                    </TabsList>

                    {/* Details Tab */}
                    <TabsContent value="details">
                      <CourseBasicForm
                        form={form}
                        categories={categories}
                        levels={levels}
                        uploading={uploading}
                        setUploading={setUploading}
                        currentTag={currentTag}
                        setCurrentTag={setCurrentTag}
                        addTag={addTag}
                        removeTag={removeTag}
                        currentRequirement={currentRequirement}
                        setCurrentRequirement={setCurrentRequirement}
                        addRequirement={addRequirement}
                        removeRequirement={removeRequirement}
                        currentOutcome={currentOutcome}
                        setCurrentOutcome={setCurrentOutcome}
                        addLearningOutcome={addLearningOutcome}
                        removeLearningOutcome={removeLearningOutcome}
                      />
                    </TabsContent>

                    {/* Curriculum Tab */}
                    <TabsContent value="content">
                      <CourseCurriculumForm
                        modules={modules}
                        addModule={addModule}
                        removeModule={removeModule}
                        updateModule={updateModule}
                        addLesson={addLesson}
                        removeLesson={removeLesson}
                        updateLesson={updateLesson}
                        lessonUploading={lessonUploading}
                        setLessonUploading={setLessonUploading}
                      />
                    </TabsContent>

                    {/* Pricing Tab */}
                    <TabsContent value="pricing">
                      <CoursePricingForm form={form} />
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                      <CourseSettingsForm
                        form={form}
                        modules={modules}
                        onSubmit={onSubmit}
                      />
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

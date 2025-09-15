"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import UploadFile from "@/components/shared/uploader";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

type Props = {
  form: UseFormReturn<any>;
  categories: Category[];
  levels: string[];
  uploading: { thumbnail: boolean; video: boolean };
  setUploading: React.Dispatch<
    React.SetStateAction<{ thumbnail: boolean; video: boolean }>
  >;
  currentTag: string;
  setCurrentTag: (val: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  currentRequirement: string;
  setCurrentRequirement: (val: string) => void;
  addRequirement: () => void;
  removeRequirement: (index: number) => void;
  currentOutcome: string;
  setCurrentOutcome: (val: string) => void;
  addLearningOutcome: () => void;
  removeLearningOutcome: (index: number) => void;
};

export function CourseBasicForm({
  form,
  categories,
  levels,
  uploading,
  setUploading,
  currentTag,
  setCurrentTag,
  addTag,
  removeTag,
  currentRequirement,
  setCurrentRequirement,
  addRequirement,
  removeRequirement,
  currentOutcome,
  setCurrentOutcome,
  addLearningOutcome,
  removeLearningOutcome,
}: Props) {
  const addtag = () => {
    const trimmed = currentTag.trim();
    if (trimmed) {
      const updatedTags = Array.from(
        new Set([...form.getValues("tags"), trimmed])
      );
      form.setValue("tags", updatedTags);
      setCurrentTag("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {/* Basic Info Card */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Course Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subtitle */}
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Subtitle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Duration</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    placeholder="Total course Duration in minutes"
                    className="bg-white/10 border-white/20 text-white"
                    onChange={(e) => {
                      const val = e.target.valueAsNumber;
                      field.onChange(Number.isNaN(val) ? undefined : val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem
                        key={level}
                        value={level.toUpperCase().replace(" ", "_")}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Language</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail Upload */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Course Thumbnail</FormLabel>
                <FormControl>
                  <UploadFile
                    setValue={form.setValue}
                    fieldName="thumbnail"
                    uploading={uploading.thumbnail}
                    setUploading={(value: any) =>
                      setUploading((prev) => ({
                        ...prev,
                        thumbnail:
                          typeof value === "function"
                            ? value(prev.thumbnail)
                            : value,
                      }))
                    }
                  />
                </FormControl>
                {field.value && (
                  <Image
                    width={100}
                    height={100}
                    src={field.value}
                    alt="Thumbnail"
                    className="mt-2 h-24 rounded"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preview Video Upload */}
          <FormField
            control={form.control}
            name="previewVideo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Preview Video</FormLabel>
                <FormControl>
                  <UploadFile
                    setValue={form.setValue}
                    fieldName="previewVideo"
                    uploading={uploading.video}
                    setUploading={(value: any) =>
                      setUploading((prev) => ({
                        ...prev,
                        video:
                          typeof value === "function"
                            ? value(prev.video)
                            : value,
                      }))
                    }
                  />
                </FormControl>
                {field.value && (
                  <video
                    src={field.value}
                    controls
                    className="mt-2 h-24 rounded"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="glass-card border-white/10 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag"
              className="bg-white/10 border-white/20 text-white"
            />
            <Button
              type="button"
              onClick={addTag}
              className="bg-gradient-to-r from-neon-blue to-neon-purple">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(form.getValues("tags") as string[])).map(
              (tag: string) => (
                <Badge key={tag} className="bg-white/10 text-white">
                  {tag}
                  <X
                    className="w-3 h-3 ml-2 cursor-pointer"
                    onClick={(e) => removeTag(tag)}
                  />
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="glass-card border-white/10 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              placeholder="Add a requirement"
              className="bg-white/10 border-white/20 text-white"
            />
            <Button
              type="button"
              onClick={addRequirement}
              className="bg-gradient-to-r from-neon-blue to-neon-purple">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <ul className="list-disc pl-5 text-gray-300">
            {form
              .getValues("requirements")
              .map((req: string, index: number) => (
                <li key={index} className="flex justify-between items-center">
                  {req}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => removeRequirement(index)}
                    className="text-red-400">
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="glass-card border-white/10 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Learning Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentOutcome}
              onChange={(e) => setCurrentOutcome(e.target.value)}
              placeholder="Add a learning outcome"
              className="bg-white/10 border-white/20 text-white"
            />
            <Button
              type="button"
              onClick={addLearningOutcome}
              className="bg-gradient-to-r from-neon-blue to-neon-purple">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <ul className="list-disc pl-5 text-gray-300">
            {form
              .getValues("learningOutcomes")
              .map((outcome: string, index: number) => (
                <li key={index} className="flex justify-between items-center">
                  {outcome}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => removeLearningOutcome(index)}
                    className="text-red-400">
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

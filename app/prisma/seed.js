import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

// const categories = [
//   "Web Development",
//   "Mobile Development",
//   "Data Science",
//   "Machine Learning",
//   "UI/UX Design",
//   "Digital Marketing",
//   "Business",
//   "Entrepreneurship",
//   "Finance & Accounting",
//   "Leadership & Management",
//   "Personal Development",
//   "Productivity",
//   "Photography",
//   "Graphic Design",
//   "Music",
//   "Film & Video",
//   "Language Learning",
//   "Health & Fitness",
//   "Nutrition & Diet",
//   "Lifestyle",
//   "Cooking",
//   "Art & Creativity",
//   "Cybersecurity",
//   "Cloud Computing",
//   "DevOps",
// ];

async function main() {
  // Seed categories
  // for (const name of categories) {
  //   await prisma.category.upsert({
  //     where: { name }, // because name is @unique
  //     update: {}, // if it exists, do nothing
  //     create: {
  //       name,
  //       slug: slugify(name, { lower: true }),
  //       description: `₦{name} related courses`,
  //       isActive: true,
  //     },
  //   });
  // }
  // console.log("✅ Categories seeded successfully");
  // Seed a tutor for an existing user
  // const userId = "cmf07m83h0007fdtcrbeuzrop";
  // const existingTutor = await prisma.tutor.findUnique({
  //   where: { userId },
  // });
  // if (!existingTutor) {
  //   const tutor = await prisma.tutor.create({
  //     data: {
  //       user: { connect: { id: userId } },
  //       title: "Full Stack Developer & Instructor",
  //       expertise: ["JavaScript", "React", "Node.js", "TypeScript"],
  //       experience: 5,
  //       education: ["HND Software Engineering"],
  //       certifications: ["APTECH Certified Developer"],
  //       hourlyRate: 50,
  //       timezone: "Africa/Lagos",
  //       availability: {
  //         monday: ["09:00-12:00", "14:00-18:00"],
  //         tuesday: ["09:00-12:00", "14:00-18:00"],
  //         wednesday: ["09:00-12:00", "14:00-18:00"],
  //         thursday: ["09:00-12:00", "14:00-18:00"],
  //         friday: ["09:00-12:00", "14:00-18:00"],
  //       },
  //     },
  //   });
  //   console.log("✅ Tutor seeded:", tutor.id);
  // } else {
  //   console.log("ℹ️ Tutor already exists:", existingTutor.id);
  // }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.₦disconnect();
  });

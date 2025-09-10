import { getCategories } from "@/actions/tutor-actions";

export async function Categories() {
  const result = await getCategories();
  if (!result.success) {
    return <div>Error loading categories: {result.error}</div>;
  }
  return result.categories;
}

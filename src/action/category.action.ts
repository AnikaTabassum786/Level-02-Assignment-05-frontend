"use server"

import { categoryService } from "@/services/category.service";


export const deleteCategory = async (id: string) => {
  const res = await categoryService.deleteCategoryById(id);
  return res;
};
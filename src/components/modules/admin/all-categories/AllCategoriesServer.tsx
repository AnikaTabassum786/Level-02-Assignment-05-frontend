import { categoryService } from "@/services/category.service";
import { ICategory } from "./categories.interface";
import ALLCategoriesClient from "./AllCategoriesClient";


export default async function AllCategoriesServer() {
  const result = await categoryService.getCategories();  //it calls api

  const categories: ICategory[] = result.data; //This data is an array of ICategory objects.

  return <ALLCategoriesClient categories={categories} />; //The `categories` prop is now being passed to `ALLCategoriesClient`
}
//An interface tells TypeScript:
//"A Category object will contain an id and a name."

export interface ICategory {
  id: string;
  name: string;
}


//IAllCategoriesClientProps tells that, My component will receive a `categories` prop, which is an array of multiple `ICategory` objects.
export interface IAllCategoriesClientProps {
  categories: ICategory[];
}
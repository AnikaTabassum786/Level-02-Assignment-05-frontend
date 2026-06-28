import { IAllCategoriesClientProps } from "./categories.interface";

export default function ALLCategoriesClient({
  categories,
}: IAllCategoriesClientProps) {
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </>
  );
}


// export default function ALLCategoriesClient(props:any) {
//      const categories = props.categories;
//   return (
//     <>
//       {categories.map((category:any) => (
//         <div key={category.id}>{category.name}</div>
//       ))}
//     </>
//   );
// }
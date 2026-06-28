import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { IAllCategoriesClientProps } from "./categories.interface";
import { Button } from "@/components/ui/button";

export default function ALLCategoriesClient({
    categories,
}: IAllCategoriesClientProps) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center ">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories?.map((category, index) => (
                        <TableRow key={category.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell className="text-center">{category.name}</TableCell>
                            <TableCell className="text-center"><Button className="cursor-pointer">Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
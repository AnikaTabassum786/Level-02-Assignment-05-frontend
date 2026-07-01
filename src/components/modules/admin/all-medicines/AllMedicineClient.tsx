

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";




type Medicine = {
    id: string;
    name: string;
    stock: string;
    price: string;
    manufacturer: string;
    imageURL: string | null;
};

export default function AllMedicineClient({ medicines }: {
    medicines: Medicine[];
}) {


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-center">Image</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Price</TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                        <TableHead className="text-center">manufacturer</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {medicines?.map((medicine, index) => {
                        return (
                            <TableRow key={medicine.id}>
                                <TableCell className="text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="text-center">
                                    {medicine.imageURL ? (
                                        <Image
                                            src={medicine.imageURL}
                                            width={80}
                                            height={80}
                                            alt={medicine.name}
                                            className="h-16 w-16 object-cover"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    {medicine.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {medicine.price}
                                </TableCell>
                                <TableCell className="text-center">
                                    {medicine.stock}
                                </TableCell>
                                <TableCell className="text-center">
                                    {medicine.manufacturer}
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
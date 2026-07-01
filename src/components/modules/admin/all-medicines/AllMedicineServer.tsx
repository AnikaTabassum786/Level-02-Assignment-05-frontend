
import { medicineService } from "@/services/medicine.service";
import AllMedicineClient from "./AllMedicineClient";


export default async function AllMedicineServer() {
const result = await medicineService.getMedicines()

const medicines = result?.data
// console.log(medicines)

  return <AllMedicineClient medicines={medicines} />; 
}
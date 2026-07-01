import { env } from "@/env";

const API_URL = env.BACKEND_URL

// export interface MedicineData {
//   name: string;
//   description: string;
//   price: number;       
//   stock: number;
//   manufacturer: string;
//   imageURL?: string;
//   categoryId: string;
//   sellerId?: string;
// }

export const medicineService={
    getMedicines: async () => {
    try {
      const res = await fetch(`${API_URL}/api/medicines`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }

      return await res.json();
    } catch (error) {
      console.error("Medicine fetch error:", error);
      return [];
    }
  },
}

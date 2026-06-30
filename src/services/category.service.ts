import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL

export const categoryService={
    getCategories: async () => {
    try {
  
      const cookieStore = await cookies(); 
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
  
      const res = await fetch(`${API_URL}/api/all-categories`, {
        headers: {
          Cookie: cookieHeader,
        },
        credentials: "include",
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch Items");
      }
  
      return await res.json();
    } catch (error) {
      console.error("Items fetch error:", error);
      return [];
    }
    },

    deleteCategoryById: async (categoryId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/all-categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data?.message };
    }

    return { success: true, message: data?.message };
  } catch (err: any) {
    console.error(err);
    return { success: false, message: "Delete failed" };
  }
  },
}
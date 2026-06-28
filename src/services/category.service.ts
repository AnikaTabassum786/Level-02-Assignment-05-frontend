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
    }
}
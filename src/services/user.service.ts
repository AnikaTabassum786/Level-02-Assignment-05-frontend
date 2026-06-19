/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL + "/api/auth"
const API_URL= env.BACKEND_URL

export const userService ={
    getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      // console.log(session)
      if (!session) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },

   getAllUsers: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Unauthorized or failed" } };
      }

      const users = await res.json(); //getting data from the backend.
      return { data: users, error: null };
    } 

    catch (error) {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },

    banUserById: async (banUserId: string) => {
    try {
      const cookieStore = await cookies();
  
      //request goes to backend. including the userId in the URL.
      //PATCH means: updating existing data.
      const res = await fetch(`${API_URL}/api/users/${banUserId}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(), //Cookie -> API is auth-protected; the backend requires a login session.
        },
        credentials: "include",
      });
  
      const data = await res.json();//Receiving a response from the backend.
  
      if (!res.ok) {
        return { success: false, message: data?.message };
      }
  
      return { success: true, message: data?.message };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: "Delete failed" };
    }
    }
}
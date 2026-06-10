import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL

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
    //  console.log(AUTH_URL,'AUTH_URL')
      const session = await res.json();
      console.log("Session:",session)
      if (!session) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
}
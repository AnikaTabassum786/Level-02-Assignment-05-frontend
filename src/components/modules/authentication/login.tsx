// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState } from "react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";
// import { Input } from "@base-ui/react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { error } from "console";
// import { IoMailOutline } from "react-icons/io5";
// import { IoLockOpenOutline } from "react-icons/io5";
// import * as z from "zod"
// import { useForm } from "@tanstack/react-form"

// const loginSchema = z.object({
//   email: z.string().email("Email is required"),
//   password: z.string().min(1, "Password is required"),
// })

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();


// const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const data = await authClient.signIn.email({
//     email,
//     password,
//   });

//   console.log(data);

 
//   if (data.error) {
//     const message = data.error.message || "";
  

//     if (message.includes("banned") ) {
//       toast.error("Your account is banned.");
//       return;
//     }

//     if (message.includes("deleted") ) {
//       toast.error("Your account was deleted.");
//       return;
//     }

//     toast.error(data.error.message || "Invalid email or password!");
//     return;
//   }

//   toast.success("Login successful!");
//   router.push("/");
// };

//   return (
//     <>
      

//       <section className="flex min-h-screen items-center justify-center">
//               <div className="w-full max-w-md rounded-3xl border p-8 shadow-2xl">
//                 <div className="mb-2 text-center">
//                   <h1 className="text-3xl font-bold">Create Account</h1>
//                   <p className="mt-2 ">
//                     Sign up to get started
//                   </p>
//                 </div>
      
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     form.handleSubmit();
//                   }}
//                   className="space-y-5"
//                 >
                 
      
//                   {/* Email */}
//                   <form.Field
//                     name="email"
//                     children={(field) => (
//                       <div>
//                         <div className="relative">
      
      
//                           <IoMailOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                           <Input
//                             type="email"
//                             placeholder="Email"
//                             value={field.state.value}
//                             onChange={(e) => field.handleChange(e.target.value)}
//                             className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
//                           />
//                         </div>
      
//                         {field.state.meta.errors?.length ? (
//                           <p className="mt-1 text-sm text-red-500">
//                             {field.state.meta.errors[0]?.message}
//                           </p>
//                         ) : null}
//                       </div>
//                     )}
//                   />
      
//                   {/* Password */}
//                   <form.Field
//                     name="password"
//                     children={(field) => (
//                       <div>
//                         <div className="relative">
      
//                           <IoLockOpenOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      
//                           <Input
//                             type="password"
//                             placeholder="Password"
//                             value={field.state.value}
//                             onChange={(e) => field.handleChange(e.target.value)}
//                             className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
//                           />
//                         </div>
      
//                         {field.state.meta.errors?.length ? (
//                           <p className="mt-1 text-sm text-red-500">
//                             {field.state.meta.errors[0]?.message}
//                           </p>
//                         ) : null}
//                       </div>
//                     )}
//                   />
      
                 
      
//                   <Button
//                     type="submit"
//                     className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-lg cursor-pointer"
//                   >
//                     Create Account
//                   </Button>
//                 </form>
      
//                 <p className="mt-6 text-center text-sm text-gray-500">
//                   Already have an account?
//                   <Link
//                     href="/login"
//                     className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
//                   >
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </section>
//     </>
//   );
// };

// export default Login;


"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@base-ui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IoMailOutline, IoLockOpenOutline } from "react-icons/io5";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const data = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (data.error) {
        const message = data.error.message || "";

        if (message.includes("banned")) {
          toast.error("Your account is banned.");
          return;
        }

        if (message.includes("deleted")) {
          toast.error("Your account was deleted.");
          return;
        }

        toast.error(message || "Invalid email or password!");
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    },
  });

  return (
    <section className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border  p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-gray-500">
            Welcome back! Please sign in.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Email */}
          <form.Field
            name="email"
            children={(field) => (
              <div>
                <div className="relative">
                  <IoMailOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 " />

                  <Input
                    type="email"
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-12 w-full rounded-xl border pl-12 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-sm text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          />

          {/* Password */}
          <form.Field
            name="password"
            children={(field) => (
              <div>
                <div className="relative">
                  <IoLockOpenOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 " />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-12 w-full rounded-xl border pl-12 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-sm text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold hover:bg-blue-700 cursor-pointer"
          >
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            href="/signup"
            className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@base-ui/react"
import Link from "next/link";

import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";

import { FaRegUser } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";

const FRONTEND_URL = env.NEXT_PUBLIC_FRONTEND_URL

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const Signup = () => {

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {

      try {
        const data = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: FRONTEND_URL,
        });

        console.log("Signup result:", data);

        if (data) {
          toast.success("User Created Successfully");
          router.push("/");
        } else {
          toast.error("Signup failed");
        }

      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  })

  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border p-8 shadow-2xl">
          <div className="mb-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 ">
              Sign up to get started
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <div>
                  <div className="relative">

                    <FaRegUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      placeholder="Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
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

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => (
                <div>
                  <div className="relative">


                    <IoMailOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
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

                    <IoLockOpenOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      type="password"
                      placeholder="Password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
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

            {/* Confirm Password */}
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <div>
                  <div className="relative">

                    <IoLockOpenOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 w-full rounded-xl border  pl-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
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
              className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-lg cursor-pointer"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

    </>
  );
};

export default Signup;
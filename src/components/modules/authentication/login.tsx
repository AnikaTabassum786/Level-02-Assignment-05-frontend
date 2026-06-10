"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@base-ui/react";
import { useRouter } from "next/navigation";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await authClient.signIn.email({
        email,
        password,
      });

      console.log(data);
       router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center mt-20">
        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-sm min-w-sm flex-col gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            className="p-2 border-2 rounded-lg"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            className="p-2 border-2 rounded-lg"
          />

          <Button
            type="submit"
            className="w-full bg-black text-white cursor-pointer"
            variant="outline"
          >
            Login
          </Button>
        </form>
      </section>

      <p className="flex justify-center mt-4">
        Need an account?
        <span className="underline mx-2 cursor-pointer">
          <Link href="/signup">Sign up</Link>
        </span>
      </p>
    </>
  );
};

export default Login;
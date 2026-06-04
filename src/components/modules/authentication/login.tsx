import { Button } from "@/components/ui/button"
import { Input } from "@base-ui/react"

const Login = () => {
  return (
    <>
      <section className="flex justify-center items-center mt-20">

        <div className="flex w-full max-w-sm min-w-sm flex-col gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
          <Input
            type="email"
            placeholder="Email"
            className="p-2 border-2 rounded-lg"
          />

          <Input
            type="password"
            placeholder="Password"
            className="p-2 border-2 rounded-lg"
          />

          <Button type="submit" className="w-full bg-black text-white cursor-pointer" variant="outline">
            Login
          </Button>


        </div>
      </section>

      <p className="flex justify-center mt-4">Need a account? <span className="underline mx-2 cursor-pointer">Sign up</span></p>
    </>
  );
};

export default Login;
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
        <Spinner className="size-8" />
    </div>
  );
}
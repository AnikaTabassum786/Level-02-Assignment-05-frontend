import Image from "next/image";

export default async function Home() {
  await new Promise((resolve)=>setTimeout(resolve,3000))
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       hello World
    </div>
  );
}


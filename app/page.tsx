import Image from "next/image";
import dbConnect from "@/lib/db"

export default async function Home() {

  await dbConnect();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>hello db is connected</h1>
    </div>
  );
}


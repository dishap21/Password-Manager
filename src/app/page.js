import { description } from "@/utils/desc";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-12 content-center">
      <p className="font-bold text-5xl text-black text-center p-3">{ description.tagline }</p>
      <p className="text-slate-500 text-center p-3">{ description.describe }</p>
      <button className="m-3 p-2 pl-4 pr-4 bg-blue-400 rounded-full hover:bg-blue-700 font-medium"> Login with Google</button>
    </main>
  );
}

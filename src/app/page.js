"use client";
import { description } from "@/utils/desc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { UserAuth } from "./context/AuthContext";

export default function Home() {

  const { user, googleSignIn } = UserAuth();
  const router = useRouter();
  

  const handleSignIn = async () => {
    try{
      await googleSignIn()
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    if(user){
      router.push('/dashboard');
    }
  }, [user, router]);
  
  return (
    <main className="flex flex-col items-center justify-center p-12 content-center">
      <p className="font-bold text-5xl text-black text-center p-2">{ description.tagline }</p>
      <Image
        src='/images/lock4.png'
        alt="Picture of the author"
        width={550}
        height={550}
      />
      <p className="text-slate-500 text-center p-2">{ description.describe }</p>
      <button onClick={handleSignIn} className="m-3 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full hover:bg-blue-700 font-medium hover:font-semibold"> Login with Google</button>
    </main>
  );
}

import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(request){
    try{
        const {uid, website} = await request.json();
        await connectToDatabase();
        const user = await User.findOne({_id: uid});
        if(user){
            const pass = user.passwords.find(pass => pass.website === website);
            if(pass){
                user.passwords.pull(pass);
                await user.save();
                return NextResponse.json({message: "Deleted Password"}, {status: 200});
            }else{
                return NextResponse.json({message: "Password Not Found"}, {status: 500});
            }
        }else{
            return NextResponse.json({message: "User not found"}, {status: 500});
        }
    }catch(err){
        return NextResponse.json({message: err.message}, {status: 500});
    }
}
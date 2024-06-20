import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request){
    try{
        const {uid, id, value} = await request.json();
        const user = await User.findOne({_id: uid});
        if(user){
            const passwordIndex = user.passwords.findIndex(p => p._id.toString() === id);
            if(passwordIndex != -1){
                user.passwords[passwordIndex].username = value;
                await user.save();
                return NextResponse.json({message: "Username updated successfully."}, {status: 200});
            }else{
                return NextResponse.json({message : "Passowrd not found."}, {status: 500});
            }
        }else{
            return NextResponse.json({message: "User not found."}, {status: 500})
        }
    }catch(err){
        return NextResponse.json({message: err.message}, {status: 500});
    }
}
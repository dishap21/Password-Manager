import User from "@/models/user";
import { NextResponse } from "next/server";

const sjcl = require('sjcl');

function encryptPassword(password, secretKey){
    const newPassword = sjcl.encrypt(secretKey, password);
    return newPassword;
}

export async function PUT(request){
    try{
        const {uid, id, value} = await request.json();
        const user = await User.findOne({_id: uid});
        if(user){
            const passwordIndex = user.passwords.findIndex(p => p._id.toString() === id);
            if(passwordIndex != -1){
                const secretKey = process.env.SECRET_KEY;
                const encryptedPassword = encryptPassword(value, secretKey);
                user.passwords[passwordIndex].password = encryptedPassword;
                await user.save();
                return NextResponse.json({message: "Operation completed."}, {status: 200})
            }else{
                return NextResponse.json({message: "Password not found."}, {status: 500});
            }
        }else{
            return NextResponse.json({message: "User not found."}, {status: 500});
        }
    }catch(err){
        return NextResponse.json({message: err.message}, {status: 500});
    }
}
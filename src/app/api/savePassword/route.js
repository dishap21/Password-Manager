import connectToDatabase from "@/app/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
const sjcl = require('sjcl');

function encryptPassword(password, secretKey) {
    const encrypted = sjcl.encrypt(secretKey, password);
    return encrypted;
}

export async function POST(request) {
    try{
        const { uid, website, uName, password } = await request.json();
        await connectToDatabase();
        const secretKey = process.env.SECRET_KEY;
        const hashedPassword = encryptPassword(password, secretKey);
        const user = await User.findOne({ _id: uid});
        if(user){
            user.passwords.push({website, username: uName, password: hashedPassword});
            await user.save();
        }else{
            console.log("user not found");
        }
        return NextResponse.json({message: 'password save successful'}, { status: 200})
    }catch(error){
        console.log(error);
        return NextResponse.json({message: 'Error saving password.'}, {status: 500})
    }
}
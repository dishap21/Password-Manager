import connectToDatabase from "@/app/lib/mongodb";
import User from "@/models/user";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { NextResponse } from "next/server";


const serviceAccount = require('@/utils/serviceAccountKey.json'); 

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const auth = getAuth();

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    await connectToDatabase();
    
    const decodedToken = await auth.verifyIdToken(token);

    const { uid, name, email } = decodedToken;

    let user = await User.findOne({ _id: uid });

    if (!user) {
      user = new User({ _id: uid, name, email });
      await user.save();
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
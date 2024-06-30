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

export async function DELETE(request) {
  try {
    const { uid } = await request.json();

    // Delete user from Firebase Authentication
    await auth.deleteUser(uid);

    // Delete user data from MongoDB
    await connectToDatabase();
    await User.deleteOne({ _id: uid });

    return NextResponse.json({ message: 'User account deleted successfully.' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

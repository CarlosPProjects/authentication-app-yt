import { connectMongo } from "@/utils/mongodb";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const users = UserModel;
    const { email, password } = await req.json();
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordCompared = await comparePassword(password, user.password);

    if (!passwordCompared) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

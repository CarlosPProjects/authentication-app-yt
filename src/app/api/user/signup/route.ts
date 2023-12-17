import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/utils/mongodb";
import UserModel from "@/models/user.model";
import { hashPassword } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();
    const passwordHashed = await hashPassword(password);

    await connectMongo();

    await UserModel.create({
      name,
      email,
      password: passwordHashed,
      role,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    // console.log("注册请求");
    // console.log(req);
    const { username, password } = await req.json();

    const users= await prisma.user.findMany({
        where: { user_name: username }
    });
    if (users.length > 0) {
        return NextResponse.json({ message: "用户名已存在" ,status: 400}, { status: 200 });
    }
    // password 加密
    const newUser = await prisma.user.create({
        data: { user_name: username, user_pass: password }
    });
    return NextResponse.json({ message: "注册成功" ,status: 200}, { status: 200 });
    
}
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';

// 假设这是从数据库中获取用户的函数
async function getUserFromDatabase(username) {
    const user = prisma.user.findUnique({
        where: {
            user_name: username
        }
    })
    return user;
}

export async function POST(request) {
  const { username, userpass } = await request.json();
  console.log(username, userpass);
  try {
    const user = await getUserFromDatabase(username);

    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    const isPasswordValid = userpass === user.user_pass;

    if (!isPasswordValid) {
      return NextResponse.json({ message: '密码错误' }, { status: 401 });
    }

    const jwtToken = jwt.sign({ userId: user.ID }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // 创建一个新的响应对象
    const response = NextResponse.json({ message: '登录成功' }, { status: 200 });

    // 在响应对象上设置 cookie
    response.cookies.set('token', jwtToken, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
    });

    return response;
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json({ message: '登录失败' }, { status: 500 });
  }
}

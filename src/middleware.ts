import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// 定义需要排除的路由
const excludedRoutes = ['/user/login', '/user/login/api'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('Token:', token);
  // 检查当前路由是否在排除列表中
  const pathname = request.nextUrl.pathname;
  if (excludedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  

  if (!token) {
    return NextResponse.redirect(new URL('/user/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    
    console.log('JWT验证成功，payload:', payload);

    return NextResponse.next();
  } catch (error) {
    console.log('JWT验证失败:', error);
    return NextResponse.redirect(new URL('/user/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
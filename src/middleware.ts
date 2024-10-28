import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';



// 定义需要排除的路由
const excludedRoutes = ['/user/login', '/user/login/api'];
export { auth as middleware } from '../auth'





export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};


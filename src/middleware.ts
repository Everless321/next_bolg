// 定义需要排除的路由
const excludedRoutes = ['/user/login', '/user/login/api', '/user/register', '/user/register/api'];
export { auth as middleware } from '../auth'



export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};


export { auth as middleware } from '../auth'

export const config = {
  matcher: [
    // 管理员路由保护
    '/admin/:path*',
    // 用户相关路由保护（排除登录和注册页面）
    '/user/:path*',
    // 保护其他路由，但排除一些公共资源
    '/((?!api|_next/static|_next/image|favicon.ico|user/login|user/register).*)',
  ],
};


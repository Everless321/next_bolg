// 自定义路由处理，非Next.js路由，采用json结构体传入，会有一个参数为router代表请求方,需要根据请求方法调用对应方法
import prisma from '@/lib/db';
import { auth } from '../../../auth';

// 定义响应类型
interface RouterResponse {
  success: boolean;
  message: string;
  data: unknown;
}

// 定义用户类型（包含isAdmin字段）
interface UserWithAdmin {
  ID: number;
  userName: string;
  isAdmin: boolean;
  // 使用更具体的类型替代any
  nickName?: string | null;
  userPass?: string | null;
  userStatus?: string | null;
  createTime?: Date | null;
  latsTime?: Date | null;
  userEmail?: string | null;
  avatar?: string | null;
  bio?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appRouter = async (data: any): Promise<RouterResponse> => {
  const router = data.router;
  let response: RouterResponse = { success: false, message: '未找到对应的路由', data: null };
  
  // 获取当前用户信息
  const session = await auth();
  const userId = session?.user?.id;
  
  // 根据router的内容去调用方法
  switch (router) {
    case "stats":
      console.log("stats");
      response = { success: true, message: '获取统计数据成功', data: { visits: 1000 } };
      break;
      
    case "post.create":
      try {
        // 验证用户权限
        if (!userId) {
          return { success: false, message: '未授权，请先登录', data: null };
        }
        
        const { title, content, status } = data.params;
        const now = new Date();
        
        // 创建文章
        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            status: status || 'draft',
            author: userId.toString(),
            createTime: now,
            lastUpdateTime: now,
            order: '0'
          }
        });
        
        response = { 
          success: true, 
          message: '文章创建成功', 
          data: newPost 
        };
      } catch (error) {
        console.error('创建文章失败:', error);
        response = { 
          success: false, 
          message: '创建文章失败: ' + (error instanceof Error ? error.message : String(error)), 
          data: null 
        };
      }
      break;
      
    case "post.update":
      try {
        // 验证用户权限
        if (!userId) {
          return { success: false, message: '未授权，请先登录', data: null };
        }
        
        const { id, title, content, status } = data.params;
        
        // 检查文章是否存在
        const existingPost = await prisma.post.findUnique({
          where: { ID: parseInt(id) }
        });
        
        if (!existingPost) {
          return { success: false, message: '文章不存在', data: null };
        }
        
        // 检查用户是否是超级管理员
        const currentUser = await prisma.user.findUnique({
          where: { ID: parseInt(userId) }
        }) as UserWithAdmin | null;
        
        // 检查是否是作者或超级管理员
        const isAuthor = existingPost.author === userId.toString();
        const isAdmin = currentUser?.isAdmin === true;
        
        if (!isAuthor && !isAdmin) {
          return { success: false, message: '没有权限修改此文章', data: null };
        }
        
        // 更新文章
        const now = new Date();
        const updatedPost = await prisma.post.update({
          where: { ID: parseInt(id) },
          data: {
            title,
            content,
            status,
            lastUpdateTime: now
          }
        });
        
        response = { 
          success: true, 
          message: '文章更新成功', 
          data: updatedPost 
        };
      } catch (error) {
        console.error('更新文章失败:', error);
        response = { 
          success: false, 
          message: '更新文章失败: ' + (error instanceof Error ? error.message : String(error)), 
          data: null 
        };
      }
      break;

    default:
      console.log("未找到对应的路由");
      break;
  }
  
  return response;
};

export default appRouter;
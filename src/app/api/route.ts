import { NextRequest, NextResponse } from 'next/server'
import appRouter from '@/lib/routerHandler/appRouter'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        // 调用自定义路由处理器
        const result = await appRouter(data);
        
        return NextResponse.json(result);
    } catch (error) {
        console.error('API处理错误:', error);
        return NextResponse.json({ 
            success: false, 
            message: '请求处理失败: ' + (error instanceof Error ? error.message : String(error)),
            data: null 
        }, { status: 500 });
    }
}
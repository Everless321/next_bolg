import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
    // 查询构造查询条件
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get('page') || '1');
    const pageSize: number = parseInt(searchParams.get('pageSize') || '10');
    const posts = await prisma.post.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const total = await prisma.post.count();
    const totalPages = Math.ceil(total / pageSize);
    return NextResponse.json({
        posts,
        total,
        totalPages,
        currentPage: page,
    });
}
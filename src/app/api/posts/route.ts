import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface DatabasePost {
  ID: number;
  post_title: string | null;
  post_content: string | null;
  post_status: string | null;
  create_time: Date | null;
  last_update_time: Date | null;
  post_order: string | null;
}

// 获取文章列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status');

    const where = status ? { post_status: status } : {};
    
    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          create_time: 'desc'
        },
        select: {
          ID: true,
          post_title: true,
          post_status: true,
          create_time: true,
          last_update_time: true,
          post_order: true
        }
      })
    ]);

    const formattedPosts = posts.map((post: DatabasePost) => ({
      id: post.ID,
      title: post.post_title || '',
      status: post.post_status || 'draft',
      createdAt: post.create_time?.toISOString() || '',
      updatedAt: post.last_update_time?.toISOString() || '',
      views: parseInt(post.post_order || '0')
    }));

    return NextResponse.json({
      data: formattedPosts,
      total,
      page,
      pageSize
    });
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    );
  }
}

// 创建文章
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date();
    const post = await prisma.post.create({
      data: {
        post_title: body.title,
        post_content: body.content,
        post_status: body.status || 'draft',
        post_author: body.authorId?.toString(),
        create_time: now,
        last_update_time: now,
        post_order: '0'
      }
    });

    return NextResponse.json({
      id: post.ID,
      title: post.post_title || '',
      status: post.post_status || 'draft',
      createdAt: post.create_time?.toISOString() || '',
      updatedAt: post.last_update_time?.toISOString() || '',
      views: 0
    });
  } catch (error) {
    console.error('创建文章失败:', error);
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    );
  }
} 
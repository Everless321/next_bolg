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

// 获取单个文章
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        ID: parseInt(params.id)
      }
    }) as DatabasePost | null;

    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: post.ID,
      title: post.post_title || '',
      content: post.post_content || '',
      status: post.post_status || 'draft',
      createdAt: post.create_time?.toISOString() || '',
      updatedAt: post.last_update_time?.toISOString() || '',
      views: parseInt(post.post_order || '0')
    });
  } catch (error) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    );
  }
}

// 更新文章
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const post = await prisma.post.update({
      where: {
        ID: parseInt(params.id)
      },
      data: {
        post_title: body.title,
        post_content: body.content,
        post_status: body.status,
        last_update_time: new Date()
      }
    }) as DatabasePost;

    return NextResponse.json({
      id: post.ID,
      title: post.post_title || '',
      content: post.post_content || '',
      status: post.post_status || 'draft',
      createdAt: post.create_time?.toISOString() || '',
      updatedAt: post.last_update_time?.toISOString() || '',
      views: parseInt(post.post_order || '0')
    });
  } catch (error) {
    console.error('更新文章失败:', error);
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    );
  }
}

// 删除文章
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: {
        ID: parseInt(params.id)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除文章失败:', error);
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    );
  }
} 
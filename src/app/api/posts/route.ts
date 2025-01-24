import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import {  Post } from '@/lib/types';

// 获取文章列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status');

    const where: Prisma.postWhereInput = status ? { 
      status: {
        equals: status
      }
    } : {};
    
    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          lastUpdateTime: 'desc'
        }
      })
    ]);

    const formattedPosts: Post[] = posts.map((post) => ({
      ...post
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

    const postData: Prisma.postCreateInput = {
      title: body.title,
      content: body.content,
      status: body.status || 'draft',
      author: body.authorId?.toString(),
      createTime: now,
      lastUpdateTime: now,
      order: '0'
    };

    const post = await prisma.post.create({
      data: postData
    });

    const response: Post = {
      ...post
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('创建文章失败:', error);
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    );
  }
} 
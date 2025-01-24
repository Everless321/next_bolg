import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import {  Post } from '@/lib/types';

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
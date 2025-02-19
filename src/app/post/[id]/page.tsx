'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin } from '@arco-design/web-react';
import { IconHeart, IconStar, IconMessage } from '@arco-design/web-react/icon';
import Image from 'next/image';
import { Post } from '@/lib/types';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 h-96 rounded-lg" />
  }
);

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin dot />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">文章不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* 文章头部 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <Image
              src="/images/article-covers/default-cover.jpg"
              alt={post.title || ''}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/images/ava.jpg"
                    alt={post.author || '匿名'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{post.author || '匿名'}</p>
                  <p className="text-gray-500 text-sm">
                    {post.createTime ? new Date(post.createTime).toLocaleDateString('zh-CN') : '未知时间'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-1">
                  <IconHeart className="text-red-500" />
                  <span>{Math.floor(Math.random() * 1000)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <IconStar className="text-yellow-500" />
                  <span>{Math.floor(Math.random() * 500)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <IconMessage className="text-blue-500" />
                  <span>{Math.floor(Math.random() * 200)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 文章内容 */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <MarkdownPreview 
            source={post.content || ''} 
            className="!bg-transparent"
            style={{
              fontSize: '16px',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { Spin } from '@arco-design/web-react';
import { IconHeart, IconStar, IconMessage, IconClose } from '@arco-design/web-react/icon';
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

interface ArticleDetailDialogProps {
  postId: string | number;
  onClose: () => void;
}

export default function ArticleDetailDialog({ postId, onClose }: ArticleDetailDialogProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // 添加滚动锁定
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [postId]);

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      document.exitFullscreen().catch(console.error);
    } else {
      document.documentElement.requestFullscreen().catch(console.error);
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const dialogClasses = `
    fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50
    transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}
  `;

  const contentClasses = `
    relative bg-white rounded-xl overflow-hidden w-full max-w-4xl
    transition-all duration-300 transform
    ${loading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
    ${isFullscreen ? 'h-screen max-w-none m-0' : 'max-h-[90vh]'}
  `;

  if (!post && !loading) {
    return null;
  }

  return (
    <div className={dialogClasses} onClick={handleClose}>
      <div className={contentClasses} onClick={e => e.stopPropagation()}>
        {/* 操作按钮 */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          <button
            onClick={handleFullscreenToggle}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              ) : (
                <path d="M15 3h6v6M9 21H3v-6M21 9v6h-6M3 9v6h6" />
              )}
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-600 transition-colors"
          >
            <IconClose />
          </button>
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Spin dot />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {/* 文章头部 */}
            <div className="relative">
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/article-covers/default-cover.jpg"
                  alt={post?.title || ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {post?.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src="/images/ava.jpg"
                        alt={post?.author || '匿名'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{post?.author || '匿名'}</p>
                      <p className="text-gray-500 text-sm">
                        {post?.createTime ? new Date(post.createTime).toLocaleDateString('zh-CN') : '未知时间'}
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
            <div className="px-8 pb-8">
              <MarkdownPreview 
                source={post?.content || ''} 
                className="!bg-transparent"
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
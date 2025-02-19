'use client'
import { useState } from 'react';
import { IconHeart, IconStar, IconMessage } from '@arco-design/web-react/icon';
import Image from 'next/image';
import ArticleDetailDialog from './ArticleDetailDialog';

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  author: {
    avatar: string;
    name: string;
  };
  stats: {
    likes: number;
    stars: number;
    comments: number;
  };
  coverImage?: string;
}

export default function ArticleCard({ id, title, description, author, stats, coverImage }: ArticleCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(true);
  };

  return (
    <>
      <div 
        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          {/* 默认封面图或提供的封面图 */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={coverImage || '/images/article-covers/default-cover.jpg'}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* 作者信息 - 悬浮在封面上 */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white text-sm font-medium">{author.name}</span>
          </div>
        </div>

        {/* 文章内容 */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>
          
          {/* 统计信息 */}
          <div className="flex items-center space-x-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <IconHeart className="text-red-500" />
              <span>{stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IconStar className="text-yellow-500" />
              <span>{stats.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IconMessage className="text-blue-500" />
              <span>{stats.comments}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 文章详情弹窗 */}
      {showDetail && (
        <ArticleDetailDialog
          postId={id}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
} 
'use client'
import { useEffect, useState } from 'react';
import { Spin } from '@arco-design/web-react';
import { useInView } from 'react-intersection-observer';
import ArticleCard from './ArticleCard';

interface Article {
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

const author = {
  name: "山野",
  avatar: "/images/ava.jpg"
};

// 模拟文章数据生成
const generateArticles = (length: number): Article[] => {
  const images = [
    '/images/article-covers/tech1.jpg',
    '/images/article-covers/tech2.jpg',
    '/images/article-covers/tech3.jpg',
    '/images/article-covers/tech4.jpg',
  ];

  return Array(length).fill(null).map((_, index) => ({
    title: `探索技术的新高峰：${index + 1}`,
    description: '在这篇文章中，我们将深入探讨最新的技术趋势和创新方向，帮助您在技术领域攀登新的高峰。从基础理论到实践应用，让我们一起探索技术的无限可能。',
    author: author,
    stats: {
      likes: Math.floor(Math.random() * 1000),
      stars: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 200),
    },
    coverImage: images[index % images.length],
  }));
};

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  // 初始加载
  useEffect(() => {
    setArticles(generateArticles(6));
  }, []);

  // 加载更多
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      setArticles(prev => [...prev, ...generateArticles(3)]);
      setLoading(false);
    }, 1000);
  };

  // 监听滚动到底部
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div className="space-y-8">
      {/* 文章网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>

      {/* 加载更多指示器 */}
      <div ref={ref} className="flex justify-center py-8">
        {loading && <Spin dot />}
      </div>
    </div>
  );
} 
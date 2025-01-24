'use client'
import { useEffect, useState } from 'react';
import { Spin } from '@arco-design/web-react';
import { useInView } from 'react-intersection-observer';
import ArticleCard from './ArticleCard';
import { Article, Post } from '@/lib/types';


interface ApiResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // 获取文章列表
  const fetchArticles = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${pageNum}&pageSize=6&status=published`);
      const data: ApiResponse = await response.json();
      
      if (pageNum === 1) {
        setArticles(data.data);
      } else {
        setArticles(prev => [...prev, ...data.data]);
      }
      
      setHasMore(data.data.length === data.pageSize);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchArticles(1);
  }, []);

  // 加载更多
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage(prev => {
        const nextPage = prev + 1;
        fetchArticles(nextPage);
        return nextPage;
      });
    }
  }, [inView, loading, hasMore]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={`article-${article.ID}-${index}`}
            title={article.title || '无标题'}
            description={article.content?.substring(0, 200) || '暂无描述'}
            author={{
              name: article.author || '匿名',
              avatar: '/images/ava.jpg'
            }}
            stats={{
              likes: Math.floor(Math.random() * 1000),
              stars: Math.floor(Math.random() * 500),
              comments: Math.floor(Math.random() * 200),
            }}
          />
        ))}
      </div>

      <div ref={ref} className="flex justify-center py-8">
        {loading && <Spin dot />}
        {!hasMore && <p className="text-gray-500">没有更多文章了</p>}
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Layout, List, Tree } from '@arco-design/web-react';
import { IconHeart, IconStar, IconMessage } from '@arco-design/web-react/icon';
import Image from 'next/image';
import { Post } from '@/lib/types';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import MainHeader from '@/app/components/layout/MainHeader';

const { Content, Footer, Sider } = Layout;

// 分类数据
const treeData = [
  {
    title: "技术",
    key: "0",
    children: [
      {
        title: "前端",
        key: "0-0",
        children: [
          {
            title: "React",
            key: "0-0-0",
          },
          {
            title: "Vue",
            key: "0-0-1",
          },
        ],
      },
      {
        title: "后端",
        key: "0-1",
        children: [
          {
            title: "Node.js",
            key: "0-1-0",
          },
          {
            title: "Python",
            key: "0-1-1",
          },
        ],
      },
    ],
  },
];

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
    <Layout className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <MainHeader />
      <Layout className="container mx-auto px-4 py-6">
        <Content className="flex-1 bg-transparent mr-6">
          {/* 文章内容 */}
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
        </Content>

        <Sider className="w-80 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-3">分类导航</h2>
              <Tree treeData={treeData} />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">最新文章</h2>
              <List
                size="small"
                dataSource={[
                  "探索 React 18 新特性",
                  "Next.js 13 完全指南",
                  "TypeScript 高级技巧",
                  "现代 CSS 开发技巧",
                  "Node.js 性能优化"
                ]}
                render={(item) => (
                  <List.Item key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                    {item}
                  </List.Item>
                )}
              />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">站点信息</h2>
              <div className="space-y-3 text-gray-600">
                <p className="flex justify-between">
                  <span>访问量</span>
                  <span className="text-blue-600">1234</span>
                </p>
                <p className="flex justify-between">
                  <span>文章数</span>
                  <span className="text-blue-600">56</span>
                </p>
                <p className="flex justify-between">
                  <span>用户数</span>
                  <span className="text-blue-600">789</span>
                </p>
              </div>
            </div>
          </div>
        </Sider>
      </Layout>
      <Footer className="text-center text-gray-500 py-6 bg-transparent">
        © 2025 Everless Blog - Boundless Climb
      </Footer>
    </Layout>
  );
} 
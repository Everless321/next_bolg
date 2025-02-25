"use client";
import { useState, useEffect } from "react";
import { Layout, List, Tree, Spin } from "@arco-design/web-react";
import "./page.css";
import ArticleList from './components/article/ArticleList';
import MainHeader from './components/layout/MainHeader';

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


export default function Home() {
  const [mounted, setMounted] = useState(false);
  // const [showSnowStorm, setShowSnowStorm] = useState(true);

  useEffect(() => {
    setMounted(true);
    // 3秒后关闭暴风雪效果
    // const timer = setTimeout(() => {
    //   setShowSnowStorm(false);
    // }, 3000);

    // return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
        <Spin dot />
      </div>
    );
  }

  return (
    <>
      {/* <SnowStorm isActive={showSnowStorm} /> */}
      <div className={`transition-all duration-1000 brightness-100`}>
        <Layout className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <MainHeader />
          <Layout className="container mx-auto px-4 py-6">
            <Sider className="w-64 mr-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-blue-900 mb-3">分类导航</h2>
                  <Tree treeData={treeData} />
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h2 className="text-lg font-semibold text-blue-900 mb-3">热门标签</h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'CSS', 'JavaScript'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Sider>
            <Content className="flex-1 bg-transparent">
              <ArticleList />
            </Content>
            <Sider className="w-80 ml-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4">
              <div className="space-y-6">
                <div>
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
              </div>
            </Sider>
          </Layout>
          <Footer className="text-center text-gray-500 py-6 bg-transparent">
            © 2025 Everless Blog - Boundless Climb
          </Footer>
        </Layout>
      </div>
    </>
  );
}

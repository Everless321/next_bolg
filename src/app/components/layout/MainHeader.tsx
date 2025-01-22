'use client'
import { Layout } from '@arco-design/web-react';
import SystemMonitor from '../dashboard/SystemMonitor';
import { useEffect, useState } from 'react';

const { Header } = Layout;

export default function MainHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* 占位div，防止内容跳动 */}
      <div style={{ height: '80px' }} />
      
      <Header 
        className={`fixed top-0 left-0 right-0 z-50 border-none overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? 'h-16 shadow-lg bg-white/80 backdrop-blur-md' : 'h-20 bg-transparent'
        }`}
      >
        {/* 背景图层 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/mountain-header.jpg')",
            opacity: scrolled ? 0.15 : 0.3,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        
        {/* 内容层 */}
        <div className="relative container mx-auto px-4 h-full flex items-center justify-between z-10">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className={`font-bold transition-all duration-300 ${
                scrolled ? 'text-xl text-gray-800' : 'text-2xl text-white'
              }`}>Mountain Blog</h1>
              <p className={`transition-all duration-300 ${
                scrolled ? 'text-xs text-gray-600' : 'text-sm text-gray-100'
              }`}>探索技术的高峰</p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className={`transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-100 hover:text-white'
              }`}>首页</a>
              <a href="/articles" className={`transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-100 hover:text-white'
              }`}>文章</a>
              <a href="/about" className={`transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-100 hover:text-white'
              }`}>关于</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <SystemMonitor />
          </div>
        </div>
      </Header>
    </>
  );
} 
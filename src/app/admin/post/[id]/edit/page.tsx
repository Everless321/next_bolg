'use client'
import { useEffect, useState ,use} from 'react';
import { Message, Spin } from '@arco-design/web-react';
import EditPostForm from './EditPostForm';
import {  Post } from '@/lib/types';

interface Props {
    readonly params: Promise<{
      readonly id: string;
    }>;
}

export default function EditPost({ params }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id }: { id: string } = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('文章获取失败');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        Message.error('文章获取失败,error:'+error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin dot />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-600">文章不存在或已被删除</h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">编辑文章</h1>
      </div>
      <EditPostForm post={post} />
    </div>
  );
} 
'use client'
import { Table, Button, Space, Message, Modal } from '@arco-design/web-react';
import { IconEdit, IconDelete } from '@arco-design/web-react/icon';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {  Post } from '@/lib/types';
import { Dialog } from '@/components/ui/dialog';

export default function PostManagement() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取文章列表
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/posts?page=${pagination.current}&pageSize=${pagination.pageSize}`
      );
      const result = await response.json();
      
      setData(result.data);
      setPagination(prev => ({
        ...prev,
        total: result.total,
      }));
    } catch {
      Message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除文章
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这篇文章吗？此操作不可恢复。',
      onOk: async () => {
        try {
          const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            Message.success('删除成功');
            fetchPosts();
          } else {
            throw new Error('删除失败');
          }
        } catch {
          Message.error('删除文章失败');
        }
      },
    });
  };

  // 处理分页变化
  const handlePageChange = (current: number) => {
    setPagination(prev => ({
      ...prev,
      current,
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, [pagination.current, pagination.pageSize]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 300,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <span className={status === 'published' ? 'text-green-600' : 'text-orange-600'}>
          {status === 'published' ? '已发布' : '草稿'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      width: 100,
      render: (views: number) => (
        <span className="text-blue-600">{views || 0}</span>
      ),
    },
    {
      title: '操作',
      width: 200,
      render: (_: unknown, record: Post) => (
        <Space key={record.ID}>
          <Link href={`/admin/post/${record.ID}/edit`}>
            <Button type="text" icon={<IconEdit />}>
              编辑
            </Button>
          </Link>
          <Button
            type="text"
            status="danger"
            icon={<IconDelete />}
            onClick={() => handleDelete(record.ID)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">文章管理</h1>
        <Link href="/admin/post/new">
          <Button type="primary">新建文章</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg">
        <Table
          rowKey="ID"
          loading={loading}
          columns={columns}
          data={data}
          border={false}
          className="custom-table"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: true,
            onChange: handlePageChange,
          }}
        />

        
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Form, Input, Button, Message, Select } from '@arco-design/web-react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/editor';
import {MDEitor} from '@uiw/react-md-editor';

const FormItem = Form.Item;

interface FormValues {
  title: string;
  content: string;
  status: 'draft' | 'published';
}

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    if (!content) {
      Message.error('请输入文章内容');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/admin/post/new/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          content: content,
          status: values.status,
        }),
      });

      if (!response.ok) {
        throw new Error('创建文章失败');
      }

      Message.success('创建成功');
      router.push('/admin/post');
    } catch {
      Message.error('创建文章失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">新建文章</h1>
        <Button
          type="text"
          onClick={() => router.push('/admin/post')}
        >
          返回列表
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6">
        <Form
          form={form}
          onSubmit={handleSubmit}
          layout="vertical"
          className="space-y-4"
          autoComplete="off"
        >
          <FormItem
            label="标题"
            field="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" />
          </FormItem>

          <FormItem
            label="内容"
            field="content"
          >
            {/* <MDEitor
            value={content}
            onChange={setContent}
            > */}

            </MDEitor>
            
            
          </FormItem>

          <FormItem
            label="状态"
            field="status"
            initialValue="draft"
          >
            <Select>
              <Select.Option value="draft">草稿</Select.Option>
              <Select.Option value="published">发布</Select.Option>
            </Select>
          </FormItem>

          <FormItem>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => router.push('/admin/post')}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                保存
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  );
} 
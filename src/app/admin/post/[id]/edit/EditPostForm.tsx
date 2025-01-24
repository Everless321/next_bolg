'use client'
import { useState } from 'react';
import { Form, Input, Button, Select, Message } from '@arco-design/web-react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/editor';
import { Post } from '@/lib/types';

const FormItem = Form.Item;
const Option = Select.Option;

interface EditPostFormProps {
  post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState(post.content || '');

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/posts/${post.ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('更新失败');
      }

      Message.success('文章更新成功');
      router.push('/admin/post');
      router.refresh();
    } catch (error) {
      Message.error('文章更新失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <Form
        form={form}
        initialValues={{
          title: post.title,
          status: post.status,
        }}
        onSubmit={handleSubmit}
        className="space-y-6"
        layout="vertical"
      >
        <FormItem
          label="文章标题"
          field="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input placeholder="请输入文章标题" />
        </FormItem>

        <FormItem label="文章内容" rules={[{ required: true, message: '请输入文章内容' }]}>
          <Editor
            value={content}
            onChange={value => setContent(value)}
          />
        </FormItem>

        <FormItem
          label="发布状态"
          field="status"
          rules={[{ required: true, message: '请选择发布状态' }]}
        >
          <Select placeholder="请选择发布状态">
            <Option value="draft">草稿</Option>
            <Option value="published">发布</Option>
          </Select>
        </FormItem>

        <FormItem>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => router.back()}
              type="secondary"
            >
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              保存
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
  );
} 
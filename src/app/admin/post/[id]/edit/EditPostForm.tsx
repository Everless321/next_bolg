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

interface FormValues {
  title: string;
  status: string;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState<string>(post.content || '');

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      
      // 使用自定义路由处理器来更新文章
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          router: 'post.update',
          params: {
            id: post.ID,
            title: values.title,
            content: content,
            status: values.status,
          }
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || '更新失败');
      }

      Message.success(result.message || '文章更新成功');
      
      router.push('/admin/post');
      router.refresh();
    } catch (error) {
      console.error('文章更新失败', error);
      Message.error(error instanceof Error ? error.message : '文章更新失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <Form
        form={form}
        initialValues={{
          title: post.title || '',
          status: post.status || 'draft',
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
            onChange={(value: string) => setContent(value)}
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
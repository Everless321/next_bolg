'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Form, Input, Message } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { signIn } from 'next-auth/react';

const FormItem = Form.Item;

export default function Login() {
	const [form] = Form.useForm();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const handleTest = async () => {
		const res = await fetch('/api', {
			method: 'POST',
			
		});
		console.log(res);
	};

	const handleSubmit = async () => {
		setError('');
		setLoading(true);
		const { username, userpass } = form.getFields();

		try {
			const res = await signIn('credentials', {
				email: username,
				password: userpass,
				redirect: false,
			});

			if (res?.error) {
				setError('用户名或密码错误');
				Message.error('登录失败：' + res.error);
			} else {
				Message.success('登录成功');
				router.push(callbackUrl);
				router.refresh();
			}
		} catch (error) {
			setError('发生错误，请稍后重试');
			Message.error('系统错误，请稍后重试');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<div className='w-full max-w-2xl'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>登录</h2>
			</div>
			<div className='mt-10 w-full max-w-xl bg-white p-10 rounded-lg shadow-md'>
				<Button onClick={handleTest}>测试</Button>

				<Form form={form} onSubmit={handleSubmit} layout="vertical" className="w-full h-full flex flex-col">
					{error && (
						<div className="mb-4 text-red-500 text-center">
							{error}
						</div>
					)}
					<FormItem label='用户名' field='username' required>
						<Input prefix={<IconUser />} placeholder='请输入用户名' size="large"/>
					</FormItem>
					<FormItem label="密码" field="userpass" required rules={[{required: true, message: '请输入密码'}]}>
						<Input.Password prefix={<IconLock />} placeholder="请输入密码" size="large" />
					</FormItem>
					<FormItem className='mt-auto'>
						<Button type="primary" htmlType="submit" long size="large" loading={loading}>
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	);
}

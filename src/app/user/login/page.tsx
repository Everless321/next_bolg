'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { post } from '@/lib/requests';

const FormItem = Form.Item;



export default function Login() {
	const [form] = Form.useForm();
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async () => {
		setError('');
		const { username, userpass } = form.getFields();

		try {
			const response = await post('/admin/login/api', { username, userpass })
			console.log(response);
		} catch (error) {
			setError('发生错误，请稍后重试');
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<div className='w-full max-w-2xl'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>登录</h2>
			</div>
			<div className='mt-10 w-full max-w-xl bg-white p-10 rounded-lg shadow-md'>
				<Form form={form} onSubmit={handleSubmit} layout="vertical" className="w-full h-full flex flex-col">
					<FormItem label='用户名' field='username' required>
						<Input prefix={<IconUser />} placeholder='请输入用户名' size="large"/>
					</FormItem>
					<FormItem label="密码" field="password" required rules={[{required: true, message: '请输入密码'}]}>
						<Input.Password prefix={<IconLock />} placeholder="请输入密码" size="large" />
					</FormItem>
					<FormItem className='mt-auto'>
						<Button type="primary" htmlType="submit" long size="large">
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	);
}

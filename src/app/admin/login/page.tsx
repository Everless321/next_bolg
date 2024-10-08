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
        const {username,userpass} = form.getFields();

		try {
			const response = await post('/admin/login/api', {username, userpass})


		    console.log(response);
		} catch (error) {
			setError('发生错误，请稍后重试');
		}
	};

	return (
		<div className="login-container">
			<h1>管理员登录</h1>
			<Form form={form} layout='vertical' onSubmit={handleSubmit}>
                <FormItem label='用户名' field='username' required>
                    <Input prefix={<IconUser />} placeholder='请输入用户名'  size="large"/>
                </FormItem>
                <FormItem label='密码' field='userpass' required>
                    <Input.Password prefix={<IconLock />} placeholder='请输入密码'  size="large"/>
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit'>登录</Button>
                </FormItem>
            </Form>
		</div>
	);
}
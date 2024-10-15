'use client'
import { Button, Checkbox, Form, Input, Message, Space } from "@arco-design/web-react";
import { post } from "../../../lib/requests";
import { IconUser, IconLock } from '@arco-design/web-react/icon';
import Link from 'next/link';

const FormItem = Form.Item;

export default function Register() {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        // 校验表单数据
        const { username, password } = form.getFields();
        const res: any = await post("/admin/register/api", { username, password });
        if (res.status === 200) {
            Message.success("注册成功");
        } else {
            Message.error(res.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-2xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    创建您的账户
                </h2>
            </div>

            <div className="mt-10 w-full max-w-2xl bg-white p-10 rounded-lg shadow-md h-1/2">

                <Form form={form} onSubmit={handleSubmit} layout="horizontal" className="w-full h-full">
                    <FormItem label='用户名' field='username'  required>
                        <Input prefix={<IconUser />} placeholder='请输入用户名'  size="large"/>
                    </FormItem>
                    <FormItem label="密码" field="password" required rules={[{required: true, message: '请输入密码'}]}>
                        <Input.Password prefix={<IconLock />} placeholder="请输入密码"  />
                    </FormItem>
                    <FormItem label="确认密码" field="confirmPassword" required rules={[{required: true, message: '请再次输入密码'}, {validator: (value, callback) => {
                        const password = form.getFieldsValue().password;
                        if (value !== password) {
                            callback('两次输入的密码不一致');
                        }
                        callback();
                    }}]}>
                        <Input.Password prefix={<IconLock />} placeholder="请再次输入密码"  />
                    </FormItem>
                    {/* 阅读协议 */}
                    <FormItem  field="readProtocol" wrapperCol={{offset: 5}}>
                        <Checkbox>我已阅读并同意</Checkbox>
                    </FormItem>
                    <FormItem wrapperCol={{offset: 5}}>
                        <Button type="primary" htmlType="submit"  size="large">
                            注册
                        </Button>
                    </FormItem>
                </Form>
                <div className="flex justify-center items-center">
                    <Link href="/login">
                        已有账户? 登录
                    </Link>
                </div>
                
            </div>

        </div>
    )
}
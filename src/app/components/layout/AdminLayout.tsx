'use client'
import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import {
  IconHome,
  IconFile,
  IconSettings,
  IconUser,
  IconMenuFold,
  IconMenuUnfold,
} from '@arco-design/web-react/icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider, Header, Content } = Layout;
const MenuItem = Menu.Item;

interface Meta {
  title: string;
  href: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  metas: Meta[];
}

export default function AdminLayout({ children, metas }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/admin',
      icon: <IconHome />,
      title: '仪表盘',
    },
    {
      key: '/admin/post',
      icon: <IconFile />,
      title: '文章管理',
    },
    {
      key: '/admin/settings',
      icon: <IconSettings />,
      title: '系统设置',
    },
    {
      key: '/admin/profile',
      icon: <IconUser />,
      title: '个人信息',
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsible
        trigger={null}
        breakpoint="xl"
        className="border-r border-gray-200"
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-lg font-semibold text-blue-600">
            {collapsed ? 'MB' : 'Mountain Blog'}
          </span>
        </div>
        <Menu
          defaultSelectedKeys={[pathname]}
          style={{ width: '100%' }}
          className="h-[calc(100vh-4rem)]"
        >
          {menuItems.map(item => (
            <MenuItem key={item.key}>
              <Link href={item.key} className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className="h-16 border-b border-gray-200 bg-white px-4">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </button>
              <Breadcrumb className="ml-4">
                <Breadcrumb.Item key="admin">后台管理</Breadcrumb.Item>
                {metas.map((meta) => (
                  <Breadcrumb.Item key={meta.href}>
                    <Link href={meta.href}>{meta.title}</Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          </div>
        </Header>
        <Content className="p-6 overflow-auto bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
} 
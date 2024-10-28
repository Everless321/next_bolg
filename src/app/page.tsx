'use client'
import { Layout, List, Avatar, Space } from "@arco-design/web-react";
import { IconHeart, IconStar, IconMessage } from '@arco-design/web-react/icon';
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
import './page.css'

const data = [
  {
    title: '前端开发最佳实践',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    description: '前端开发领域日新月异，本文将深入探讨当前最受欢迎的框架、工具和方法论...',
    content: '前端开发领域日新月异，本文将深入探讨当前最受欢迎的框架、工具和方法论...',
    likes: 1024,
    stars: 512,
    comments: 128,
  },
  {
    title: 'React性能优化指南',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    description: '全面解析React应用性能优化的关键技巧',
    content: 'React作为主流前端框架，其性能优化一直是开发者关注的焦点。本文将从组件设计、状态管理、渲染优化等多个角度...',
    likes: 896,
    stars: 456,
    comments: 98,
  },
  // 可以继续添加更多文章数据...
];

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

export default function Home() {
  return (
    <Layout className="h-screen layout-basic-demo">
      <Header>文章列表</Header>
      <Content className="flex-1 p-4 ">
        <List
          className="list-demo-action-layout p-4"
          
          wrapperStyle={{ maxWidth: 830 }}
          size="large"
          pagination={{
            pageSize: 3,
          }}
          dataSource={data}
          render={(item, index) => (
            <List.Item
            
              
              actionLayout='vertical'
              className="p-2"
              key={index}
              actions={[
                <span key={1}>
                  <IconHeart />
                  {83}
                </span>,
                <span key={2}>
                  <IconStar />
                  
                </span>,
                <span key={3}>
                  <IconMessage />
                  
                </span>,
              ]}
              extra={
                <div className='image-area '>
                  <img
                    alt="logo"
                    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                  />
                </div>
              }
            >
              <List.Item.Meta
                // className="list-item-meta-left ml-2"
                avatar={<Avatar shape='square'>
                  <img src={item.avatar} alt="avatar" />
                </Avatar>}
                title={<div style={{ textAlign: 'left' }}>{item.title}</div>}
                description={<div style={{ textAlign: 'left' }}>{item.description}</div>}
              />
              {item.content}
              
             
              
            </List.Item>
            

          )}
        />
      </Content>
      <Footer>© 2024 我的博客</Footer>
    </Layout>
  );
}

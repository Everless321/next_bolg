import { Avatar, List, Space } from "@arco-design/web-react";
import { IconHeart, IconMessage, IconStar } from "@arco-design/web-react/icon";
const generateData = (length: number) => {
    return Array(length).fill(null).map((_, index) => ({
      title: `文章标题 ${index}`,
      avatar: `https://avatars.githubusercontent.com/u/${index + 1}?v=4`,
      description: `文章描述 ${index}`,
      content: `文章内容 ${index}`,
      likes: Math.floor(Math.random() * 1000),
      stars: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 200),
    }));
  };
  const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );
  


export default function ArticleList() {
    const data = generateData(10);
    return (
    <List
            className="list-demo-action-layout p-4"
            wrapperStyle={{ maxWidth: 830 }}
            size="large"
            dataSource={data}
            render={(item, index) => (
              <List.Item
                actionLayout='vertical'
                className="p-2"
                key={index}
                actions={[
                  <IconText icon={<IconHeart />} text={item.likes.toString()} key="list-heart" />,
                  <IconText icon={<IconStar />} text={item.stars.toString()} key="list-star" />,
                  <IconText icon={<IconMessage />} text={item.comments.toString()} key="list-message" />,
                ]}
                extra={
                  <div className='image-area'>
                    <img
                      alt="logo"
                      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                    />
                  </div>
                }
              >
                <List.Item.Meta
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
    )
}

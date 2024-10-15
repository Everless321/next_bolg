'use client'
import { Menu } from "@arco-design/web-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Meta {
    title: string;
    href: string;
}



const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

interface LayoutProps {
    children?: React.ReactNode;
    metas: Meta[];
}

export default function AdminLayout({ children, metas }: LayoutProps) {
    const path = usePathname();
    const selectedKeys = metas.map((item, index) => item.href === path ? String(index + 1) : null).filter(Boolean) as string[];
    return (
        <div className="menu-demo">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={selectedKeys}

            >
                {/* <MenuItem key='0' style={{ padding: 0, marginRight: 38 }} disabled>
                    <div
                        style={{
                            width: 80,
                            height: 30,
                            background: 'var(--color-fill-3)',
                            cursor: 'text',
                        }}
                    />
                </MenuItem> */}
                {metas.map((item, index) => (
                    <MenuItem key={String(index + 1)}>
                        <Link href={item.href}>{item.title}</Link>
                    </MenuItem>
                ))}
            </Menu>
            {children}
        </div>
    )
}




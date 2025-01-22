'use client'
import AdminLayout from "@/app/components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { Meta } from "@/app/components/layout/types";

export default function AdminLayoutWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const [metas, setMetas] = useState<Meta[]>([]);

    useEffect(() => {
        // 根据当前路径设置面包屑导航
        setMetas([
            { title: "仪表盘", href: "/admin" },
            { title: "文章管理", href: "/admin/post" },
            { title: "系统设置", href: "/admin/settings" },
            { title: "个人信息", href: "/admin/profile" },
        ]);
    }, []);

    return <AdminLayout metas={metas}>{children}</AdminLayout>;
}

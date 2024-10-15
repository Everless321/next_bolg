'use client'
import AdminLayout from "@/app/commpoment/Layout/AdminLayout";
import { useEffect, useState } from "react";
import { Meta } from "../commpoment/Layout/type";

export default function AdminLayoutWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const [metas, setMetas] = useState<Meta[]>([]);

    useEffect(() => {
        setMetas([{ title: "首页", href: "/admin" }, { title: "文章列表", href: "/admin/post/" }]);
    }, []);

    return (
        <div>
            <AdminLayout metas={metas}>{children}</AdminLayout>
        </div>
    )
}

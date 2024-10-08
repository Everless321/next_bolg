import AdminLayout from "@/app/commpoment/AdminLayout";

export default function PostLayout( {children}: Readonly<{children: React.ReactNode}>) {
    return (
        <AdminLayout metas={[{title: "编辑",href: "/admin/post/edit"}]} >
            {children}
        </AdminLayout>
    )
}
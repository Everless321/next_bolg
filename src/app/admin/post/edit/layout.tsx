import React from "react";

export default function PostLayout( {children}: Readonly<{children: React.ReactNode}>) {
    return (
        // <Layout metas={[{title: "编辑",href: "/admin/post/edit"}]} >
        //     {children}
        // </Layout>
        <div>
            {children}
        </div>
    )
}
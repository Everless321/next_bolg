'use client'
import { get, post } from "@/lib/requests";
import { Table, TableColumnProps } from "@arco-design/web-react";
import { useState, useEffect } from "react";



const columns :TableColumnProps[] = [
    {
        title: "标题",
        dataIndex: "title",
    },
    {
        title: "作者",
        dataIndex: "author",
    },
    {
        title: "创建时间",
        dataIndex: "createdAt",
    },
    
]
export default function PostPage() {
    const [queryParams, setQueryParams] = useState<Record<string, string>>({
        page: '1',
        pageSize: '10',
    });
    const [tableData, setTableData] = useState<any[]>([]);

    const getList = async () => {
        try {
            const res: any = await get("/admin/post/api", { params: queryParams });
            console.log(res);
            setTableData(res.data);
        } catch (error) {
            console.error("获取列表失败:", error);
        }
    }

    useEffect(() => {
        getList();
    }, [queryParams]);

    return (
        <div>
            <h1>文章列表</h1>
            <Table columns={columns} data={tableData} />
            


        </div>
    )
}

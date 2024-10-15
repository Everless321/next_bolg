'use client'
import AdminLayout from "@/app/commpoment/Layout/AdminLayout";

export default function LoginLayout({ children }:  Readonly<{ children: React.ReactNode }>) {
    return (
        <div >
            {children}
        </div>
    )
}
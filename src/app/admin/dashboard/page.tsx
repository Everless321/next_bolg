'use client'
import { Typography } from '@arco-design/web-react';
import SystemDashboard from './SystemDashboard';

const { Title } = Typography;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Title heading={2}>仪表盘</Title>
      </div>
      
      <SystemDashboard />
    </div>
  );
} 
'use client'
import { useState, useEffect } from 'react';
import { Spin } from '@arco-design/web-react';
import SystemGauge from '../charts/SystemGauge';

interface SystemInfo {
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  cpu: {
    usage: number;
    count: number;
  };
}

export default function SystemMonitor() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch('/api/system-stats');
      const data = await response.json();
      setSystemInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('获取系统信息失败:', error);
    }
  };

  useEffect(() => {
    fetchSystemInfo();
    const interval = setInterval(fetchSystemInfo, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !systemInfo) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin dot className="text-gray-100" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
      <div className="flex items-center space-x-4">
        <SystemGauge value={systemInfo.memory.usage} title="内存" />
        <div className="text-xs text-gray-100">
          <div>{(systemInfo.memory.used / 1024).toFixed(1)}GB</div>
          <div className="opacity-60">{(systemInfo.memory.total / 1024).toFixed(1)}GB</div>
        </div>
      </div>
      <div className="w-px h-8 bg-white/20" />
      <div className="flex items-center space-x-4">
        <SystemGauge value={systemInfo.cpu.usage} title="CPU" />
        <div className="text-xs text-gray-100">
          <div>{systemInfo.cpu.usage.toFixed(1)}%</div>
          <div className="opacity-60">{systemInfo.cpu.count} 核心</div>
        </div>
      </div>
    </div>
  );
} 
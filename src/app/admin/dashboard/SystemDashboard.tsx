'use client'
import { useEffect, useState } from 'react';
import { Card, Grid, Spin, Typography } from '@arco-design/web-react';
import { IconCpu, IconMemory, IconDisk, IconServer } from '@arco-design/web-react/icon';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

interface SystemInfo {
  cpu: {
    model: string;
    cores: number;
    speed: number;
    usage: number;
  };
  memory: {
    total: number;
    free: number;
    used: number;
    usagePercentage: string;
  };
  system: {
    platform: string;
    type: string;
    release: string;
    arch: string;
    uptime: number;
    hostname: string;
  };
  disk: {
    filesystem: string;
    size: string;
    used: string;
    available: string;
    usagePercentage: number;
  };
}

export default function SystemDashboard() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await fetch('/api/system');
        if (!response.ok) {
          throw new Error('获取系统信息失败');
        }
        const data = await response.json();
        setSystemInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin dot />
      </div>
    );
  }

  if (error || !systemInfo) {
    return (
      <div className="text-center text-red-500 py-8">
        {error || '无法加载系统信息'}
      </div>
    );
  }

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}天 ${hours}小时 ${minutes}分钟`;
  };

  return (
    <div className="space-y-6">
      <Title heading={3}>系统信息</Title>
      
      <Row gutter={[16, 16]}>
        {/* CPU 信息 */}
        <Col span={6}>
          <Card>
            <div className="flex items-start space-x-3">
              <IconCpu className="text-2xl text-blue-500" />
              <div>
                <Text className="text-lg font-medium">CPU</Text>
                <div className="space-y-1 mt-2">
                  <Text className="block text-sm text-gray-500">型号: {systemInfo.cpu.model}</Text>
                  <Text className="block text-sm text-gray-500">核心数: {systemInfo.cpu.cores}</Text>
                  <Text className="block text-sm text-gray-500">主频: {systemInfo.cpu.speed}MHz</Text>
                  <Text className="block text-sm text-gray-500">使用率: {systemInfo.cpu.usage}%</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 内存信息 */}
        <Col span={6}>
          <Card>
            <div className="flex items-start space-x-3">
              <IconMemory className="text-2xl text-green-500" />
              <div>
                <Text className="text-lg font-medium">内存</Text>
                <div className="space-y-1 mt-2">
                  <Text className="block text-sm text-gray-500">总内存: {formatBytes(systemInfo.memory.total)}</Text>
                  <Text className="block text-sm text-gray-500">已用: {formatBytes(systemInfo.memory.used)}</Text>
                  <Text className="block text-sm text-gray-500">可用: {formatBytes(systemInfo.memory.free)}</Text>
                  <Text className="block text-sm text-gray-500">使用率: {systemInfo.memory.usagePercentage}%</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 磁盘信息 */}
        <Col span={6}>
          <Card>
            <div className="flex items-start space-x-3">
              <IconDisk className="text-2xl text-purple-500" />
              <div>
                <Text className="text-lg font-medium">磁盘</Text>
                <div className="space-y-1 mt-2">
                  <Text className="block text-sm text-gray-500">总空间: {systemInfo.disk.size}</Text>
                  <Text className="block text-sm text-gray-500">已用: {systemInfo.disk.used}</Text>
                  <Text className="block text-sm text-gray-500">可用: {systemInfo.disk.available}</Text>
                  <Text className="block text-sm text-gray-500">使用率: {systemInfo.disk.usagePercentage}%</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 系统信息 */}
        <Col span={6}>
          <Card>
            <div className="flex items-start space-x-3">
              <IconServer className="text-2xl text-orange-500" />
              <div>
                <Text className="text-lg font-medium">系统</Text>
                <div className="space-y-1 mt-2">
                  <Text className="block text-sm text-gray-500">平台: {systemInfo.system.platform}</Text>
                  <Text className="block text-sm text-gray-500">系统: {systemInfo.system.type}</Text>
                  <Text className="block text-sm text-gray-500">版本: {systemInfo.system.release}</Text>
                  <Text className="block text-sm text-gray-500">运行时间: {formatUptime(systemInfo.system.uptime)}</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 
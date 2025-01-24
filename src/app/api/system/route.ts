import { NextResponse } from 'next/server';
import os from 'os';
import { execSync } from 'child_process';

function getSystemInfo() {
  // CPU 信息
  const cpus = os.cpus();
  const cpuInfo = {
    model: cpus[0].model,
    cores: cpus.length,
    speed: cpus[0].speed,
    usage: 0
  };

  // 内存信息
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const memoryInfo = {
    total: totalMemory,
    free: freeMemory,
    used: totalMemory - freeMemory,
    usagePercentage: ((totalMemory - freeMemory) / totalMemory * 100).toFixed(2)
  };

  // 系统信息
  const systemInfo = {
    platform: os.platform(),
    type: os.type(),
    release: os.release(),
    arch: os.arch(),
    uptime: os.uptime(),
    hostname: os.hostname()
  };

  // 获取磁盘信息
  let diskInfo;
  try {
    if (process.platform === 'darwin') {
      // macOS
      const df = execSync('df -h /').toString();
      const lines = df.split('\n');
      const info = lines[1].split(/\s+/);
      diskInfo = {
        filesystem: info[0],
        size: info[1],
        used: info[2],
        available: info[3],
        usagePercentage: parseInt(info[4])
      };
    } else if (process.platform === 'linux') {
      // Linux
      const df = execSync('df -h /').toString();
      const lines = df.split('\n');
      const info = lines[1].split(/\s+/);
      diskInfo = {
        filesystem: info[0],
        size: info[1],
        used: info[2],
        available: info[3],
        usagePercentage: parseInt(info[4])
      };
    } else {
      // Windows or other
      diskInfo = {
        filesystem: 'Unknown',
        size: 'Unknown',
        used: 'Unknown',
        available: 'Unknown',
        usagePercentage: 0
      };
    }
  } catch (error) {
    console.error('获取磁盘信息失败:', error);
    diskInfo = {
      filesystem: 'Error',
      size: 'Unknown',
      used: 'Unknown',
      available: 'Unknown',
      usagePercentage: 0
    };
  }

  // 获取 CPU 使用率
  try {
    const startMeasure = cpus.reduce((acc, cpu) => {
      return {
        idle: acc.idle + cpu.times.idle,
        total: acc.total + Object.values(cpu.times).reduce((a, b) => a + b, 0)
      };
    }, { idle: 0, total: 0 });

    // 等待一小段时间再次测量
    const endMeasure = cpus.reduce((acc, cpu) => {
      return {
        idle: acc.idle + cpu.times.idle,
        total: acc.total + Object.values(cpu.times).reduce((a, b) => a + b, 0)
      };
    }, { idle: 0, total: 0 });

    const idleDifference = endMeasure.idle - startMeasure.idle;
    const totalDifference = endMeasure.total - startMeasure.total;
    cpuInfo.usage = 100 - Math.floor(100 * idleDifference / totalDifference);
  } catch (error) {
    console.error('获取CPU使用率失败:', error);
    cpuInfo.usage = 0;
  }

  return {
    cpu: cpuInfo,
    memory: memoryInfo,
    system: systemInfo,
    disk: diskInfo
  };
}

export async function GET() {
  try {
    const systemInfo = getSystemInfo();
    return NextResponse.json(systemInfo);
  } catch (error) {
    console.error('获取系统信息失败:', error);
    return NextResponse.json(
      { error: '获取系统信息失败' },
      { status: 500 }
    );
  }
} 
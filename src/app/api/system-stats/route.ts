import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  const totalMemory = Math.round(os.totalmem() / (1024 * 1024 * 1024));
  const freeMemory = Math.round(os.freemem() / (1024 * 1024 * 1024));
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = Math.round((usedMemory / totalMemory) * 100);
  
  const cpuUsage = os.loadavg()[0];
  const cpuCount = os.cpus().length;

  return NextResponse.json({
    memory: {
      total: totalMemory,
      used: usedMemory,
      free: freeMemory,
      usage: memoryUsage
    },
    cpu: {
      usage: Math.round(cpuUsage * 100 / cpuCount),
      count: cpuCount
    }
  });
} 
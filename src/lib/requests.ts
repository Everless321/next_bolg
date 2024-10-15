import { Message } from '@arco-design/web-react';
import { getCookie } from 'cookies-next';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;
  
  // 构建URL
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // 获取token
  const token = getCookie('token');

  // 合并headers
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: mergedHeaders,
    });
    if (!response.ok) {
      const errorData = await response.json();
      Message.error(errorData.message || '请求失败');
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('请求错误:', error);
    throw error;
  }
}

// GET请求
export function get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  return request<T>(endpoint, { ...options, method: 'GET' });
}

// POST请求
export function post<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> {
  console.log("post请求", body);
  return request<T>(endpoint, {
    ...options,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
  });
}

// PUT请求
export function put<T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

// DELETE请求
export function del<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  return request<T>(endpoint, { ...options, method: 'DELETE' });
}

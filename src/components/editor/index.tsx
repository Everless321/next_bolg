'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface EditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

// 将 MDEditor 的动态导入移到组件外部，这样不会在每次渲染时重新创建
const MDEditorComponent = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="border rounded-lg">
        <div className="min-h-[300px] bg-gray-50"></div>
      </div>
    )
  }
);

function EditorComponent({ value, onChange }: EditorProps) {
  const [isClient, setIsClient] = useState(false);
  const [mdValue, setMdValue] = useState(value || '');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (value !== undefined && value !== mdValue) {
      setMdValue(value);
    }
  }, [value]);

  const handleChange = useCallback((val?: string) => {
    setMdValue(val || '');
    onChange?.(val);
  }, [onChange]);

  if (!isClient) {
    return (
      <div className="border rounded-lg">
        <div className="min-h-[300px] bg-gray-50"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden" data-color-mode="light">
      <MDEditorComponent
        value={mdValue}
        onChange={handleChange}
        height={300}
        preview="edit"
        hideToolbar={false}
        enableScroll={true}
        visibleDragbar={false}
      />
    </div>
  );
}

// 使用 memo 包装导出的组件，避免不必要的重渲染
export const Editor = dynamic(() => Promise.resolve(EditorComponent), {
  ssr: false
}); 
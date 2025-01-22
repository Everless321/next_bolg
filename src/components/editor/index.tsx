'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

function EditorComponent({ value, onChange }: EditorProps) {
  const [editor, setEditor] = useState<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initEditor = async () => {
      const { createEditor, createToolbar } = await import('@wangeditor/editor');
      await import('@wangeditor/editor/dist/css/style.css');

      if (!editorRef.current || !toolbarRef.current || editor) return;

      const editorConfig = {
        placeholder: '请输入内容...',
        onChange(editor: any) {
          const newHtml = editor.getHtml();
          onChange?.(newHtml);
        }
      };

      const newEditor = createEditor({
        selector: editorRef.current,
        html: value || '',
        config: editorConfig,
      });

      const toolbarConfig = {};
      createToolbar({
        editor: newEditor,
        selector: toolbarRef.current,
        config: toolbarConfig,
      });

      setEditor(newEditor);
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHtml()) {
      editor.setHtml(value);
    }
  }, [value, editor]);

  if (!isClient) {
    return (
      <div className="border rounded-lg">
        <div className="border-b h-10"></div>
        <div className="min-h-[300px]"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <div ref={toolbarRef} className="border-b"></div>
      <div 
        ref={editorRef}
        className="min-h-[300px]"
        style={{ height: '300px', overflowY: 'auto' }}
      ></div>
    </div>
  );
}

export const Editor = dynamic(() => Promise.resolve(EditorComponent), {
  ssr: false
}); 
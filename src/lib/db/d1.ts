import { Post } from '../types';

export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  dump: () => Promise<ArrayBuffer>;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result<any>[]>;
  exec: (query: string) => Promise<D1Result<any>>;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = any>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result<any>>;
  all: <T = any>() => Promise<T[]>;
}

export interface D1Result<T> {
  success: boolean;
  error?: string;
  results?: T[];
  lastRowId: number | null;
}

export class D1Client {
  constructor(private db: D1Database) {}

  // 获取文章列表
  async getPosts(page: number = 1, pageSize: number = 10, status: string = 'published'): Promise<{ posts: Post[], total: number }> {
    const offset = (page - 1) * pageSize;
    
    const [postsResult, totalResult] = await this.db.batch([
      this.db.prepare('SELECT * FROM posts WHERE status = ? ORDER BY create_time DESC LIMIT ? OFFSET ?')
        .bind(status, pageSize, offset),
      this.db.prepare('SELECT COUNT(*) as total FROM posts WHERE status = ?')
        .bind(status)
    ]);

    const posts = (postsResult.results || []) as Post[];
    const total = (totalResult.results?.[0] as { total: number })?.total || 0;

    return { posts, total };
  }

  // 获取单篇文章
  async getPost(id: number | string): Promise<Post | null> {
    const result = await this.db
      .prepare('SELECT * FROM posts WHERE id = ?')
      .bind(id)
      .first<Post>();
    
    return result;
  }

  // 创建文章
  async createPost(post: Partial<Post>): Promise<number> {
    const result = await this.db
      .prepare(`
        INSERT INTO posts (title, content, author, status)
        VALUES (?, ?, ?, ?)
      `)
      .bind(
        post.title || '',
        post.content || '',
        post.author || 'anonymous',
        post.status || 'draft'
      )
      .run();
    
    return result.lastRowId || 0;
  }

  // 更新文章
  async updatePost(id: number, post: Partial<Post>): Promise<boolean> {
    const updates: string[] = [];
    const values: any[] = [];

    if (post.title !== undefined) {
      updates.push('title = ?');
      values.push(post.title);
    }
    if (post.content !== undefined) {
      updates.push('content = ?');
      values.push(post.content);
    }
    if (post.status !== undefined) {
      updates.push('status = ?');
      values.push(post.status);
    }
    if (post.author !== undefined) {
      updates.push('author = ?');
      values.push(post.author);
    }

    updates.push('last_update_time = CURRENT_TIMESTAMP');

    const query = `
      UPDATE posts 
      SET ${updates.join(', ')}
      WHERE id = ?
    `;
    values.push(id);

    const result = await this.db.prepare(query).bind(...values).run();
    return result.success;
  }

  // 删除文章
  async deletePost(id: number): Promise<boolean> {
    const result = await this.db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success;
  }
} 
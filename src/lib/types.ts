export interface Article {
    id: number;
    title?: string | null;
    content?: string | null;
    author?: string | null;
    status?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    slug?: string | null;
    excerpt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    views: number;
    likes: number;
    favorites: number;
    commentsCount: number;
  }
export interface Post {
    ID: number;
    title?: string | null;
    content?: string | null;
    author?: string | null;
    status?: string | null;
    createTime?: Date | null;
    lastUpdateTime?: Date | null;
    order?: string | null;
    password?: string | null;
    
  }
  
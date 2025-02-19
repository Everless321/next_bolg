-- 创建文章表
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    author TEXT,
    status TEXT DEFAULT 'draft',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_update_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    order_num INTEGER DEFAULT 0,
    password TEXT,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    stars INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0
);

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE,
    avatar TEXT,
    role TEXT DEFAULT 'user',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_time DATETIME
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    content TEXT NOT NULL,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    parent_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 创建标签表
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建文章标签关联表
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
); 
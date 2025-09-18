
# Designing a Blog Database Schema (PostgreSQL Version)

This document provides a PostgreSQL-compatible version of the database schema described in `DB.md`.

## Table Designs

### 1. The `users` Table

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Assuming hashed
    role VARCHAR(50) DEFAULT 'subscriber' CHECK (role IN ('admin', 'author', 'subscriber')), -- Basic role management
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. The `posts` Table

```sql
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT, -- Foreign key to the user who authored the post
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE, -- SEO-friendly URL identifier
    body TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')), -- For content moderation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
```

### 3. The `comments` Table

```sql
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT, -- The post being commented on
    user_id INT, -- The user making the comment (can be null if anonymous commenting is allowed)
    parent_comment_id INT NULL, -- For threaded comments/replies
    comment_body TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'spam')), -- For content moderation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);
```

### 4. The `categories` Table

```sql
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);
```

### 5. The `post_categories` Table (Many-to-Many)

```sql
CREATE TABLE post_categories (
    post_id INT,
    category_id INT,
    PRIMARY KEY(post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);
```

### 6. The `tags` Table

```sql
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);
```

### 7. The `post_tags` Table (Many-to-Many)

```sql
CREATE TABLE post_tags (
    post_id INT,
    tag_id INT,
    PRIMARY KEY(post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);
```

### 8. The `post_views` Table

```sql
CREATE TABLE post_views (
    post_view_id SERIAL PRIMARY KEY,
    post_id INT,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);
```

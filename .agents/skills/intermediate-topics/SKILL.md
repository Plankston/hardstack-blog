---
name: intermediate-topics
description: "选题规划 skill — 博客内容缺口分析 + 热点收集 + 五维度评分，输出 3-5 个结构化选题建议。触发词：'选题建议','有什么选题','规划选题','选题'"
---

# Intermediate Topics — 选题规划

## 流程概述

```
Step 1: 内容缺口分析
  └── 读取 src/content/blog/*.mdx → 提取 groupKey/category → 识别缺口

Step 2: 热点收集（并行搜索）
  └── GitHub Trending + Reddit + V2EX + Hacker News

Step 3: 五维度评分
  └── 搜索量 × 0.3 + Stars × 0.2 + 难度 × 0.2 + 变现 × 0.2 + 稀缺度 × 0.1

Step 4: 输出结构化建议
  └── 3-5 个选题，每个包含来源、评分、推荐模式、理由
```

---

## Step 1: 内容缺口分析

### 读取现有文章

```bash
for f in src/content/blog/*.mdx; do
  echo "=== $(basename $f) ==="
  head -15 "$f" | grep -E "^(groupKey|category):"
done
```

### 按领域分类

| 领域 | 典型项目 | 已覆盖 |
|------|----------|--------|
| AI 编程工具 | OpenCode, Cursor, Copilot | 检查 |
| 密码管理 | Vaultwarden, Bitwarden | 检查 |
| 媒体服务 | Immich, Jellyfin, Plex | 检查 |
| 代码托管 | Gitea, GitLab, Forgejo | 检查 |
| 反向代理 | NPM, Traefik, Caddy | 检查 |
| 监控 | Uptime Kuma, Grafana, Netdata | 检查 |
| 容器编排 | Docker Compose, Portainer | 检查 |
| 备份 | Borg, Restic, Duplicati | 检查 |
| 自动化 | n8n, Activepieces | 检查 |
| VPN/远程访问 | Tailscale, WireGuard | 检查 |
| 知识库 | Outline, BookStack | 检查 |
| 笔记 | Memos, SiYuan | 检查 |

### 输出缺口列表

格式：
```
缺口领域：[领域名]
候选项目：[项目1], [项目2]
优先级：高/中/低
```

---

## Step 2: 热点收集

并行执行以下搜索：

```
调用 websearch({
  query: "selfhosted trending open source projects 2026",
  type: "deep",
  numResults: 5
})

调用 websearch({
  query: "GitHub trending selfhosted weekly",
  type: "deep",
  numResults: 5
})

调用 websearch({
  query: "r/selfhosted popular homelab tools 2026",
  type: "deep",
  numResults: 5
})

调用 websearch({
  query: "site:v2ex.com 自部署 开源 推荐",
  type: "deep",
  numResults: 5
})
```

### 提取热点项目

从搜索结果中提取：
- 项目名称
- GitHub Stars 数
- 最近更新频率
- 社区讨论热度

---

## Step 3: 五维度评分

### 评分模型

| 维度 | 权重 | 数据来源 | 评分标准 |
|------|------|----------|----------|
| 搜索量 | 0.3 | Ahrefs/Ubersuggest 免费查 | 1-5 分（搜索量越高分越高）|
| GitHub Stars | 0.2 | GitHub API | > 10k = 5, 5-10k = 4, 1-5k = 3, < 1k = 2 |
| 实操难度 | 0.2 | 手动评估 | 简单 = 5, 中等 = 3, 复杂 = 1 |
| 变现潜力 | 0.2 | 手动评估 | 有 VPS/域名关联 = 5, 相关 = 3, 无关 = 1 |
| 内容稀缺度 | 0.1 | Google 搜索结果 | 中英都少 = 5, 一方少 = 3, 都多 = 1 |

### 总分计算

```
总分 = 搜索量 × 0.3 + Stars × 0.2 + 难度 × 0.2 + 变现 × 0.2 + 稀缺度 × 0.1
```

### 推荐阈值

- **总分 > 4.0**：强烈推荐
- **总分 3.5-4.0**：推荐
- **总分 3.0-3.5**：可选
- **总分 < 3.0**：不推荐

---

## Step 4: 输出结构化建议

### 输出格式

```markdown
## 选题建议

### 1. [项目名] [教程类型]
- **来源**：博客缺口 + GitHub [Stars] Stars + [论坛] 热门
- **评分**：[总分]/5.0
  - 搜索量：[x]/5 × 0.3 = [y]
  - Stars：[x]/5 × 0.2 = [y]
  - 难度：[x]/5 × 0.2 = [y]
  - 变现：[x]/5 × 0.2 = [y]
  - 稀缺度：[x]/5 × 0.1 = [y]
- **推荐模式**：邪修版 / 正经版 / 混搭
- **语言**：中文优先 / 英文优先 / 双语
- **理由**：[为什么推荐]
- **预估篇幅**：[N] min 阅读

### 2. [项目名] [教程类型]
...
```

---

## 使用示例

### 输入

```
执行选题规划
```

### 输出

```markdown
## 选题建议

### 1. Immich 自部署相册
- **来源**：博客缺口（无媒体相册类）+ GitHub 100K+ Stars + Reddit 热门
- **评分**：4.6/5.0
  - 搜索量：5/5 × 0.3 = 1.5
  - Stars：5/5 × 0.2 = 1.0
  - 难度：4/5 × 0.2 = 0.8
  - 变现：4/5 × 0.2 = 0.8
  - 稀缺度：5/5 × 0.1 = 0.5
- **推荐模式**：邪修版 / 中文优先
- **理由**：Google Photos 替代品，homelab 刚需，中文教程稀缺
- **预估篇幅**：15-20 min 阅读

### 2. Jellyfin 媒体服务器
- **来源**：博客缺口 + GitHub 35K+ Stars + Plex 用户迁移趋势
- **评分**：4.3/5.0
- **推荐模式**：邪修版 / 中文优先
- **理由**：Plex 付费墙导致用户迁移，完全开源替代
- **预估篇幅**：20-25 min 阅读
```

---

## 约束

1. 至少输出 3 个选题，不超过 5 个
2. 每个选题必须注明来源和理由
3. 总分 < 3.0 的不输出
4. 选题不得与最近 3 篇已发文章重复
5. 用户确认后才能进入下一阶段

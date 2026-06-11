# OpenCode 完整功能指南

**最后更新**: 2026-06-09  
**版本**: 1.16.2  

---

## 什么是 OpenCode

OpenCode 是一个开源的 AI 编码助手，类似于 Claude Code 和 GitHub Copilot。它提供 TUI（终端用户界面）和 CLI 两种交互模式，支持多种 AI 提供商，是跨平台的开发辅助工具。

### 安装方法

```bash
# npm 安装
npm i -g opencode-ai@latest

# 或使用 Homebrew (macOS)
brew install anomalyco/tap/opencode

# 验证安装
opencode --version
```

---

## 目录

1. [核心命令](#核心命令)
2. [TUI 模式详解](#tui-模式详解)
3. [CLI 模式详解](#cli-模式详解)
4. [AI 提供商配置](#ai-提供商配置)
5. [MCP 集成](#mcp-集成)
6. [Agent 系统](#agent-系统)
7. [会话管理](#会话管理)
8. [GitHub 集成](#github-集成)
9. [服务器模式](#服务器模式)
10. [配置详解](#配置详解)
11. [进阶技巧](#进阶技巧)

---

## 核心命令

| 命令 | 说明 |
|------|------|
| `opencode` | 启动 TUI 交互界面 (默认) |
| `opencode run "prompt"` | 单次执行指定提示 |
| `opencode serve` | 启动无头服务器模式 |
| `opencode web` | 启动网页界面服务器 |
| `opencode pr <num>` | 抓取并检出 GitHub PR 分支 |
| `opencode models [provider]` | 列出可用模型 |
| `opencode session` | 管理会话 |
| `opencode stats` | 查看 Token 使用统计 |

---

## TUI 模式详解

TUI 模式提供交互式界面，适合长时间的编码会话。

### 启动 TUI

```bash
# 在项目目录启动
cd /path/to/project
opencode

# 指定项目路径
opencode /path/to/project

# 继续上次会话
opencode --continue
# 或
opencode -c

# 指定会话继续
opencode --session ses_abc123
# 或
opencode -s ses_abc120
```

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 提交消息 (偶尔需按两次) |
| `Tab` | 在 agents (build/plan) 之间切换 |
| `Ctrl+P` | 打开命令面板 |
| `Ctrl+X L` | 切换会话 |
| `Ctrl+X M` | 切换模型 |
| `Ctrl+X N` | 新建会话 |
| `Ctrl+X E` | 打开编辑器 |
| `Ctrl+C` | 退出 OpenCode |

### TUI 示例

```bash
# 启动 TUI 并马上发送提示（非交互）
opencode -p "分析这个项目的架构并给出改进建议"

# 在后台运行（适合 Hermes）
opencode --demo "介绍一下自己，然后等待下一条指令" &
```

---

## CLI 模式详解

CLI 模式适合自动化脚本和一次性任务。

### 基本用法

```bash
# 简单任务
opencode run "添加重试逻辑到 API 调用"

# 附加文件
opencode run "审查这个配置文件的安全问题" -f config.yaml -f .env.example

# 显示模型思考过程
opencode run "调试为什么 CI 测试失败" --thinking

# 指定模型
opencode run "重构 auth 模块" --model openrouter/anthropic/claude-sonnet-4
```

### 完整选项

```bash
opencode run [message..]

选项:
  --command         执行的命令 (默认使用提示作为命令)
  --continue, -c  继续上次会话
  --session       指定会话 ID 继续
  --share         分享会话
  --model, -m     指定模型 (provider/model 格式)
  --agent         指定 agent
  --format        输出格式: default 或 json
  --file, -f      附加文件 (可重复)
  --title         会话标题
  --attach        连接到运行中的 opencode 服务器
  --port          本地服务器端口
  --variant       模型变体 (high/max/minimal)
  --thinking      显示思考块
  --replay        恢复交互历史 (默认 true)
  --dangerously-skip-permissions  自动批准未明确拒绝的权限 (危险!)
```

---

## AI 提供商配置

### 列出可用提供商

```bash
opencode providers list
opencode auth list
```

### 登录提供商

```bash
# 交互式登录
opencode providers login

# 或设置环境变量
export OPENROUTER_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-..."
export OPENAI_API_KEY="sk-..."
```

### 配置示例

```json
{
  "provider": {
    "anthropic": {
      "api": "https://api.anthropic.com",
      "env": ["ANTHROPIC_API_KEY"]
    },
    "openrouter": {
      "npm": "@opencode/plugin-openrouter",
      "env": ["OPENROUTER_API_KEY"]
    }
  },
  "enabled_providers": ["anthropic", "openrouter"],
  "disabled_providers": ["openai"]
}
```

---

## MCP 集成

MCP (Model Context Protocol) 允许连接外部工具和服务。

### 列出 MCP 服务器

```bash
opencode mcp list
opencode mcp ls
```

### 添加 MCP 服务器

```bash
# 添加 stdio 服务器
opencode mcp add filesystem -- "npx -y @modelcontextprotocol/server-filesystem /path/to/data"

# 添加 SSE 服务器
opencode mcp add --port 3001 -- "node my-mcp-server.js"
```

### 认证 MCP 服务器

```bash
opencode mcp auth myserver
opencode mcp logout myserver
opencode mcp debug myserver
```

---

## Agent 系统

OpenCode 支持创建自定义 agent 来处理特定任务。

### 列出 agents

```bash
opencode agent list
```

### 创建 agent

```bash
opencode agent create my-agent \
  --description "专门处理 React 组件开发" \
  --mode subagent \
  --model openrouter/anthropic/claude-sonnet-4
```

### Agent 配置示例

```json
{
  "agent": {
    "code-reviewer": {
      "name": "Code Reviewer",
      "description": "代码审查专家，专注正确性和安全性",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4",
      "color": "#E74C3C",
      "permissions": ["read", "edit"]
    },
    "bug-hunter": {
      "name": "Bug Hunter",
      "description": "调试和修复专家",
      "mode": "subagent",
      "model": "openai/gpt-4",
      "variant": "high",
      "permissions": ["bash", "read", "edit"]
    }
  }
}
```

### 使用 agent

```bash
opencode run "审查这段代码" --agent code-reviewer
```

---

## 会话管理

### 列出会话

```bash
opencode session list
```

### 删除会话

```bash
opencode session delete ses_abc123
```

### 导出会话

```bash
# 导出当前会话
opencode export

# 导出特定会话
opencode export ses_abc123

# 导出并脱敏
opencode export ses_abc123 --sanitize
```

### 导入会话

```bash
opencode import session.json
opencode import https://opencode.ai/share/xxx
```

---

## GitHub 集成

### 安装 GitHub agent

```bash
opencode github install
```

### 运行 GitHub agent

```bash
opencode github run
```

### PR 审查

```bash
# 抓取 PR 42 并启动 opencode
opencode pr 42

# 在临时克隆中审查 PR
REVIEW=$(mktemp -d)
git clone https://github.com/user/repo.git $REVIEW
cd $REVIEW
opencode run "审查这个 PR 与 main 的差异。报告 bug、安全风险、测试缺口和样式问题。"
```

---

## 服务器模式

### 启动无头服务器

```bash
# 基本启动
opencode serve

# 指定端口
opencode serve --port 4096

# 启用 mDNS 发现
opencode serve --mdns
# 可通过 http://opencode.local:4096 访问
```

### 启动 Web 界面

```bash
opencode web
# 或
opencode web --port 3096
```

### 连接到远程服务器

```bash
opencode attach http://hostname:4096
```

---

## 配置详解

OpenCode 配置文件位于 `~/.config/opencode/opencode.json`

### 完整配置示例

```json
{
  "$schema": "https://opencode.ai/config.json",
  
  "shell": "/bin/bash",
  
  "logLevel": "INFO",
  
  "server": {
    "port": 0,
    "hostname": "127.0.0.1",
    "mdns": false,
    "mdnsDomain": "opencode.local",
    "cors": []
  },
  
  "skills": {
    "paths": ["~/.config/opencode/skills"]
  },
  
  "model": "anthropic/claude-sonnet-4",
  "small_model": "openai/gpt-3.5-turbo",
  "default_agent": "build",
  "username": "developer",
  
  "share": "manual",
  
  "agent": {
    "build": {
      "name": "Build Agent",
      "description": "默认的编码助手 agent",
      "model": "anthropic/claude-sonnet-4",
      "mode": "primary"
    }
  },
  
  "mcp": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/data"]
    }
  },
  
  "formatter": true,
  
  "lsp": true,
  
  "instructions": [
    "~/.config/opencode/instructions.md"
  ],
  
  "permission": {
    "read": {
      "~/**": "allow",
      "/etc/**": "deny"
    },
    "edit": {
      "**/*.go": "allow",
      "**/*": "ask"
    },
    "bash": "ask"
  }
}
```

### 权限配置说明

| 权限类型 | 说明 |
|---------|------|
| `read` | 文件读取权限 |
| `edit` | 文件编辑权限 |
| `bash` | 终端执行权限 |

权限值可为：`ask` (询问)、`allow` (允许)、`deny` (拒绝)

---

## 进阶技巧

### 1. 调试工具

```bash
# 查看配置
opencode debug config

# 查看调试信息
opencode debug info

# 查看 LSP 调试信息
opencode debug lsp

# 查看启动时间
opencode debug startup

# 查看 agent 配置
opencode debug agent build
```

### 2. 统计和成本管理

```bash
# 查看所有统计
opencode stats

# 查看最近 7 天
opencode stats --days 7

# 查看模型使用
opencode stats --models 5

# 按项目筛选
opencode stats --project myproject
```

### 3. 插件管理

```bash
# 安装插件
opencode plugin opencode-plugin-github
opencode plugin --global opencode-plugin-docs

# 强制重新安装
opencode plugin opencode-plugin-github --force
```

### 4. 升级和卸载

```bash
# 升级到最新版本
opencode upgrade

# 升级到指定版本
opencode upgrade 1.15.0

# 卸载
opencode uninstall
```

### 5. Shell 补全

```bash
# 生成 bash 补全
opencode completion

# 生成 zsh 补全
opencode completion >> ~/.zsh/completion/_opencode
```

### 6. ACP (Agent Client Protocol)

```bash
# 启动 ACP 服务器
opencode acp
```

### 7. 并行任务模式

```bash
# 两个任务并行处理
opencode run "修复 #101 问题" -m &
opencode run "添加解析器回归测试" -m
wait
```

### 8. 测试 Smoke Test

```bash
opencode run 'Respond with exactly: OPENCODE_SMOKE_OK'
# 成功时输出包含: OPENCODE_SMOKE_OK
```

---

## 常见问题 (Pitfalls)

### 1. TUI 需要 PTY 模式

交互模式必须使用 `pty=true`，否则无法正常输入：

```bash
# 正确
opencode --continue -p "请等待下一指示"  # Hermes 后台模式

# 错误
opencode --continue  # 前台模式卡住
```

### 2. 不要使用 `/exit` 退出

`/exit` 不是有效命令，会打开 agent 选择器。正确方式：

```bash
# 使用 Ctrl+C 或 kill
Ctrl+C
# 或
pkill -f opencode
```

### 3. PATH 二进制冲突

检查是否有多个版本：

```bash
which -a opencode
opencode --version
```

### 4. 文件权限问题

OpenCode 需要适当的文件系统权限，配置 `permission` 字段：

```json
{
  "permission": {
    "read": {"~/projects/**": "allow"},
    "bash": "allow"  # 谨慎使用
  }
}
```

---

## 参考资料

- 官方网站: https://opencode.ai
- GitHub: https://github.com/sst/opencode
- 配置文件 schema: https://opencode.ai/config.json

---

*本文档由 Hermes Agent 于 2026-06-09 编写*
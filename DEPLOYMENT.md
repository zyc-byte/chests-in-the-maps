# 🚀 部署指南

本项目支持多种部署方式，所有平台的免费版功能完整，无阉割。

## 📋 快速选择

| 平台 | 免费流量 | 特点 | 推荐场景 |
|------|----------|------|----------|
| **Cloudflare Pages** | ♾️ 无限 | 全球 CDN，国内访问好 | ⭐ 首选 |
| **Vercel** | 100GB/月 | 最佳体验，功能最强 | ⭐ 推荐 |
| **Netlify** | 100GB/月 | 功能全面，生态成熟 | ✅ 可选 |
| **GitHub Pages** | ♾️ 无限 | 永久免费，稳定可靠 | ✅ 备选 |

---

## 🌟 方案一：Cloudflare Pages（推荐）

### 为什么选择 Cloudflare Pages？
- ✅ **无限流量**（真正无限！）
- ✅ 全球 200+ CDN 节点
- ✅ 国内访问相对较好
- ✅ 自动 HTTPS
- ✅ 支持 Workers Functions

### 方式 1：Git 自动部署（推荐）

1. **访问 [Cloudflare Pages](https://pages.cloudflare.com/)**

2. **连接 GitHub 仓库**
   - 点击 "Create a project"
   - 选择 GitHub 仓库
   - 授权访问

3. **配置构建设置**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   ```

4. **部署**
   - 点击 "Save and Deploy"
   - 每次 git push 自动部署

### 方式 2：CLI 部署

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录
wrangler login

# 3. 构建并部署
npm run deploy:cf

# 或手动执行
npm run build
wrangler pages publish dist --project-name=chests-in-the-maps
```

### 方式 3：GitHub Actions 自动部署（可选）

> ⚠️ **默认未启用**：仓库中的 `.github/workflows/deploy-pages.yml` 已禁用。如果你直接在 Cloudflare Pages 中连接 Git 仓库，无需 GitHub Actions。

**🤖 什么是 GitHub Actions？**

GitHub Actions 是 GitHub 提供的 CI/CD（持续集成/持续部署）自动化工具。当你推送代码到 GitHub 时，它会自动执行预定义的工作流程（如构建、测试、部署）。

**✨ 适合在以下场景启用 Cloudflare Actions：**
- ✅ 希望所有部署流水线都集中在 GitHub 上
- ✅ 需要在部署前执行额外脚本或检测
- ✅ 公司/团队限制第三方直接访问代码仓库
- ✅ 想统一多平台（如 Github Pages + Cloudflare）部署策略

**📋 启用步骤：**

1. **取消禁用文件**
   - 打开 `.github/workflows/deploy-pages.yml`
   - 将文件内容替换为 Cloudflare 示例工作流（可从 [Cloudflare 官方模板](https://github.com/cloudflare/pages-action) 获取）

2. **在 Cloudflare 获取凭证**
   - **Account ID**: 登录 Cloudflare Dashboard，右侧边栏可找到
   - **API Token**: 
     - 进入 "My Profile" → "API Tokens"
     - 点击 "Create Token"
     - 选择 "Create Custom Token"
     - 权限设置：`Account - Cloudflare Pages - Edit`
     - 复制生成的 Token（只显示一次！）

3. **在 GitHub 设置 Secrets**
   - 进入仓库 `Settings` → `Secrets and variables` → `Actions`
   - 点击 `New repository secret`
   - 添加以下两个 Secret：
     - 名称: `CLOUDFLARE_API_TOKEN`，值: 你的 API Token
     - 名称: `CLOUDFLARE_ACCOUNT_ID`，值: 你的 Account ID

4. **推送代码自动部署**
   - 推送到 `main` 分支后，Actions 会运行并部署到 Cloudflare Pages
   - 在 GitHub 仓库的 `Actions` 标签查看部署进度

**🔄 工作流程（启用后）：**
```
推送代码到 GitHub
    ↓
GitHub Actions 检测到推送
    ↓
自动安装依赖 (npm ci)
    ↓
自动构建项目 (npm run build)
    ↓
自动部署到 Cloudflare Pages
    ↓
部署完成，获得 URL
```

---

## 🚀 方案二：Vercel（最佳体验）

### 为什么选择 Vercel？
- ✅ 最佳开发体验
- ✅ 零配置部署
- ✅ 100GB 免费流量
- ✅ 功能最丰富
- ⚠️ 国内可能被墙

### 方式 1：Git 自动部署（推荐）

1. **访问 [Vercel](https://vercel.com/)**

2. **导入 GitHub 仓库**
   - 点击 "Import Project"
   - 选择仓库
   - Vercel 自动检测 Vite 配置

3. **自动部署**
   - 点击 "Deploy"
   - 每次 git push 自动部署

### 方式 2：CLI 部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署到生产环境
npm run deploy:vercel

# 或部署预览版
npm run deploy:vercel:preview

# 首次部署会问几个问题：
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - Project name? chests-in-the-maps
# - Directory? ./
# - Override settings? No
```

### 配置文件
项目已包含 `vercel.json` 配置：
- ✅ 自动 SPA 路由重写
- ✅ 缓存优化
- ✅ Vite 框架识别

---

## 🔵 方案三：Netlify（已配置）

### 部署方式

**Git 自动部署（推荐）**
1. 访问 [Netlify](https://www.netlify.com/)
2. Import from Git → 选择仓库
3. 自动检测配置并部署

**CLI 部署**
```bash
npm install -g netlify-cli
netlify login
npm run deploy:netlify
```

配置文件：`netlify.toml`

---

## 🐙 方案四：GitHub Pages

### 为什么选择 GitHub Pages？
- ✅ **永久免费**（公开仓库）
- ✅ **无限流量**（软限制 100GB/月）
- ✅ **稳定可靠**（GitHub 官方服务）
- ✅ **自动 HTTPS**
- ✅ **支持自定义域名**
- ⚠️ 国内访问较慢

### 方式 1：GitHub Actions 自动部署（推荐）

**🤖 使用 GitHub Actions 自动部署的优势：**
- ✅ 零配置：推送代码即部署
- ✅ 无需安装额外工具
- ✅ 构建在云端完成
- ✅ 部署历史可追溯

**📋 配置步骤：**

1. **启用 GitHub Pages**
   - 进入仓库 `Settings` → `Pages`
   - Source 选择 `GitHub Actions`

2. **推送代码自动部署**
   - 已配置 `.github/workflows/deploy-gh-pages.yml`
   - 每次推送到 `main` 分支自动部署
   - 在 `Actions` 标签查看部署状态

3. **访问网站**
   - 部署成功后，访问：`https://你的用户名.github.io/仓库名`
   - 或在 `Settings` → `Pages` 查看 URL

**🔄 工作流程：**
```
推送代码到 GitHub
    ↓
GitHub Actions 自动触发
    ↓
安装依赖并构建 (npm ci && npm run build)
    ↓
上传构建产物到 GitHub Pages
    ↓
自动部署到 GitHub Pages
    ↓
网站更新完成
```

### 方式 2：gh-pages CLI 部署

**适用场景**：手动部署、本地控制

```bash
# 1. 安装 gh-pages
npm install -D gh-pages

# 2. 修改 package.json 添加
{
  "homepage": "https://你的用户名.github.io/仓库名",
  "scripts": {
    "deploy:gh": "npm run build && gh-pages -d dist"
  }
}

# 3. 部署
npm run deploy:gh
```

**注意**: 
- 首次部署会自动创建 `gh-pages` 分支
- 需要在仓库 `Settings` → `Pages` 中选择 `gh-pages` 分支作为源
- 每次部署需要手动运行命令

### 方式 3：手动上传

1. 本地构建：`npm run build`
2. 将 `dist` 文件夹内容推送到 `gh-pages` 分支
3. 在 Settings → Pages 选择 `gh-pages` 分支

### 自定义域名（可选）

1. 在仓库根目录创建 `public/CNAME` 文件
2. 写入你的域名：`your-domain.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `你的用户名.github.io`

---

## 🔄 部署对比

### 速度对比
```
Vercel:          ⚡⚡⚡⚡⚡ (最快)
Cloudflare:      ⚡⚡⚡⚡⚡ (最快)
Netlify:         ⚡⚡⚡⚡
GitHub Pages:    ⚡⚡⚡
```

### 国内访问
```
Cloudflare:      ⭐⭐⭐⭐ (较好)
Netlify:         ⭐⭐⭐ (一般)
Vercel:          ⭐⭐ (可能被墙)
GitHub Pages:    ⭐⭐ (较慢)
```

### 免费额度
```
Cloudflare:      无限流量 🏆
GitHub Pages:    无限流量 🏆
Vercel:          100GB/月
Netlify:         100GB/月
```

---

## 📝 部署清单

**首次部署前确认**：
- ✅ 代码已提交到 Git
- ✅ `npm run build` 本地构建成功
- ✅ 选择合适的部署平台
- ✅ 准备好部署凭证（如需要）

**推荐流程**：
1. 先用 Git 自动部署测试（Cloudflare/Vercel/Netlify）
2. 确认无问题后配置自定义域名
3. 开启 HTTPS（自动）
4. 配置 CDN 加速（自动）

---

## 🤖 GitHub Actions 详解

### 什么是 GitHub Actions？

GitHub Actions 是 GitHub 内置的自动化工具，可以在代码仓库中自动执行各种任务。

### 为什么使用 GitHub Actions 部署？

**传统部署方式的问题：**
- ❌ 需要在本地构建（占用本地资源）
- ❌ 需要安装各种 CLI 工具
- ❌ 需要手动执行部署命令
- ❌ 团队协作时每个人都要配置

**GitHub Actions 的优势：**
- ✅ **自动化**：推送代码即部署，无需手动操作
- ✅ **云端构建**：在 GitHub 服务器上构建，不占用本地资源
- ✅ **零配置**：团队成员无需安装任何工具
- ✅ **可追溯**：每次部署都有详细日志
- ✅ **免费**：公开仓库完全免费使用
- ✅ **多平台**：可同时部署到多个平台

### 本项目的 GitHub Actions 配置

#### 1. Cloudflare Pages 自动部署
**文件**: `.github/workflows/deploy-pages.yml`

**触发条件**: 推送到 `main` 分支

**执行步骤**:
1. 检出代码
2. 安装 Node.js 18
3. 安装依赖 (`npm ci`)
4. 构建项目 (`npm run build`)
5. 部署到 Cloudflare Pages

**所需 Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

#### 2. GitHub Pages 自动部署
**文件**: `.github/workflows/deploy-gh-pages.yml`

**触发条件**: 推送到 `main` 分支

**执行步骤**:
1. 检出代码
2. 安装 Node.js 18
3. 安装依赖 (`npm ci`)
4. 构建项目 (`npm run build`)
5. 上传构建产物
6. 部署到 GitHub Pages

**所需权限**: 自动配置，无需手动设置

### 如何查看部署状态？

1. 进入 GitHub 仓库
2. 点击 `Actions` 标签
3. 查看最新的工作流运行
4. 点击查看详细日志

### 如何禁用自动部署？

如果你不想使用 GitHub Actions：
1. 删除 `.github/workflows/` 目录下的 yml 文件
2. 或在文件中注释掉 `on:` 部分

---

## 🆘 常见问题

### Q: 部署后页面空白？
A: 检查 `vite.config.ts` 的 `base` 配置：
```ts
export default defineConfig({
  base: '/', // GitHub Pages 需要改为 '/仓库名/'
})
```

### Q: 刷新页面 404？
A: 确保配置了 SPA 路由重写：
- Vercel: `vercel.json` ✅ 已配置
- Netlify: `netlify.toml` ✅ 已配置
- Cloudflare: 自动处理 ✅
- GitHub Pages: GitHub Actions 自动处理 ✅

### Q: 部署失败？
A: 检查构建日志，常见原因：
- Node 版本不匹配（需要 18+）
- 依赖安装失败（检查 package.json）
- 构建命令错误（检查配置文件）

### Q: GitHub Actions 部署失败？
A: 
1. 检查 `Actions` 标签中的错误日志
2. 确认 Secrets 配置正确（Cloudflare）
3. 确认 GitHub Pages 已启用（GitHub Pages）
4. 检查仓库权限设置

### Q: 如何同时部署到多个平台？
A: 
- 方式1: 保留多个 GitHub Actions 工作流
- 方式2: 使用 Git 自动部署（Vercel/Netlify/Cloudflare）
- 方式3: 手动使用 CLI 部署到不同平台

---

## 🎯 推荐部署方案

**个人项目 / 开源项目**:
```
1. Cloudflare Pages (Git 自动部署)
2. Vercel (CLI 或 Git)
3. Netlify (备选)
```

**企业项目**:
```
1. Vercel (最佳体验)
2. Cloudflare Pages (最快)
3. 自建服务器 (完全控制)
```

**国内用户为主**:
```
1. Cloudflare Pages
2. 阿里云 OSS + CDN
3. 腾讯云静态托管
```

---

## 📞 获取帮助

- Vercel: https://vercel.com/docs
- Cloudflare: https://developers.cloudflare.com/pages/
- Netlify: https://docs.netlify.com/
- GitHub Pages: https://pages.github.com/

祝部署顺利！🎉

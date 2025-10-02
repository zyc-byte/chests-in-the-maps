# 🚀 Netlify 部署指南

## 快速开始

### 方法1：拖拽部署（最快，3分钟）

```bash
# 1. 构建项目
npm run build

# 2. 访问 https://app.netlify.com/drop
# 3. 将 dist 文件夹拖拽到页面
# 4. 完成！
```

### 方法2：Git自动部署（推荐）

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **连接Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub
   - 选择仓库 `chests-in-the-maps`
   - 构建设置（自动检测）：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 点击 "Deploy site"

3. **完成**
   - 每次push到main分支自动部署
   - 获得 `https://your-site-name.netlify.app` 域名

### 方法3：使用CLI

```bash
# 1. 安装CLI（全局安装一次即可）
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 初始化（第一次）
netlify init

# 4. 部署预览
npm run deploy:preview

# 5. 部署到生产环境
npm run deploy
```

## 📋 配置文件说明

项目已包含 `netlify.toml` 配置文件：

```toml
[build]
  command = "npm run build"    # 构建命令
  publish = "dist"              # 发布目录

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200                  # SPA路由支持

[build.environment]
  NODE_VERSION = "18"           # Node.js版本
```

## 🎯 部署后检查

访问你的网站后，测试以下功能：

- [ ] 游戏正常加载
- [ ] 可以开始新游戏
- [ ] 地图正常显示
- [ ] 玩家可以移动
- [ ] 所有按键功能正常
- [ ] 商店系统正常
- [ ] 背包系统正常
- [ ] 控制台无错误

## 🔧 自定义域名

### 使用Netlify子域名

1. 进入 Site settings → Domain management
2. 点击 "Change site name"
3. 输入想要的名字（如 `chests-game`）
4. 域名变为 `chests-game.netlify.app`

### 使用自定义域名

1. 购买域名（如 `yourgame.com`）
2. 在Netlify：Site settings → Domain management → Add custom domain
3. 添加你的域名
4. 在域名提供商处添加DNS记录：
   - CNAME: `www` → `your-site-name.netlify.app`
   - A记录: `@` → Netlify的IP（或使用Netlify DNS）

## 📊 性能优化建议

Netlify已自动启用：
- ✅ 全球CDN加速
- ✅ HTTPS证书
- ✅ Gzip压缩
- ✅ 自动缓存

额外优化：
- 启用 "Asset Optimization" (Site settings → Build & deploy → Post processing)
- 启用 "Pretty URLs" 

## 🔄 持续部署

### 自动部署设置

**Git方式部署的自动功能：**
- ✅ 推送到main → 自动部署生产环境
- ✅ Pull Request → 自动生成预览URL
- ✅ 构建失败 → 邮件通知

### 手动部署

```bash
# 部署到生产环境
npm run deploy

# 部署预览版本
npm run deploy:preview
```

## 🐛 常见问题

### 问题1：构建失败
**原因：** 依赖安装失败或TypeScript错误

**解决：**
```bash
# 本地测试构建
npm run build

# 检查错误信息
npm run lint
```

### 问题2：404错误
**原因：** SPA路由未配置

**解决：** 确认 `netlify.toml` 包含重定向规则（已配置）

### 问题3：白屏
**原因：** 资源路径错误

**解决：** 检查 `vite.config.ts` 的 `base` 配置（使用默认即可）

### 问题4：部署后样式丢失
**原因：** CSS未正确打包

**解决：**
```bash
# 本地预览生产版本
npm run preview

# 检查dist目录是否包含CSS文件
```

## 🎮 推荐工作流

### 开发流程

```bash
# 1. 开发
npm run dev

# 2. 测试
npm run lint
npm run build
npm run preview

# 3. 提交
git add .
git commit -m "Feature: add something"
git push

# 4. 自动部署（如果连接了Git）
# 或手动部署
npm run deploy
```

### 团队协作

- 使用分支管理功能
- PR预览自动生成
- 设置通知webhook
- 查看部署日志

## 📈 监控和分析

### Netlify Analytics

在Site settings启用：
- 页面浏览量
- 访问来源
- 性能指标

### 查看部署日志

在Netlify Dashboard：
- Deploys → 选择部署
- 查看构建日志
- 查看部署时间

## 🔐 环境变量（如果需要）

如果项目需要API密钥等：

1. 创建 `.env.production`（不要提交到Git）
2. 在Netlify: Site settings → Environment variables
3. 添加变量（如 `VITE_API_KEY`）

## 📱 测试移动端

Netlify提供移动预览：
- 使用手机访问你的URL
- 或使用浏览器开发者工具

## 🎉 完成部署

恭喜！你的游戏现在已经在线了！

分享链接：`https://your-site-name.netlify.app`

---

**需要帮助？**
- [Netlify文档](https://docs.netlify.com/)
- [Vite部署指南](https://vitejs.dev/guide/static-deploy.html)

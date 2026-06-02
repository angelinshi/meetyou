# 同步到 GitHub 使用指南

每次你说 **"同步一下"**，我会把当前项目打包成带时间戳的 zip 文件供你下载。
你在本地运行一次 `sync.sh` 即可推送到 GitHub，**不会覆盖之前任何一次同步**。

---

## 一次性准备（只做一次）

### 1. Clone 仓库到本地

```bash
git clone https://github.com/angelinshi/meetyou.git
cd meetyou
```

### 2. 给脚本可执行权限

下载本项目中的 `sync.sh` 到 `meetyou` 文件夹下，然后：

```bash
chmod +x sync.sh
```

### 3. 确保 git 能推送

如果你还没配置 GitHub 认证：
- HTTPS：会提示输入 Personal Access Token
- SSH：先配好 SSH key

---

## 每次同步的流程

1. 在对话里说 **"同步一下"** → 我会生成一个 `meetyou_YYYY-MM-DD_HHMM.zip` 下载卡片
2. 下载该 zip 到本地（建议放 `~/Downloads/`）
3. 在 `meetyou` 仓库目录下运行：

   ```bash
   ./sync.sh ~/Downloads/meetyou_2026-05-28_1430.zip
   ```

4. 脚本会自动：
   - 创建 `syncs/2026-05-28_1430/` 子文件夹
   - 解压项目进去
   - `git add` + `git commit` + `git push`

5. 完成后访问：
   `https://github.com/angelinshi/meetyou/tree/main/syncs/2026-05-28_1430`

---

## 仓库结构

```
meetyou/
├── .github/workflows/verify-sync.yml   ← CI 校验，防止误覆盖历史
├── sync.sh                              ← 同步脚本
├── SYNC_GUIDE.md                        ← 本文件
└── syncs/
    ├── 2026-05-28_1430/                 ← 第 1 次同步（不可修改）
    │   ├── 男友版经期陪伴模式.html
    │   ├── design-canvas.jsx
    │   └── ...
    ├── 2026-05-28_1612/                 ← 第 2 次同步
    │   └── ...
    └── 2026-05-29_0945/                 ← 第 3 次同步
        └── ...
```

每个 `syncs/<时间戳>/` 文件夹都是当时项目的完整快照，互不影响。

---

## CI 保护

`.github/workflows/verify-sync.yml` 会在每次 push / PR 时：
- ✅ 校验文件夹命名格式（`YYYY-MM-DD_HHMM`）
- ✅ 校验**历史 sync 文件夹未被修改**（PR 模式）

如果有人不小心动了老的 sync，CI 会失败，保护历史快照不被破坏。

---

## Windows 用户

`sync.sh` 是 bash 脚本，建议在 **Git Bash** 或 **WSL** 里运行。
PowerShell 版本可后续补充，告诉我即可。

#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# sync.sh — push Meetyou project files to GitHub (normal git push)
#
# Usage:
#   ./sync.sh <path-to-project-zip-or-folder> [/path/to/local/meetyou-clone]
#
# Examples:
#   ./sync.sh ~/Downloads/Meetyou.zip
#   ./sync.sh ~/Downloads/Meetyou.zip ~/Desktop/github/meetyou
#
# Behavior:
#   1. Extracts the zip (skipping _snapshot / uploads / screenshots)
#   2. Copies files into the repo root (overwrites changed files)
#   3. git add -A → git commit → git push origin main
# ─────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── args ─────────────────────────────────────────────────────────────
SOURCE="${1:-}"
REPO_DIR="${2:-$(pwd)}"

if [ -z "$SOURCE" ]; then
  echo "❌ Missing source. Pass a project .zip or folder as the 1st arg."
  echo ""
  echo "Usage: ./sync.sh <project-zip-or-folder> [meetyou-repo-dir]"
  exit 1
fi

if [ ! -e "$SOURCE" ]; then
  echo "❌ Source does not exist: $SOURCE"
  exit 1
fi

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "❌ Not a git repo: $REPO_DIR"
  echo "   First time? Clone the repo:"
  echo "     git clone https://github.com/angelinshi/meetyou.git"
  echo "   Then re-run with the clone path as the 2nd arg."
  exit 1
fi

TIMESTAMP=$(date +%Y-%m-%d_%H%M)
TMP_DIR=$(mktemp -d)

echo "📦 Source:  $SOURCE"
echo "🔧 Repo:    $REPO_DIR"
echo ""

# ── extract ──────────────────────────────────────────────────────────
if [ -d "$SOURCE" ]; then
  cp -R "$SOURCE"/. "$TMP_DIR"/
  echo "✅ Copied folder"
elif [[ "$SOURCE" == *.zip ]]; then
  python3 - "$SOURCE" "$TMP_DIR" <<'PYEOF'
import zipfile, os, sys, shutil

src = sys.argv[1]
dst = sys.argv[2]
skip_prefixes = ('_snapshot/', 'uploads/', 'screenshots/', '__MACOSX/')

with zipfile.ZipFile(src, 'r') as z:
    for info in z.infolist():
        name = info.filename
        if any(('/' + p) in ('/' + name) for p in skip_prefixes):
            continue
        if info.is_dir():
            continue
        z.extract(info, dst)

# Flatten if all files sit under one top-level directory
entries = [e for e in os.listdir(dst) if not e.startswith('.')]
if len(entries) == 1 and os.path.isdir(os.path.join(dst, entries[0])):
    inner = os.path.join(dst, entries[0])
    for item in os.listdir(inner):
        shutil.move(os.path.join(inner, item), os.path.join(dst, item))
    os.rmdir(inner)
PYEOF
  echo "✅ Extracted zip (skipped _snapshot / uploads / screenshots)"
else
  echo "❌ Source must be a .zip file or a folder"
  rm -rf "$TMP_DIR"
  exit 1
fi

# ── copy into repo root ───────────────────────────────────────────────
# Use rsync to overwrite changed files; preserve .git
rsync -a --delete \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='sync.sh' \
  "$TMP_DIR/" "$REPO_DIR/"

rm -rf "$TMP_DIR"
echo "✅ Files copied to repo"

# ── commit & push ─────────────────────────────────────────────────────
cd "$REPO_DIR"

git add -A

git commit --allow-empty -m "sync: $TIMESTAMP" --quiet

echo ""
echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "✅ Done! View at:"
echo "   https://github.com/angelinshi/meetyou"

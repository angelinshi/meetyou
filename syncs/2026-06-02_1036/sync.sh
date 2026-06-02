#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# sync.sh — push a Meetyou project snapshot into the GitHub repo,
#           under a timestamped folder so previous syncs are never
#           overwritten.
#
# Usage:
#   ./sync.sh <path-to-project-zip-or-folder> [/path/to/local/meetyou-clone]
#
# Examples:
#   ./sync.sh ~/Downloads/meetyou-project.zip
#   ./sync.sh ~/Downloads/meetyou-project.zip ~/code/meetyou
#   ./sync.sh ./my-project-folder ~/code/meetyou
#
# Behavior:
#   1. Generates a timestamp like 2026-05-28_1430
#   2. Creates syncs/<timestamp>/ inside your local meetyou clone
#   3. Copies/extracts the project into that folder
#   4. Commits with message "Sync: <timestamp>"
#   5. Pushes to origin/main
#
# Old syncs are NEVER touched — each sync is its own immutable folder.
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

# ── prep ─────────────────────────────────────────────────────────────
TIMESTAMP=$(date +%Y-%m-%d_%H%M)
SYNC_DIR="$REPO_DIR/syncs/$TIMESTAMP"

if [ -e "$SYNC_DIR" ]; then
  echo "❌ Sync folder already exists: $SYNC_DIR"
  echo "   (Rare — wait a minute and try again so the timestamp changes.)"
  exit 1
fi

echo "📦 Source:      $SOURCE"
echo "📂 Destination: syncs/$TIMESTAMP/"
echo "🔧 Repo:        $REPO_DIR"
echo ""

mkdir -p "$SYNC_DIR"

# ── copy / extract ───────────────────────────────────────────────────
if [ -d "$SOURCE" ]; then
  # Copy folder contents (not the folder itself)
  cp -R "$SOURCE"/. "$SYNC_DIR"/
  echo "✅ Copied folder contents"
elif [[ "$SOURCE" == *.zip ]]; then
  unzip -q "$SOURCE" -d "$SYNC_DIR"
  # Flatten if the zip contains a single top-level folder
  inner=$(ls -1 "$SYNC_DIR")
  if [ "$(echo "$inner" | wc -l)" -eq 1 ] && [ -d "$SYNC_DIR/$inner" ]; then
    mv "$SYNC_DIR/$inner"/* "$SYNC_DIR/" 2>/dev/null || true
    mv "$SYNC_DIR/$inner"/.[!.]* "$SYNC_DIR/" 2>/dev/null || true
    rmdir "$SYNC_DIR/$inner"
  fi
  echo "✅ Extracted zip"
else
  echo "❌ Source must be a .zip file or a folder"
  rm -rf "$SYNC_DIR"
  exit 1
fi

# ── commit & push ────────────────────────────────────────────────────
cd "$REPO_DIR"

git add "syncs/$TIMESTAMP"

if git diff --cached --quiet; then
  echo "⚠️  No changes to commit (project is empty?)"
  rmdir "$SYNC_DIR" 2>/dev/null || true
  exit 0
fi

git commit -m "Sync: $TIMESTAMP" --quiet

echo ""
echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "✅ Synced! View at:"
echo "   https://github.com/angelinshi/meetyou/tree/main/syncs/$TIMESTAMP"

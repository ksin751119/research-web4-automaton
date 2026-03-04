# Design: Agent 端到端流程範例 Slide

**Date:** 2026-03-04
**Status:** Approved

## Goal

在簡報 `index.html` 中新增一頁 Slide，用「部署個人網站」的具體情境展示 Agent 的端到端工作流程，讓觀眾理解 Automaton 在實際運作時資料如何在 Local Agent / Conway Cloud / Blockchain 三方之間流動。

## Position

插入在 Slide 4（ReAct 循環）之後，成為新的 Slide 5。原 Slide 5-12 編號各 +1，總共 13 頁。

## Layout

### Header
- `tag`: 「實戰」
- `h2`: 「端到端範例 — 部署個人網站」

### Main Content: Vertical Timeline with 3-Column Data Flow

三個欄位頂部各有一個 `diagram-node`（與 Slide 3 風格一致）：
- Local Agent（藍色/default）
- Conway Cloud（青色/node-cyan）
- Blockchain（橘色/node-warm）

### 5 Steps

**Step 1: 接收任務 + LLM 推理**
- Local Agent: Genesis「架一個個人網站」→ 組 context
- → HTTP POST /inference → Conway Cloud: LLM 推理
- ← 回應：規劃 3 步（建站、註冊域名、開放端口）

**Step 2: 建立網站**
- Local Agent: LLM 決定 `exec("npx create-next-app")`，Policy Engine ✓
- → HTTP POST /sandbox/exec → Conway Cloud: Sandbox VM 執行
- ← stdout: "Success! Created my-site"

**Step 3: 註冊域名 + 付費**
- Local Agent: `register_domain("bob.conway.tech")`
- → HTTP POST /domains → Conway Cloud: 扣 Credits
- Conway Cloud → Blockchain: USDC 結算

**Step 4: 開放端口**
- Local Agent: `expose_port(3000)`
- → HTTP POST /sandbox/port → Conway Cloud: 配置反向代理
- ← URL: bob.conway.tech ✓

**Step 5: 持久化 + 回報**
- Local Agent: 寫入 turns 表格、更新 memory、更新 SOUL.md
- 回到 Step 1（循環）

### Footer
- `insight-box`: 「5 個 turn · 涵蓋推理、執行、付費三大核心」

## Visual Style

- 垂直時間軸 + 三欄 CSS Grid（左: Local Agent, 中: Conway Cloud, 右: Blockchain）
- 步驟之間用帶箭頭的虛線連接，標註 HTTP 方法/路徑
- `anim-fade` + `transition-delay` 依序出現動畫
- `glass-card` 風格步驟編號
- 沿用 Blueprint Studio 主題配色

## Required Changes

1. **HTML**: 在 Slide 4 `</section>` 之後插入新的 `<section>`
2. **CSS**: 新增垂直時間軸 + 三欄 grid 樣式
3. **JS**: 更新 slide counter `/ 12` → `/ 13`
4. **HTML**: 更新後續 slide 的 `slide-num-watermark` 編號

## Data Sources

- `docs/Conway Automaton — 學習筆記.md` (資料流圖)
- `reference/automaton/ARCHITECTURE.md` (Agent Loop, Tool System)
- `reference/automaton/README.md` (How It Works)

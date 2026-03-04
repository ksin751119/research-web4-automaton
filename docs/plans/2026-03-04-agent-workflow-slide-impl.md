# Agent Workflow Example Slide — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new Slide 5 to `index.html` that shows a concrete end-to-end example of an Agent deploying a personal website, with a 3-column data flow diagram (Local Agent / Conway Cloud / Blockchain).

**Architecture:** Single-file changes to `index.html` — add CSS for the 3-column timeline layout, insert new slide HTML after Slide 4, update slide counter from 12 to 13, and renumber all subsequent slide watermarks.

**Tech Stack:** HTML, CSS (existing Blueprint Studio theme variables), vanilla JS (existing IntersectionObserver system)

---

### Task 1: Add CSS for 3-Column Data Flow Timeline

**Files:**
- Modify: `index.html` — insert new CSS rules inside `<style>` block, after the `.seq-step .step-num` rule (around line 1381)

**Step 1: Add CSS rules**

Insert the following CSS immediately after the `.seq-step .step-num { ... }` block (after line 1381) and before the `/* Law cards */` comment:

```css
        /* ===========================================
           DATA FLOW TIMELINE (Slide 5)
           =========================================== */
        .dataflow-header {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: clamp(0.5rem, 1vw, 1rem);
            margin-bottom: clamp(0.4rem, 0.8vh, 0.6rem);
        }

        .dataflow-header .diagram-node {
            min-width: 0;
            padding: clamp(0.4rem, 0.8vw, 0.7rem) clamp(0.5rem, 1vw, 0.8rem);
        }

        .dataflow-header .diagram-node .icon {
            font-size: clamp(1.2rem, 2vw, 1.8rem);
            margin-bottom: 0.15em;
        }

        .dataflow-steps {
            display: flex;
            flex-direction: column;
            gap: clamp(0.2rem, 0.4vh, 0.3rem);
        }

        .df-step {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: clamp(0.5rem, 1vw, 1rem);
            align-items: center;
            min-height: clamp(2rem, 4vh, 3.5rem);
        }

        .df-cell {
            font-size: var(--small-size);
            color: var(--text-secondary);
            padding: clamp(0.2rem, 0.4vh, 0.35rem) clamp(0.4rem, 0.8vw, 0.6rem);
            border-radius: 6px;
            line-height: 1.35;
        }

        .df-cell.active {
            background: rgba(56, 152, 255, 0.06);
            border: 1.5px solid rgba(56, 152, 255, 0.2);
        }

        .df-cell.active-cyan {
            background: rgba(0, 212, 255, 0.06);
            border: 1.5px solid rgba(0, 212, 255, 0.2);
        }

        .df-cell.active-warm {
            background: rgba(255, 138, 61, 0.06);
            border: 1.5px solid rgba(255, 138, 61, 0.2);
        }

        .df-cell .df-label {
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: clamp(0.6rem, 0.85vw, 0.75rem);
            color: var(--accent);
            display: block;
            margin-bottom: 0.1em;
        }

        .df-cell.active-cyan .df-label {
            color: var(--accent-cyan);
        }

        .df-cell.active-warm .df-label {
            color: var(--accent-warm);
        }

        .df-arrow {
            font-family: var(--font-mono);
            font-size: clamp(0.6rem, 0.8vw, 0.7rem);
            color: var(--text-dim);
            text-align: center;
            padding: clamp(0.15rem, 0.3vh, 0.25rem) 0;
        }

        .df-step-num {
            font-family: var(--font-mono);
            font-weight: 800;
            font-size: clamp(0.65rem, 0.9vw, 0.8rem);
            color: var(--accent);
            background: rgba(56, 152, 255, 0.1);
            border: 1px solid rgba(56, 152, 255, 0.25);
            border-radius: 4px;
            padding: 0.05em 0.4em;
            margin-right: 0.3em;
            display: inline-block;
        }

        .df-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(56, 152, 255, 0.15), transparent);
            margin: clamp(0.1rem, 0.2vh, 0.15rem) 0;
        }

        @media (max-width: 768px) {
            .dataflow-header { grid-template-columns: 1fr; gap: var(--element-gap); }
            .df-step { grid-template-columns: 1fr; }
            .df-cell:empty { display: none; }
        }
```

**Step 2: Verify the file is saved correctly**

Run: Open `index.html` in browser or check with `grep "dataflow-header" index.html`
Expected: CSS rules are present

**Step 3: Commit**

```bash
git add index.html
git commit -m "style: add CSS for 3-column data flow timeline layout"
```

---

### Task 2: Insert New Slide 5 HTML

**Files:**
- Modify: `index.html` — insert new `<section>` after line 2137 (end of Slide 4's `</section>`)

**Step 1: Insert the new slide HTML**

Insert the following HTML immediately after the `</section>` that ends Slide 4 (after line 2137, before the `<!-- SLIDE 05 -->` comment):

```html
<!-- =========================================
     SLIDE 05 — End-to-End Example: Deploy Website
     ========================================= -->
<section class="slide" id="slide-5" data-slide="5">
    <div class="corner-mark tl"></div><div class="corner-mark tr"></div>
    <div class="corner-mark bl"></div><div class="corner-mark br"></div>
    <div class="slide-inner">
        <div class="tag anim-fade mb-sm" contenteditable="false">實戰</div>
        <h2 class="anim-fade" contenteditable="false">端到端範例 — <span class="accent">部署個人網站</span></h2>

        <!-- 3-Column Header: Local Agent / Conway Cloud / Blockchain -->
        <div class="dataflow-header anim-scale" style="transition-delay: 0.12s;">
            <div class="diagram-node" style="min-width: 0;">
                <div class="icon" style="font-size: clamp(1.2rem, 2vw, 1.8rem);">&#x1F5A5;</div>
                <div class="node-title" contenteditable="false">Local Agent</div>
            </div>
            <div class="diagram-node node-cyan" style="min-width: 0;">
                <div class="icon" style="font-size: clamp(1.2rem, 2vw, 1.8rem);">&#x2601;</div>
                <div class="node-title" contenteditable="false">Conway Cloud</div>
            </div>
            <div class="diagram-node node-warm" style="min-width: 0;">
                <div class="icon" style="font-size: clamp(1.2rem, 2vw, 1.8rem);">&#x26D3;</div>
                <div class="node-title" contenteditable="false">Blockchain</div>
            </div>
        </div>

        <!-- Data Flow Steps -->
        <div class="dataflow-steps anim-fade" style="transition-delay: 0.22s;">

            <!-- Step 1: Receive Task + LLM Reasoning -->
            <div class="df-step">
                <div class="df-cell active">
                    <span class="df-step-num">01</span>
                    <span contenteditable="false">Genesis:「架一個個人網站」</span><br>
                    <span style="color: var(--text-dim);" contenteditable="false">組 context（身份+credits+工具）</span>
                </div>
                <div class="df-cell"></div>
                <div class="df-cell"></div>
            </div>
            <div class="df-arrow">──── POST /inference ────▶</div>
            <div class="df-step">
                <div class="df-cell"></div>
                <div class="df-cell active-cyan">
                    <span class="df-label">LLM 推理</span>
                    <span contenteditable="false">規劃 3 步：建站、域名、開放端口</span>
                </div>
                <div class="df-cell"></div>
            </div>

            <div class="df-divider"></div>

            <!-- Step 2: Build Website -->
            <div class="df-step">
                <div class="df-cell active">
                    <span class="df-step-num">02</span>
                    <span style="font-family: var(--font-mono);" contenteditable="false">exec("npx create-next-app")</span><br>
                    <span style="color: var(--text-dim);" contenteditable="false">Policy Engine ✓</span>
                </div>
                <div class="df-cell"></div>
                <div class="df-cell"></div>
            </div>
            <div class="df-arrow">──── POST /sandbox/exec ────▶</div>
            <div class="df-step">
                <div class="df-cell"></div>
                <div class="df-cell active-cyan">
                    <span class="df-label">Sandbox VM</span>
                    <span contenteditable="false">stdout: "Created my-site"</span>
                </div>
                <div class="df-cell"></div>
            </div>

            <div class="df-divider"></div>

            <!-- Step 3: Register Domain + Pay -->
            <div class="df-step">
                <div class="df-cell active">
                    <span class="df-step-num">03</span>
                    <span style="font-family: var(--font-mono);" contenteditable="false">register_domain("bob.conway.tech")</span>
                </div>
                <div class="df-cell active-cyan">
                    <span class="df-label">扣 Credits</span>
                    <span contenteditable="false">域名費 → x402</span>
                </div>
                <div class="df-cell active-warm">
                    <span class="df-label">USDC 結算</span>
                    <span contenteditable="false">Base 鏈上確認</span>
                </div>
            </div>

            <div class="df-divider"></div>

            <!-- Step 4: Expose Port -->
            <div class="df-step">
                <div class="df-cell active">
                    <span class="df-step-num">04</span>
                    <span style="font-family: var(--font-mono);" contenteditable="false">expose_port(3000)</span>
                </div>
                <div class="df-cell active-cyan">
                    <span class="df-label">反向代理</span>
                    <span contenteditable="false">bob.conway.tech ✓</span>
                </div>
                <div class="df-cell"></div>
            </div>

            <div class="df-divider"></div>

            <!-- Step 5: Persist + Report -->
            <div class="df-step">
                <div class="df-cell active">
                    <span class="df-step-num">05</span>
                    <span contenteditable="false">寫入 turns 表 · 更新 memory</span><br>
                    <span style="color: var(--text-dim);" contenteditable="false">SOUL.md:「已部署第一個網站」</span>
                </div>
                <div class="df-cell"></div>
                <div class="df-cell"></div>
            </div>
        </div>

        <!-- Summary insight -->
        <div class="insight-box anim-fade mt-sm" style="transition-delay: 0.35s;">
            <p style="font-size: var(--body-size);" contenteditable="false">
                <strong class="highlight">5 個 Turn</strong> — 涵蓋<strong>推理</strong>、<strong>執行</strong>、<strong class="warm">付費</strong>三大核心。完成後回到 ReAct 循環等待下一個任務。
            </p>
        </div>
    </div>
    <div class="slide-num-watermark">05</div>
</section>
```

**Step 2: Verify slide renders in browser**

Run: Open `index.html` in browser, navigate to slide 5
Expected: New slide shows 3-column header + 5-step data flow + insight box

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add slide 5 — end-to-end agent workflow example"
```

---

### Task 3: Renumber Subsequent Slides (5→6 through 12→13)

**Files:**
- Modify: `index.html` — update `id`, `data-slide`, and `slide-num-watermark` for old slides 5-12

**Step 1: Update old Slide 5 (now 6)**

Change `id="slide-5"` to `id="slide-6"`, `data-slide="5"` to `data-slide="6"`, watermark `05` to `06`.

**Step 2: Update old Slide 6 (now 7)**

Change `id="slide-6"` to `id="slide-7"`, `data-slide="6"` to `data-slide="7"`, watermark `06` to `07`.

**Step 3: Update old Slide 7 (now 8)**

Change `id="slide-7"` to `id="slide-8"`, `data-slide="7"` to `data-slide="8"`, watermark `07` to `08`.

**Step 4: Update old Slide 8 (now 9)**

Change `id="slide-8"` to `id="slide-9"`, `data-slide="8"` to `data-slide="9"`, watermark `08` to `09`.

**Step 5: Update old Slide 9 (now 10)**

Change `id="slide-9"` to `id="slide-10"`, `data-slide="9"` to `data-slide="10"`, watermark `09` to `10`.

**Step 6: Update old Slide 10 (now 11)**

Change `id="slide-10"` to `id="slide-11"`, `data-slide="10"` to `data-slide="11"`, watermark `10` to `11`.

**Step 7: Update old Slide 11 (now 12)**

Change `id="slide-11"` to `id="slide-12"`, `data-slide="11"` to `data-slide="12"`, watermark `11` to `12`.

**Step 8: Update old Slide 12 (now 13)**

Change `id="slide-12"` to `id="slide-13"`, `data-slide="12"` to `data-slide="13"`, watermark `12` to `13`.

**IMPORTANT:** Renumber from the LAST slide backwards (12→13, 11→12, ..., 5→6) to avoid ID collisions during editing.

**Step 9: Commit**

```bash
git add index.html
git commit -m "refactor: renumber slides 5-12 to 6-13 after new slide insertion"
```

---

### Task 4: Update Slide Counter + JS References

**Files:**
- Modify: `index.html` — update slide counter text and any JS references to specific slide numbers

**Step 1: Update the slide counter display**

Change the slide counter HTML (line ~1888):
- Old: `<span id="current-slide">01</span> / 12`
- New: `<span id="current-slide">01</span> / 13`

**Step 2: Update JS references to specific slide IDs**

Search for all JS references to `slide-9`, `slide-8`, `slide-5`, `slide-7` in the `<script>` section and update them:

- `document.querySelector('#slide-9 .json-preview')` → `#slide-10 .json-preview` (typewriter effect was on old slide 9)
- `document.getElementById('slide-9')` → `document.getElementById('slide-10')` (typewriter observer)
- `document.getElementById('slide-8')` → `document.getElementById('slide-9')` (glitch observer)
- `document.getElementById('slide-5')` → `document.getElementById('slide-6')` (counter observer)
- `document.getElementById('slide-7')` → `document.getElementById('slide-8')` (counter observer)

**Step 3: Update JS slideColors mapping**

In the JS section, update the `slideColors` object that maps slide numbers to color variants. Since all slides shifted by 1:
- `n === 8 || n === 10` → `n === 9 || n === 11` (warm colors)
- `n === 9 || n === 11` → `n === 10 || n === 12` (cyan colors)

**Step 4: Verify in browser**

Run: Open `index.html` in browser
Expected: Counter shows "/ 13", all animations work on correct slides, navigation dots work for all 13 slides

**Step 5: Commit**

```bash
git add index.html
git commit -m "fix: update slide counter to 13 and fix JS slide references"
```

---

### Task 5: Final Verification

**Step 1: Verify all 13 slides render correctly**

Open `index.html` in browser and navigate through ALL 13 slides:
1. Slide 1: Title — WEB4:Automaton
2. Slide 2: Web4 概念
3. Slide 3: 三大核心元件
4. Slide 4: Agent Loop — ReAct 循環
5. **Slide 5: 端到端範例 — 部署個人網站** (NEW)
6. Slide 6: 77 個工具 · 11 類別
7. Slide 7: Policy Engine — 6 層守門
8. Slide 8: 生存層級
9. Slide 9: x402 支付 · 死亡流程
10. Slide 10: Agent 社交
11. Slide 11: Agent 三法則
12. Slide 12: 7 層安全
13. Slide 13: Q&A

**Step 2: Verify specific features**

- [ ] New slide 5 shows 3-column header with colored nodes
- [ ] 5 data flow steps are visible with correct alignment
- [ ] Animations trigger on scroll (anim-fade, anim-scale)
- [ ] Insight box renders at bottom
- [ ] Slide counter shows "/ 13"
- [ ] Navigation dots have 13 dots
- [ ] Slide 6 counter animation still works (was slide 5)
- [ ] Slide 8 counter animation still works (was slide 7)
- [ ] Slide 9 glitch effect still works (was slide 8)
- [ ] Slide 10 typewriter effect still works (was slide 9)
- [ ] Watermark numbers are sequential 01-13

**Step 3: Final commit (if any fixes needed)**

```bash
git add index.html
git commit -m "fix: final adjustments for slide 5 integration"
```

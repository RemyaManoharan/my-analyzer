# Trustpilot Help Center Analyzer

A static, no-build-step tool that maps the Trustpilot Help Center's navigation
tree (`Home → Audience → Topic → Sub-topic → Article`) and lets you search
for an article by keyword to see the exact click-path to reach it.

## Files
- `data.js` - the entire tree, as a plain JS object (`TREE_DATA`). This is the
  only file that needs editing when adding more content.
- `index.html` - page shell, loads `data.js` then `app.js`.
- `app.js` - all rendering/search/toggle logic (~260 lines, no dependencies).
- `style.css` - styling for both view modes.

Open `index.html` directly in a browser (or via the Claude Code preview
panel) - no server or build step required.

## Data model (`data.js`)
Each node:
```js
{ id, label, type, keywords?, children? }
```
- `type`: `"home" | "audience" | "topic" | "subtopic" | "article" | "featured" | "quicklink"`
  - `"featured"` = the "Featured (landing page quick links)" section that sits above
    the real topic list on each audience page. It is NOT a topic.
  - `"quicklink"` = the card links inside a featured section (e.g. "New to Trustpilot",
    "New Shopify app"). They are NOT subtopics, even though they can have article children.
- `keywords`: optional array of extra search terms (synonyms not in the label
  itself, e.g. `"password"` article also tagged with `"forgot password"`)
- `children`: array of child nodes. Topics can mix subtopics and direct
  articles as siblings (some Trustpilot topics skip the subtopic layer
  entirely, e.g. "Create your profile").
- Node ids are prefixed `rev-` (Reviewer side) or `biz-` (Business side) and
  must stay globally unique.

**Click count** = depth of the node from Home (an edge = one click). This is
computed automatically in `app.js`, not stored in the data.

## How data gets filled in
The user sends screenshots of Trustpilot Help Center pages (topic cards,
subtopic pages, article lists). Each screenshot gets transcribed into the
matching branch of `data.js`. Two recurring patterns observed on the real
site, used to infer structure from card *previews* before the full page is
seen:
- A topic-card preview with an **"ARTICLES" eyebrow label** above its links
  means those links are articles directly under the topic (no subtopic
  layer).
- A topic-card preview **without** that label means the links are subtopics
  (each needs its own follow-up screenshot to get the actual articles
  inside).
- "No content available" shown in a topic-card preview is **not reliable** -
  Privacy showed this but turned out to have 4 real articles once visited
  directly. Treat it as "unknown," not "empty," until confirmed.
- A *full* topic page (not a card preview) is unambiguous: it has a
  **"Subtopics"** section of cards and/or an **"Articles"** section of
  arrow-links. A page with both means mixed siblings, e.g. the Integrations
  page shows 5 subtopic cards plus 1 direct article.

After every data.js edit, validate it hasn't broken (run from `my-analyzer/`):
```
node --check data.js
```

## Features built
1. **List view** - indented collapsible tree (default view).
2. **Diagram view** - CSS-only box/connector org chart, toggle button next
   to search. Same collapse state is shared between both views. Each node
   type gets its own outline + background tint so depth reads at a glance.
   Note: badge styling is deliberately on a bare `.badge` selector, not
   `.node .badge` - the diagram uses `.node-box`, so scoping it to `.node`
   silently drops the white text and makes dark badges unreadable.
3. **Search box** - matches against `label` + `keywords` (case-insensitive
   substring). All matching nodes get highlighted (`is-match`), every
   ancestor down to Home gets highlighted too (`on-path`), everything else
   dims (`dimmed`). Matches auto-expand their own branch; nodes outside any
   match/path stay collapsed.
4. **Default collapse state** - only Home + the two audience nodes start
   expanded; everything from topic level down starts collapsed, so the tree
   is readable before you search. "Expand all" / "Collapse all" buttons
   override this.
5. **Stats bar** - topic/subtopic/article counts, avg clicks/article, deepest
   article (click count), recomputed from `data.js` on load.

## Current totals
22 topics, 48 subtopics, 188 articles. Avg 3.82 clicks/article, deepest
article 4 clicks. (Recount with the snippet at the bottom after any edit -
these numbers go stale.)

## Status - Reviewer side ("For Reviewers")
Fully mapped, all 9 topics done including the "Featured" quick-links section
at the top of the page (distinct from "Browse by topic" below it):
Featured, Announcements*, About Trustpilot, Create your profile, Navigating
Trustpilot, Your Trustpilot account, Writing Reviews, Flagging, Privacy.

\* **Announcements** still has `children: []` - its "Browse by topic" preview
said "No content available," same as Privacy did before Privacy turned out
to have 4 real articles. Needs a screenshot of the actual Announcements page
to confirm one way or the other.

## Status - Business side ("For Businesses")
10 topics total (confirmed by user), all 10 now mapped: Featured (partial,
see below), Getting started with Trustpilot Business, How Trustpilot works,
Account management, Get reviews, Automatic Feedback Service, Manage Reviews,
Analytics, Share & Promote, TrustBox Widgets, Integrations.

Three of these mix subtopics with a direct article sibling - Analytics
("Custom dashboards"), TrustBox Widgets ("What is a TrustBox widget?") and
Integrations ("Trustpilot's integration overview").

**Still pending (empty `children: []` in data.js right now):**
- `biz-new-shopify-app` / `biz-new-releases` (Featured section) - each
  confirmed to contain exactly 1 article, title not yet given. These are the
  only outstanding items on the Business side.
- **Subscription Management** subtopic (under Account management) - confirmed
  empty on purpose, not pending.

## Next steps
Only three empty nodes are left tree-wide: `biz-new-shopify-app`,
`biz-new-releases`, and Reviewer-side `Announcements`. Once those three are
filled (or Announcements is confirmed genuinely empty), the whole Help Center
is mapped.

For any further screenshots, continue the same pattern: transcribe each into
the right branch of `data.js`, run `node --check data.js`, report updated
totals from the stats-counting snippet below, and call out anything ambiguous
(mixed subtopic/article siblings, missing eyebrow labels, cut-off messages)
instead of guessing silently.

Conventions worth keeping when adding articles:
- Keep the article order shown on the page (the Help Center lists them
  alphabetically, which puts e.g. all the `Trustpilot Analytics: ...` titles
  together).
- Long repetitive titles get short `keywords` for the distinctive part, so
  the search box is usable - `"Trustpilot Analytics: Review Insights -
  TrustScore forecast"` is tagged `["trustscore forecast"]`.
- Reproduce punctuation exactly as shown, including en-dashes
  (`Trustpilot Business and AI – FAQ`).

Quick way to recount totals after an edit:
```
node -e "
const fs = require('fs');
let src = fs.readFileSync('data.js', 'utf8').replace('const TREE_DATA', 'global.TREE_DATA');
eval(src);
let topics=0, subtopics=0, articles=0;
(function walk(n){ if(n.type==='topic')topics++; if(n.type==='subtopic')subtopics++; if(n.type==='article')articles++; (n.children||[]).forEach(walk); })(global.TREE_DATA);
console.log({topics, subtopics, articles});
"
```

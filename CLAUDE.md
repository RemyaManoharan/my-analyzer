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
- `type`: `"home" | "audience" | "topic" | "subtopic" | "article"`
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

After every data.js edit, validate it hasn't broken (run from `analyzer/`):
```
node --check data.js
```

## Features built
1. **List view** - indented collapsible tree (default view).
2. **Diagram view** - CSS-only box/connector org chart, toggle button next
   to search. Same collapse state is shared between both views.
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
10 topics total (confirmed by user). Done: Featured (partial, see below),
Getting started with Trustpilot Business, How Trustpilot works, Account
management, Get reviews, Automatic Feedback Service, Manage Reviews.

**Still pending (empty `children: []` in data.js right now):**
- `biz-new-shopify-app` / `biz-new-releases` (Featured section) - each
  confirmed to contain exactly 1 article, title not yet given.
- **Analytics** topic - 4 subtopics with no articles yet: Performance,
  Review insights, Engagement, Market.
- **TrustBox Widgets** - 2 subtopics with no articles yet: "How to add a
  widget", "Widget overview and FAQ". (The topic's 1 direct article, "What
  is a TrustBox widget?", is already in.)
- **Integrations** (10th topic, confirmed by user) - 5 subtopics with no
  articles yet: Ecommerce, Payment & CRM, Developer tools, Marketing,
  Customer support.
- **Subscription Management** subtopic (under Account management) - confirmed
  empty on purpose, not pending.

## Next steps
User will send screenshots for: Analytics and its 4 subtopics, then whatever
remains above (Share & Promote is done - only 1 article, no subtopics).
Continue the same pattern: transcribe each screenshot into the right branch
of `data.js`, run `node --check data.js`, report updated totals from the
stats-counting snippet below, and call out anything ambiguous (mixed
subtopic/article siblings, missing eyebrow labels, cut-off messages) instead
of guessing silently.

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

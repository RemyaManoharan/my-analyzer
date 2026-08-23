(function () {
  const treeEl = document.getElementById("tree");
  const searchEl = document.getElementById("search");
  const matchCountEl = document.getElementById("match-count");
  const expandAllBtn = document.getElementById("expand-all");
  const collapseAllBtn = document.getElementById("collapse-all");
  const statsEl = document.getElementById("stats");
  const viewListBtn = document.getElementById("view-list");
  const viewDiagramBtn = document.getElementById("view-diagram");

  const collapsed = new Set(); // node ids currently collapsed (shared across both views)
  let viewMode = "list"; // "list" | "diagram"

  // Default: only Home + the two audience nodes start expanded. Everything
  // from topic level down starts collapsed, so the tree/diagram is readable
  // until you search or manually expand a branch.
  function collapseByDefault(node, depth) {
    if (depth >= 2) collapsed.add(node.id);
    (node.children || []).forEach((c) => collapseByDefault(c, depth + 1));
  }

  function computeStats(root) {
    let topics = 0, subtopics = 0, articles = 0, maxClicks = 0, totalClicks = 0;
    (function walk(node, depth) {
      if (node.type === "topic") topics++;
      if (node.type === "subtopic") subtopics++;
      if (node.type === "article") {
        articles++;
        maxClicks = Math.max(maxClicks, depth);
        totalClicks += depth;
      }
      (node.children || []).forEach((c) => walk(c, depth + 1));
    })(root, 0);
    return {
      topics,
      subtopics,
      articles,
      maxClicks,
      avgClicks: articles ? (totalClicks / articles).toFixed(1) : 0,
    };
  }

  function renderStats(root) {
    const s = computeStats(root);
    statsEl.innerHTML = `
      <span><b>${s.topics}</b> topics</span>
      <span><b>${s.subtopics}</b> sub-topics</span>
      <span><b>${s.articles}</b> articles</span>
      <span>avg <b>${s.avgClicks}</b> clicks/article</span>
      <span>deepest <b>${s.maxClicks}</b> clicks</span>
    `;
  }

  function matchesTerm(node, term) {
    if (!term) return false;
    const hay = [node.label, ...(node.keywords || [])].join(" ").toLowerCase();
    return hay.includes(term);
  }

  // Returns Set of node ids that are matches, and Set of ids on the path to any match (ancestors + matches themselves)
  function findMatches(root, term) {
    const matchIds = new Set();
    const pathIds = new Set();

    function walk(node, ancestors) {
      const isMatch = matchesTerm(node, term);
      if (isMatch) {
        matchIds.add(node.id);
        ancestors.concat([node.id]).forEach((id) => pathIds.add(id));
      }
      (node.children || []).forEach((c) => walk(c, ancestors.concat([node.id])));
    }
    walk(root, []);
    return { matchIds, pathIds };
  }

  function highlightClass(node, searchState) {
    if (!searchState) return "";
    const { matchIds, pathIds } = searchState;
    if (matchIds.has(node.id)) return "is-match";
    if (pathIds.has(node.id)) return "on-path";
    return "dimmed";
  }

  function onToggle(node, hasChildren) {
    if (!hasChildren) return;
    if (collapsed.has(node.id)) collapsed.delete(node.id);
    else collapsed.add(node.id);
    render();
  }

  // ---------- List view (indented, collapsible) ----------
  function nodeLi(node, depth, searchState) {
    const li = document.createElement("li");
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsed.has(node.id);

    const row = document.createElement("div");
    row.className = "node " + highlightClass(node, searchState);

    const toggle = document.createElement("span");
    toggle.className = "toggle";
    toggle.textContent = hasChildren ? (isCollapsed ? "▶" : "▼") : "";
    row.appendChild(toggle);

    const badge = document.createElement("span");
    badge.className = "badge " + node.type;
    badge.textContent = node.type;
    row.appendChild(badge);

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = node.label;
    row.appendChild(label);

    const clicks = document.createElement("span");
    clicks.className = "clicks";
    clicks.textContent = depth === 0 ? "" : `${depth} click${depth === 1 ? "" : "s"}`;
    row.appendChild(clicks);

    row.addEventListener("click", (e) => {
      e.stopPropagation();
      onToggle(node, hasChildren);
    });

    li.appendChild(row);

    if (hasChildren) {
      const ul = document.createElement("ul");
      ul.className = "tree" + (isCollapsed ? " hidden-children" : "");
      node.children.forEach((child) => ul.appendChild(nodeLi(child, depth + 1, searchState)));
      li.appendChild(ul);
    }

    return li;
  }

  function renderListView(searchState) {
    const rootUl = document.createElement("ul");
    rootUl.className = "tree";
    rootUl.appendChild(nodeLi(TREE_DATA, 0, searchState));
    treeEl.appendChild(rootUl);
  }

  // ---------- Diagram view (box + connector org chart) ----------
  function diagramLi(node, depth, searchState) {
    const li = document.createElement("li");
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsed.has(node.id);

    const box = document.createElement("div");
    box.className = "node-box " + node.type + " " + highlightClass(node, searchState);

    const badge = document.createElement("span");
    badge.className = "badge " + node.type;
    badge.textContent = node.type;
    box.appendChild(badge);

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = node.label;
    box.appendChild(label);

    if (depth > 0) {
      const clicks = document.createElement("div");
      clicks.className = "clicks";
      clicks.textContent = `${depth} click${depth === 1 ? "" : "s"}`;
      box.appendChild(clicks);
    }

    if (hasChildren) {
      const expandHint = document.createElement("div");
      expandHint.className = "expand-hint";
      expandHint.textContent = isCollapsed ? `▶ ${node.children.length}` : "▼";
      box.appendChild(expandHint);
    }

    box.addEventListener("click", (e) => {
      e.stopPropagation();
      onToggle(node, hasChildren);
    });

    li.appendChild(box);

    if (hasChildren && !isCollapsed) {
      const ul = document.createElement("ul");
      node.children.forEach((child) => ul.appendChild(diagramLi(child, depth + 1, searchState)));
      li.appendChild(ul);
    }

    return li;
  }

  function renderDiagramView(searchState) {
    const wrap = document.createElement("div");
    wrap.className = "org-tree-wrap";
    const rootUl = document.createElement("ul");
    rootUl.className = "org-tree";
    rootUl.appendChild(diagramLi(TREE_DATA, 0, searchState));
    wrap.appendChild(rootUl);
    treeEl.appendChild(wrap);
  }

  // ---------- Shared render dispatch ----------
  function render() {
    const term = searchEl.value.trim().toLowerCase();
    let searchState = null;

    if (term) {
      searchState = findMatches(TREE_DATA, term);
      // auto-expand ancestors of matches so highlighted paths are visible
      searchState.pathIds.forEach((id) => collapsed.delete(id));
      matchCountEl.textContent = `${searchState.matchIds.size} match${searchState.matchIds.size === 1 ? "" : "es"}`;
    } else {
      matchCountEl.textContent = "";
    }

    treeEl.innerHTML = "";
    treeEl.className = "view-" + viewMode;
    if (viewMode === "list") renderListView(searchState);
    else renderDiagramView(searchState);
  }

  function collectIds(node, acc) {
    acc.push(node.id);
    (node.children || []).forEach((c) => collectIds(c, acc));
    return acc;
  }

  function setViewMode(mode) {
    viewMode = mode;
    viewListBtn.classList.toggle("active", mode === "list");
    viewDiagramBtn.classList.toggle("active", mode === "diagram");
    render();
  }

  expandAllBtn.addEventListener("click", () => {
    collapsed.clear();
    render();
  });

  collapseAllBtn.addEventListener("click", () => {
    const ids = collectIds(TREE_DATA, []);
    ids.forEach((id) => {
      if (id !== TREE_DATA.id) collapsed.add(id);
    });
    render();
  });

  viewListBtn.addEventListener("click", () => setViewMode("list"));
  viewDiagramBtn.addEventListener("click", () => setViewMode("diagram"));

  searchEl.addEventListener("input", render);

  collapseByDefault(TREE_DATA, 0);
  renderStats(TREE_DATA);
  render();
})();

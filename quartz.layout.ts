import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// --- CUSTOM CONDITIONAL COMPONENTS ---

// 1. Setup the Recent Notes component
const BaseRecent = Component.RecentNotes({
  title: "Changelog Directory",
  limit: 50,
})
const RecentOnly = (props: any) => props.fileData.slug === "Recent-Updates" ? BaseRecent(props) : null
RecentOnly.css = BaseRecent.css
RecentOnly.afterDOMLoaded = BaseRecent.afterDOMLoaded

// 2. Setup the Interactive Graph component
const BaseGraph = Component.Graph({
  localGraph: { drag: true, zoom: true, depth: 1, scale: 1.2, repulsion: 1000 },
  globalGraph: { drag: true, zoom: true, depth: -1, scale: 0.9, repulsion: 1500 },
})
const GraphOnly = (props: any) => props.fileData.slug === "Graph" ? BaseGraph(props) : null
GraphOnly.css = BaseGraph.css

// Inject a script to fix the title, size, and auto-click the global graph
GraphOnly.afterDOMLoaded = BaseGraph.afterDOMLoaded + `
document.addEventListener("nav", () => {
  if (window.location.pathname === "/Graph" || window.location.pathname === "/Graph/") {
    setTimeout(() => {
      // Auto-click the global expand button
      const expandBtn = document.querySelector('.global-graph-icon');
      if (expandBtn) expandBtn.click();
      
      // Hide the default "Graph View" heading
      const title = document.querySelector('.graph > h3');
      if (title) title.style.display = "none";
      
      // Make the graph massive
      const outer = document.querySelector('.graph-outer');
      if (outer) {
        outer.style.height = "75vh";
        outer.style.minHeight = "600px";
      }
    }, 50);
  }
});
`
// -------------------------------------

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(), Component.Darkmode(), Component.Search()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // ⚠️ Check this name matches your custom component file!
    Component.MenuBar(), 
    
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    RecentOnly, // Renders your changelog directory BELOW the menu but ABOVE the text
  ],
  left: [],
  right: [],
  afterBody: [
    GraphOnly,  // Renders your massive graph BELOW your custom text
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    // ⚠️ Check this name matches your custom component file!
    Component.MenuBar(),
    
    Component.ArticleTitle(), 
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
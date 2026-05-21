import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// --- CUSTOM CONDITIONAL COMPONENTS ---
// 1. Setup the Recent Notes component
const BaseRecent = Component.RecentNotes({
  title: "Changelog Directory",
  limit: 75,
})
// Wrap it to only render on the "Recent-Updates" page
const RecentOnly = (props: any) => props.fileData.slug === "Recent-Updates" ? BaseRecent(props) : null
RecentOnly.css = BaseRecent.css
RecentOnly.afterDOMLoaded = BaseRecent.afterDOMLoaded

// 2. Setup the Interactive Graph component
const BaseGraph = Component.Graph({
  localGraph: { drag: true, zoom: true, depth: 1, scale: 1.2, repulsion: 1000 },
  globalGraph: { drag: true, zoom: true, depth: -1, scale: 0.9, repulsion: 1500 },
})
// Wrap it to only render on the "Graph" page
const GraphOnly = (props: any) => props.fileData.slug === "Graph" ? BaseGraph(props) : null
GraphOnly.css = BaseGraph.css
GraphOnly.afterDOMLoaded = BaseGraph.afterDOMLoaded
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
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    RecentOnly, // Safely injects the recent notes
    GraphOnly,  // Safely injects the big graph
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
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
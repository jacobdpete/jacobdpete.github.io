import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

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
    
    // 1. Dynamic Recent Updates Generator
    Component.Explorer({
      title: "Changelog Directory",
      folderDefaultState: "collapsed",
      useSavedState: false,
      sort(a, b) {
        // Automatically sort pages by the date they were last modified
        return (b.fileData.dates?.modified?.getTime() ?? 0) - (a.fileData.dates?.modified?.getTime() ?? 0)
      },
    }).filter((key, ctx) => ctx.fileData.slug === "Recent-Updates"),

    // 2. Full-Page Interactive Knowledge Graph
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.2,
        repulsion: 1000,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repulsion: 1500,
      },
    }).filter((key, ctx) => ctx.fileData.slug === "Graph"),
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

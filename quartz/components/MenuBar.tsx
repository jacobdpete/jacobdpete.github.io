import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const MenuBar: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // Simple logic to highlight the active tab
  const slug = fileData.slug
  const isHome = slug === "index"
  const isWiki = slug !== "index" // Highlights 'Wiki' on every page except the home page

  return (
    <nav class={classNames(displayClass, "menu-bar")}>
      {/* Top Row: Main Tabs */}
      <ul class="top-tier">
        <li><a href="/" class={isHome ? "active" : ""}>🏠 Home</a></li>
        <li><a href="/Wiki" class={isWiki ? "active" : ""}>📚 Wiki</a></li>
      </ul>

      {/* Bottom Row: The Pill Container with Categories */}
      <div class="sub-tier-container">
        <ul class="sub-tier">
          <li><a href="/Culture">🎭 Culture</a></li>
          <li><a href="/Economics-and-Technology">⚙️ Economics & Technology</a></li>
          <li><a href="/History/History-Index">📜 History</a></li>
          <li><a href="/Commentary">🖋️ Commentary</a></li>
          <li><a href="/People">👥 People</a></li>
          <li><a href="/Places">🗺️ Places</a></li>
          <li><a href="/Politics">🏛️ Politics</a></li>
          <li><a href="/States">🏳️ States</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default (() => MenuBar) satisfies QuartzComponentConstructor
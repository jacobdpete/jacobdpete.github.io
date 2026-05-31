import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const MenuBar: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // 1. Get the current page name
  const slug = fileData.slug || ""

  // 2. Define the active states (This fixes your error!)
  const isHome = slug === "index"
  // Tell the menu which specific pages belong to the "Etcetera" tab
  const isEtcetera = slug === "Fiction" || slug === "Commentary" || slug === "Graph" || slug === "Recent-Updates" || slug === "Etcetera"
  // If it's not the Home page and not an Etcetera page, default to highlighting the Wiki tab
  const isWiki = !isHome && !isEtcetera 

  return (
    <div class={classNames(displayClass, "menu-bar")}>
      
      {/* TOP TIER TABS */}
      <ul class="top-tier">
        <li><a href="/" class={isHome ? "active" : ""}>Home</a></li>
        <li><a href="/Wiki" class={isWiki ? "active" : ""}>Wiki</a></li>
        <li><a href="/Etcetera" class={isEtcetera ? "active" : ""}>Etcetera</a></li>
      </ul>

      {/* SUB TIER: WIKI (Only renders if you are in the Wiki section) */}
      {isWiki && (
        <div class="sub-tier-container">
          <ul class="sub-tier">
            <li><a href="/Culture">Culture</a></li>
            <li><a href="/Economics-and-Technology">Industry</a></li>
            <li><a href="/History">History</a></li>
            <li><a href="/People">People</a></li>
            <li><a href="/Places">Places</a></li>
            <li><a href="/Politics">Politics</a></li>
            <li><a href="/States">States</a></li>
          </ul>
        </div>
      )}

      {/* SUB TIER: ETCETERA (Only renders if you are in the Etcetera section) */}
      {isEtcetera && (
        <div class="sub-tier-container">
          <ul class="sub-tier">
            <li><a href="/Fiction">Fiction</a></li>
            <li><a href="/Commentary">Commentary</a></li>
            <li><a href="/Graph">Graph View</a></li>
            <li><a href="/Recent-Updates">Recent Updates</a></li>
          </ul>
        </div>
      )}
      
    </div>
  )
}

export default (() => MenuBar) satisfies QuartzComponentConstructor
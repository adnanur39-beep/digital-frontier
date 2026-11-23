import React from "react";
export default function Header({ activeTab, setActiveTab, favoritesCount }) {
  return (
    <header className="topbar">
      <a className="brand" href="#" onClick={() => setActiveTab("explore")} aria-label="Digital Frontier home">
        <span className="brand-mark">D<span>F</span></span>
        <span className="brand-copy">
          <strong>DIGITAL FRONTIER</strong>
          <small>DISCOVER WHAT'S NEXT</small>
        </span>
      </a>

      <nav className="nav-tabs" aria-label="Main navigation">
        <button
          className={activeTab === "explore" ? "nav-tab active" : "nav-tab"}
          onClick={() => setActiveTab("explore")}
        >
          Explore
        </button>
        <button
          className={activeTab === "saved" ? "nav-tab active" : "nav-tab"}
          onClick={() => setActiveTab("saved")}
        >
          Bookmarks <span className="bookmark-count">{favoritesCount}</span>
        </button>
      </nav>
      <div className="topbar-status"><span className="status-dot" /> COMMUNITY FEED</div>
    </header>
  );
}

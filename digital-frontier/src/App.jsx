import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CategoryBar, { categoryQuery } from "./components/CategoryBar";
import StoryCard from "./components/StoryCard";
import StoryModal from "./components/StoryModal";

const API_URL = "https://hn.algolia.com/api/v1/search_by_date";

function readBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem("digital-frontier-bookmarks") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedStory, setSelectedStory] = useState(null);
  const [favorites, setFavorites] = useState(readBookmarks);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("digital-frontier-bookmarks", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStories() {
      setLoading(true);
      setError("");

      try {
        const queryParts = [searchTerm, categoryQuery[activeCategory]].filter(Boolean);
        const params = new URLSearchParams({
          tags: "story",
          hitsPerPage: "30"
        });

        if (queryParts.length) params.set("query", queryParts.join(" "));

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`The story service returned an error (${response.status}).`);
        }

        const result = await response.json();
        setStories(Array.isArray(result.hits) ? result.hits : []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Could not load stories. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadStories();
    return () => controller.abort();
  }, [activeCategory, searchTerm, retryCount]);

  function toggleFavorite(story) {
    setFavorites((current) => {
      const exists = current.some((item) => item.objectID === story.objectID);
      return exists
        ? current.filter((item) => item.objectID !== story.objectID)
        : [story, ...current];
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(searchInput.trim());
    setActiveTab("explore");
  }

  const displayedStories = useMemo(
    () => activeTab === "saved" ? favorites : stories,
    [activeTab, favorites, stories]
  );

  return (
    <div className="app-shell">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
      />

      <main className="page-container">
        <section className="hero-panel">
          <div className="hero-grid-glow" />
          <div className="hero-copy">
            <div className="hero-kicker"><span className="pulse-dot" /> THE NEXT ERA IS ALREADY HERE</div>
            <h1>Explore the<br /><span>Digital Frontier.</span></h1>
            <p>
              A launchpad for curious minds. Discover the ideas, people and
              technologies shaping the world we're building next.
            </p>
            <div className="hero-pills">
              <span>AI & machine learning</span>
              <span>Open source</span>
              <span>Future tech</span>
            </div>
          </div>

          <div className="orbital-art" aria-hidden="true">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="planet"><span>✦</span></div>
            <i className="satellite satellite-a" />
            <i className="satellite satellite-b" />
            <i className="satellite satellite-c" />
          </div>
          <div className="hero-bottom-label"><span>01</span> IDEAS THAT MOVE US FORWARD</div>
        </section>

        <section className="discovery-header">
          <div>
            <span className="section-kicker">YOUR KNOWLEDGE HUB</span>
            <h2>{activeTab === "saved" ? "Your Bookmarks" : "Discover what's new"}</h2>
            <p>{activeTab === "saved" ? "The stories you've kept close." : "Fresh signals from the technology community."}</p>
          </div>

          {activeTab === "explore" && (
            <form className="search-form" onSubmit={handleSearch}>
              <span className="search-icon">⌕</span>
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search AI, coding, startups..."
                aria-label="Search technology stories"
              />
              {searchInput && (
                <button type="button" className="clear-search" onClick={() => { setSearchInput(""); setSearchTerm(""); }}>
                  ×
                </button>
              )}
              <button className="search-submit" type="submit">Search</button>
            </form>
          )}
        </section>

        {activeTab === "explore" && (
          <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        )}

        <section className="feed-section">
          <div className="feed-title-row">
            <div>
              <h2>{activeTab === "saved" ? "Saved discoveries" : "Latest discoveries"}</h2>
              <p>{activeTab === "saved" ? `${favorites.length} saved ${favorites.length === 1 ? "story" : "stories"}` : "Curated by the Hacker News community"}</p>
            </div>
            {activeTab === "explore" && <span className="live-badge"><i /> LIVE COMMUNITY FEED</span>}
          </div>

          {activeTab === "explore" && loading && (
            <div className="state-panel">
              <div className="loader-ring" />
              <h3>Scanning the frontier...</h3>
              <p>Gathering fresh technology stories for you.</p>
            </div>
          )}

          {activeTab === "explore" && !loading && error && (
            <div className="state-panel error-panel">
              <div className="state-symbol">!</div>
              <h3>We lost the signal.</h3>
              <p>{error}</p>
              <button className="button-primary retry-button" onClick={() => setRetryCount((count) => count + 1)}>
                Try again
              </button>
            </div>
          )}

          {activeTab === "saved" && displayedStories.length === 0 && (
            <div className="state-panel">
              <div className="state-symbol">♡</div>
              <h3>Your collection is waiting.</h3>
              <p>Tap the heart on any story to save it here for later.</p>
              <button className="button-primary retry-button" onClick={() => setActiveTab("explore")}>
                Explore stories
              </button>
            </div>
          )}

          {activeTab === "explore" && !loading && !error && stories.length === 0 && (
            <div className="state-panel">
              <div className="state-symbol">⌕</div>
              <h3>No stories found.</h3>
              <p>Try another search phrase or choose a different category.</p>
            </div>
          )}

          {((activeTab === "explore" && !loading && !error && stories.length > 0) ||
            (activeTab === "saved" && displayedStories.length > 0)) && (
            <div className="story-grid">
              {displayedStories.map((story) => (
                <StoryCard
                  key={story.objectID}
                  story={story}
                  isFavorite={favorites.some((item) => item.objectID === story.objectID)}
                  onFavorite={toggleFavorite}
                  onOpen={() => setSelectedStory(story)}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="site-footer">
          <div className="footer-brand"><span className="brand-mark small">D<span>F</span></span> DIGITAL FRONTIER</div>
          <p>Stay curious. Explore beyond limits.</p>
          <span>Stories provided by the Hacker News Search API · Built with React + Vite</span>
        </footer>
      </main>

      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}

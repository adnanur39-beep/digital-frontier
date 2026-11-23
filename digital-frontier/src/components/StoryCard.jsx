import React from "react";
function formatDate(dateString) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export default function StoryCard({ story, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="story-card">
      <div className="story-card-top">
        <span className="eyebrow-tag"><span className="tiny-spark">✦</span> FRONTIER FIND</span>
        <button
          className={isFavorite ? "favorite-button is-saved" : "favorite-button"}
          onClick={() => onFavorite(story)}
          aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
          title={isFavorite ? "Remove bookmark" : "Save story"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <button className="story-title-button" onClick={onOpen}>
        <h3>{story.title || "Untitled story"}</h3>
      </button>

      <p className="story-byline">
        Posted by <strong>{story.author || "Unknown author"}</strong>
      </p>

      <div className="story-card-footer">
        <div className="story-stats">
          <span title="Community points">▲ {story.points ?? 0}</span>
          <span title="Comments">▤ {story.num_comments ?? 0}</span>
          <span>{formatDate(story.created_at)}</span>
        </div>
        <button className="text-link" onClick={onOpen}>Explore story <span>↗</span></button>
      </div>
    </article>
  );
}

import React from "react";
export default function StoryModal({ story, onClose }) {
  if (!story) return null;

  const discussionUrl = `https://news.ycombinator.com/item?id=${story.objectID}`;
  const sourceUrl = story.url || discussionUrl;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="story-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
        <span className="eyebrow-tag"><span className="tiny-spark">✦</span> STORY DETAILS</span>
        <h2 id="modal-title">{story.title || "Untitled story"}</h2>
        <p className="modal-byline">Submitted by <strong>{story.author || "Unknown author"}</strong></p>

        <div className="modal-stat-row">
          <span>▲ {story.points ?? 0} points</span>
          <span>▤ {story.num_comments ?? 0} comments</span>
        </div>

        <p className="modal-description">
          This story was shared with the Hacker News community. Open the original source
          to read the full article, or visit the discussion to see community feedback.
        </p>

        <div className="modal-actions">
          <a className="button-primary" href={sourceUrl} target="_blank" rel="noreferrer">
            Read original story ↗
          </a>
          <a className="button-secondary" href={discussionUrl} target="_blank" rel="noreferrer">
            Community discussion
          </a>
        </div>
      </section>
    </div>
  );
}

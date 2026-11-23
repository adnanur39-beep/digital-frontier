import React from "react";
const categories = [
  { name: "All", query: "" },
  { name: "Artificial Intelligence", query: "AI" },
  { name: "Startups", query: "startup" },
  { name: "Programming", query: "programming" },
  { name: "Web Development", query: "web development" },
  { name: "Cybersecurity", query: "cybersecurity" }
];

export const categoryQuery = Object.fromEntries(
  categories.map((category) => [category.name, category.query])
);

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="category-list" aria-label="Filter stories by category">
      {categories.map((category) => (
        <button
          key={category.name}
          className={activeCategory === category.name ? "category-chip selected" : "category-chip"}
          onClick={() => setActiveCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

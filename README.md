# GitHub Profile Viewer 🔍

A sleek and responsive GitHub Profile Explorer built with React. Search any GitHub user and instantly view their profile, repositories, language stats, and more.

🔗 **Live Demo:** [github-profile-viewer.vercel.app](github-profile-viewer-one-sigma.vercel.app)

---

## ✨ Features

- 🔎 **Live Search Suggestions** — Real-time user suggestions as you type with avatars
- 👤 **Profile Card** — Avatar, bio, location, company, followers & following stats
- 📁 **Repository Cards** — Top repos with stars, forks, and language color badges
- 📊 **Language Chart** — Visual bar chart of top programming languages used
- 🌙 **Dark / Light Mode** — Smooth theme toggle with full UI adaptation
- 🕓 **Recent Searches** — Last 5 searches saved in localStorage
- 📋 **Copy Username** — One-click copy to clipboard
- 🔀 **Filter & Sort Repos** — Filter by language, sort by stars, forks, name, or date
- 🔗 **Shareable Profile Link** — URL updates with username for easy sharing

---

## 🚀 Coming Soon

These features are planned for future updates:

- [ ] 📌 **Pinned Repositories** — Show user's pinned repos via GitHub GraphQL API
- [ ] 👥 **Followers List Modal** — Click followers count to browse the full list
- [ ] ⚔️ **Compare Two Profiles** — Side by side stats comparison of two GitHub users
- [ ] 📈 **Activity Graph** — Contribution heatmap similar to GitHub's activity calendar
- [ ] 📄 **README Preview** — Click any repo to read its README rendered in markdown
- [ ] 📄 **Pagination** — Load more repositories beyond the initial 20

---

## 🛠️ Built With

- **React** — UI library
- **Vite** — Fast build tool
- **GitHub REST API** — Live data fetching
- **CSS-in-JS** — Inline styles with theme support

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/nehasingh10985-a11y/github-profile-viewer.git

# Go into the project folder
cd github-profile-viewer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Search input with live suggestions
│   ├── ProfileCard.jsx     # User profile display
│   ├── RepoCard.jsx        # Individual repo card
│   ├── RepoFilter.jsx      # Language filter + sort dropdown
│   └── LanguageChart.jsx   # Language usage bar chart
├── App.jsx                 # Main app with state management
└── index.css               # Global styles
```

---

## 🌐 API Used

- [GitHub Users API](https://api.github.com/users/{username})
- [GitHub Repos API](https://api.github.com/users/{username}/repos)
- [GitHub Search API](https://api.github.com/search/users?q={query})

---

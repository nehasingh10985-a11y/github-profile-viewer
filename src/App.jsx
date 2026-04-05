import { useState, useMemo, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoCard from "./components/RepoCard";
import LanguageChart from "./components/LanguageChart";
import RepoFilter from "./components/RepoFilter";
import CompareProfiles from "./components/CompareProfiles";

function App() {
  const [profile, setProfile] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches") || "[]"),
  );
  const [selectedLang, setSelectedLang] = useState("all");
  const [sortBy, setSortBy] = useState("stars");
  const [shareCopied, setShareCopied] = useState(false);

  const resultRef = useRef(null);
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#0a0a0f" : "#f1f5f9",
    heading: isDark ? "#ffffff" : "#0f172a",
    subtext: isDark ? "#64748b" : "#64748b",
    sectionLabel: isDark ? "#94a3b8" : "#64748b",
    toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    toggleBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    toggleText: isDark ? "#94a3b8" : "#475569",
    errorBg: isDark ? "rgba(239,68,68,0.05)" : "rgba(239,68,68,0.08)",
    errorBorder: isDark ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.3)",
    gridLine: isDark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.06)",
    recentBtnBg: isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.06)",
    recentBtnBorder: isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.2)",
    recentBtnText: isDark ? "#a5b4fc" : "#4f46e5",
    recentLabelColor: isDark ? "#475569" : "#94a3b8",
    clearBtnColor: isDark ? "#475569" : "#94a3b8",
    emptyText: isDark ? "#475569" : "#94a3b8",
    emptyBg: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    emptyBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
  };

  const fetchUser = async function (name) {
    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);
    setSelectedLang("all");
    setSortBy("stars");
    setShareCopied(false);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // URL update karo
    const newUrl = window.location.pathname + "?user=" + name;
    window.history.pushState({}, "", newUrl);

    try {
      const userRes = await fetch("https://api.github.com/users/" + name);
      const repoRes = await fetch(
        "https://api.github.com/users/" +
          name +
          "/repos?sort=stars&per_page=20",
      );

      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();
      const repoData = await repoRes.json();

      setProfile(userData);
      setRepos(repoData);

      const updated = [
        name,
        ...recentSearches.filter(function (s) {
          return s !== name;
        }),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      setTimeout(function () {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (err) {
      setError(err.message);
      window.history.pushState({}, "", window.location.pathname);
    } finally {
      setLoading(false);
    }
  };

  // Page load pe URL check karo
  useEffect(function () {
    const params = new URLSearchParams(window.location.search);
    const userFromUrl = params.get("user");
    if (userFromUrl) {
      fetchUser(userFromUrl);
    }
  }, []);

  // Browser back/forward button support
  useEffect(function () {
    const handlePopState = function () {
      const params = new URLSearchParams(window.location.search);
      const userFromUrl = params.get("user");
      if (userFromUrl) {
        fetchUser(userFromUrl);
      } else {
        setProfile(null);
        setRepos([]);
        setError("");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return function () {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleShareLink = function () {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(function () {
      setShareCopied(false);
    }, 2500);
  };

  const clearRecent = function () {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const toggleTheme = function () {
    setTheme(isDark ? "light" : "dark");
  };

  const languages = useMemo(
    function () {
      const langs = repos
        .map(function (r) {
          return r.language;
        })
        .filter(function (l) {
          return l != null;
        });
      return [...new Set(langs)];
    },
    [repos],
  );

  const filteredAndSorted = useMemo(
    function () {
      let result = [...repos];

      if (selectedLang !== "all") {
        result = result.filter(function (r) {
          return r.language === selectedLang;
        });
      }

      if (sortBy === "stars") {
        result.sort(function (a, b) {
          return b.stargazers_count - a.stargazers_count;
        });
      } else if (sortBy === "forks") {
        result.sort(function (a, b) {
          return b.forks_count - a.forks_count;
        });
      } else if (sortBy === "name") {
        result.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (sortBy === "updated") {
        result.sort(function (a, b) {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
      }

      return result;
    },
    [repos, selectedLang, sortBy],
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(" +
            colors.gridLine +
            " 1px, transparent 1px), linear-gradient(90deg, " +
            colors.gridLine +
            " 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "32px 20px 60px",
        }}
      >
        {/* Modern Header Navigation */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: colors.heading,
              letterSpacing: "-0.02em",
              cursor: "pointer",
            }}
            onClick={() => setShowCompare(false)}
          >
            GitExplorer<span style={{ color: "#6366f1" }}>.</span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Compare Toggle Button */}
            <button
              onClick={() => setShowCompare(!showCompare)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: showCompare
                  ? colors.emptyBg
                  : "rgba(99,102,241,0.08)",
                border:
                  "1px solid " +
                  (showCompare ? colors.emptyBorder : "rgba(99,102,241,0.2)"),
                borderRadius: "12px",
                padding: "7px 16px",
                color: showCompare
                  ? colors.toggleText
                  : isDark
                    ? "#a5b4fc"
                    : "#4f46e5",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {showCompare ? "← Back to Search" : "⚔️ Compare Users"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                background: colors.toggleBg,
                border: "1px solid " + colors.toggleBorder,
                borderRadius: "12px",
                color: colors.toggleText,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* CONDITIONAL RENDERING: Compare Mode OR Normal Search Mode */}
        {showCompare ? (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <CompareProfiles isDark={isDark} />
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            {/* Hero Section */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "99px",
                  padding: "4px 14px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    color: "#a5b4fc",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                  }}
                >
                  GITHUB EXPLORER
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 700,
                  color: colors.heading,
                  margin: "0 0 12px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  transition: "color 0.3s",
                }}
              >
                Discover any
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #6366f1, #a78bfa, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GitHub profile
                </span>
              </h1>
              <p
                style={{
                  color: colors.subtext,
                  fontSize: "16px",
                  margin: 0,
                  transition: "color 0.3s",
                }}
              >
                Search developers, explore their repos and stats
              </p>
            </div>

            <SearchBar onSearch={fetchUser} isDark={isDark} />

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "-24px",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{ color: colors.recentLabelColor, fontSize: "12px" }}
                >
                  Recent:
                </span>
                {recentSearches.map(function (name) {
                  return (
                    <button
                      key={name}
                      onClick={function () {
                        fetchUser(name);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: colors.recentBtnBg,
                        border: "1px solid " + colors.recentBtnBorder,
                        borderRadius: "99px",
                        padding: "4px 12px",
                        color: colors.recentBtnText,
                        fontSize: "12px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={function (e) {
                        e.currentTarget.style.background =
                          "rgba(99,102,241,0.15)";
                      }}
                      onMouseOut={function (e) {
                        e.currentTarget.style.background = colors.recentBtnBg;
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      {name}
                    </button>
                  );
                })}
                <button
                  onClick={clearRecent}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: colors.clearBtnColor,
                    fontSize: "11px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "4px 8px",
                  }}
                  onMouseOver={function (e) {
                    e.currentTarget.style.color = "#f87171";
                  }}
                  onMouseOut={function (e) {
                    e.currentTarget.style.color = colors.clearBtnColor;
                  }}
                >
                  Clear
                </button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto 16px",
                    border: "3px solid rgba(99,102,241,0.2)",
                    borderTop: "3px solid #6366f1",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p style={{ color: colors.subtext, fontSize: "14px" }}>
                  Fetching profile...
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  background: colors.errorBg,
                  border: "1px solid " + colors.errorBorder,
                  borderRadius: "16px",
                  marginTop: "24px",
                  position: "relative",
                  zIndex: 0,
                }}
              >
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "15px",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  User not found. Try another username.
                </p>
              </div>
            )}

            {/* Result section */}
            <div ref={resultRef} style={{ position: "relative", zIndex: 0 }}>
              {profile && (
                <>
                  <ProfileCard profile={profile} isDark={isDark} />

                  {/* Share button */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      onClick={handleShareLink}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "10px",
                        background: shareCopied
                          ? "rgba(34,197,94,0.1)"
                          : colors.toggleBg,
                        border: shareCopied
                          ? "1px solid rgba(34,197,94,0.3)"
                          : "1px solid " + colors.toggleBorder,
                        color: shareCopied ? "#4ade80" : colors.clearBtnColor,
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {shareCopied ? (
                        <>
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                          </svg>
                          Share Profile
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

              {repos.length > 0 && (
                <div>
                  <h2
                    style={{
                      color: colors.sectionLabel,
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      marginBottom: "20px",
                      marginTop: "48px",
                    }}
                  >
                    REPOSITORIES
                  </h2>

                  <RepoFilter
                    isDark={isDark}
                    selectedLang={selectedLang}
                    sortBy={sortBy}
                    languages={languages}
                    onLangChange={setSelectedLang}
                    onSortChange={setSortBy}
                  />

                  {filteredAndSorted.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        background: colors.emptyBg,
                        border: "1px solid " + colors.emptyBorder,
                        borderRadius: "16px",
                      }}
                    >
                      <p
                        style={{
                          color: colors.emptyText,
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        No repositories found for this filter.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {filteredAndSorted.map(function (repo) {
                        return (
                          <RepoCard key={repo.id} repo={repo} isDark={isDark} />
                        );
                      })}
                    </div>
                  )}

                  <LanguageChart repos={repos} isDark={isDark} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

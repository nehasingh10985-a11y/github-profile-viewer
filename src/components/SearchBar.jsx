import { useState, useEffect, useRef } from "react";

function SearchBar(props) {
  const isDark = props.isDark;
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  const colors = {
    inputBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    inputBorder: focused
      ? "rgba(99,102,241,0.6)"
      : isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.12)",
    inputText: isDark ? "#f1f5f9" : "#0f172a",
    dropdownBg: isDark ? "#0f0f1a" : "#ffffff",
    dropdownBorder: "rgba(99,102,241,0.4)",
    suggestionText: isDark ? "#f1f5f9" : "#0f172a",
    suggestionSub: isDark ? "#475569" : "#94a3b8",
    suggestionHover: isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)",
    divider: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
    iconColor: isDark ? "#475569" : "#94a3b8",
  };

  useEffect(
    function () {
      if (input.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async function () {
        setLoading(true);
        try {
          const res = await fetch(
            "https://api.github.com/search/users?q=" + input + "&per_page=6",
          );
          const data = await res.json();
          setSuggestions(data.items || []);
        } catch (err) {
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 400);
      return function () {
        clearTimeout(debounceRef.current);
      };
    },
    [input],
  );

  useEffect(function () {
    const handleClickOutside = function (e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (input.trim()) {
      props.onSearch(input.trim());
      setSuggestions([]);
    }
  };

  const handleSelect = function (login) {
    setInput(login);
    setSuggestions([]);
    props.onSearch(login);
  };

  const showDropdown = focused && suggestions.length > 0;

  return (
    <div
      ref={wrapperRef}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        position: "relative",
        zIndex: 100,
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px", position: "relative" }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: colors.inputBg,
              border: "1px solid " + colors.inputBorder,
              borderRadius: showDropdown ? "14px 14px 0 0" : "14px",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
            }}
          >
            <div
              style={{
                padding: "0 16px",
                color: loading ? "#6366f1" : colors.iconColor,
                transition: "color 0.2s",
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(99,102,241,0.3)",
                    borderTop: "2px solid #6366f1",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              ) : (
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </div>

            <input
              type="text"
              placeholder="Search a GitHub username..."
              value={input}
              onChange={function (e) {
                setInput(e.target.value);
              }}
              onFocus={function () {
                setFocused(true);
              }}
              onBlur={function () {
                setFocused(false);
              }}
              style={{
                flex: 1,
                padding: "14px 0",
                background: "transparent",
                border: "none",
                outline: "none",
                color: colors.inputText,
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />

            <button
              type="submit"
              style={{
                margin: "6px",
                padding: "10px 22px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseOver={function (e) {
                e.target.style.opacity = "0.85";
              }}
              onMouseOut={function (e) {
                e.target.style.opacity = "1";
              }}
            >
              Search
            </button>
          </div>
        </form>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: colors.dropdownBg,
              border: "1px solid " + colors.dropdownBorder,
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
            }}
          >
            {suggestions.map(function (user, index) {
              return (
                <div
                  key={user.id}
                  onMouseDown={function () {
                    handleSelect(user.login);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    borderTop:
                      index === 0 ? "none" : "1px solid " + colors.divider,
                    transition: "background 0.15s",
                  }}
                  onMouseOver={function (e) {
                    e.currentTarget.style.background = colors.suggestionHover;
                  }}
                  onMouseOut={function (e) {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        color: colors.suggestionText,
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {user.login}
                    </div>
                    <div
                      style={{ color: colors.suggestionSub, fontSize: "11px" }}
                    >
                      github.com/{user.login}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke={colors.suggestionSub}
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export default SearchBar;

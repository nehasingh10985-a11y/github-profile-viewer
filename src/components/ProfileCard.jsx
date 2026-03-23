import { useState } from "react";

function ProfileCard(props) {
  const p = props.profile;
  const isDark = props.isDark;
  const avatarUrl = p.avatar_url;
  const name = p.name;
  const login = p.login;
  const bio = p.bio;
  const repos = p.public_repos;
  const followers = p.followers;
  const following = p.following;
  const githubUrl = p.html_url;
  const location = p.location;
  const blog = p.blog;
  const company = p.company;

  const [copied, setCopied] = useState(false);

  const handleCopy = function () {
    navigator.clipboard.writeText(login);
    setCopied(true);
    setTimeout(function () {
      setCopied(false);
    }, 2000);
  };

  const colors = {
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    heading: isDark ? "#f1f5f9" : "#0f172a",
    bio: isDark ? "#94a3b8" : "#475569",
    meta: isDark ? "#64748b" : "#94a3b8",
    statBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    statBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    statNum: isDark ? "#f1f5f9" : "#0f172a",
    statLabel: isDark ? "#64748b" : "#94a3b8",
  };

  const statBox = function (label, value) {
    return (
      <div
        style={{
          flex: 1,
          textAlign: "center",
          padding: "16px 12px",
          background: colors.statBg,
          border: "1px solid " + colors.statBorder,
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: colors.statNum,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: colors.statLabel,
            marginTop: "4px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: colors.cardBg,
        border: "1px solid " + colors.cardBorder,
        borderRadius: "20px",
        padding: "32px",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa, #38bdf8)",
              zIndex: 0,
            }}
          />
          <img
            src={avatarUrl}
            alt={login}
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              border: isDark ? "3px solid #0a0a0f" : "3px solid #f1f5f9",
              position: "relative",
              zIndex: 1,
              display: "block",
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "24px",
              fontWeight: 700,
              color: colors.heading,
              letterSpacing: "-0.02em",
            }}
          >
            {name || login}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <p
              style={{
                color: "#6366f1",
                fontSize: "14px",
                fontWeight: 500,
                margin: 0,
              }}
            >
              @{login}
            </p>
            <button
              onClick={handleCopy}
              style={{
                background: copied
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: copied
                  ? "1px solid rgba(34,197,94,0.3)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "2px 10px",
                color: copied ? "#4ade80" : "#64748b",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {bio && (
            <p
              style={{
                margin: "0 0 16px",
                color: colors.bio,
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              {bio}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {location && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: colors.meta,
                  fontSize: "13px",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </span>
            )}
            {company && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: colors.meta,
                  fontSize: "13px",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                {company}
              </span>
            )}
            {blog && (
              <a
                href={blog}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#6366f1",
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {blog}
              </a>
            )}
          </div>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            borderRadius: "10px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
            transition: "background 0.2s",
            flexShrink: 0,
            alignSelf: "flex-start",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View Profile
        </a>
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        {statBox("Repositories", repos)}
        {statBox("Followers", followers)}
        {statBox("Following", following)}
      </div>
    </div>
  );
}

export default ProfileCard;

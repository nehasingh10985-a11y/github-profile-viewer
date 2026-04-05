import { useState } from "react";

// ─── Mini SearchInput ────────────────────────────────────────────────────────
function SearchInput({
  value,
  onChange,
  onSearch,
  loading,
  placeholder,
  isDark,
}) {
  const colors = {
    inputBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)",
    inputText: isDark ? "#f1f5f9" : "#0f172a",
    placeholder: isDark ? "#475569" : "#94a3b8",
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder={placeholder}
        style={{
          flex: "1 1 180px", // Fluid width: shrink aur grow karega
          minWidth: 0,
          padding: "12px 16px",
          borderRadius: "12px",
          border: "1px solid " + colors.inputBorder,
          background: colors.inputBg,
          color: colors.inputText,
          fontSize: "14px",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
      <button
        onClick={onSearch}
        disabled={loading || !value.trim()}
        style={{
          flex: "1 1 auto", // Button mobile par poori width le lega agar jagah na ho
          padding: "12px 20px",
          borderRadius: "12px",
          border: "none",
          background: loading
            ? "rgba(99,102,241,0.4)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: loading || !value.trim() ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "opacity 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
}

// ─── Stat Row for Comparison ─────────────────────────────────────────────────
function StatRow({ label, val1, val2, isDark }) {
  const max = Math.max(val1, val2, 1);
  const pct1 = (val1 / max) * 100;
  const pct2 = (val2 / max) * 100;

  const winner1 = val1 > val2;
  const winner2 = val2 > val1;

  const colors = {
    label: isDark ? "#64748b" : "#94a3b8",
    val: isDark ? "#f1f5f9" : "#0f172a",
    bar1: winner1
      ? "#6366f1"
      : isDark
        ? "rgba(99,102,241,0.3)"
        : "rgba(99,102,241,0.2)",
    bar2: winner2
      ? "#8b5cf6"
      : isDark
        ? "rgba(139,92,246,0.3)"
        : "rgba(139,92,246,0.2)",
    rowBorder: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
  };

  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom: "1px solid " + colors.rowBorder,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "clamp(12px, 3vw, 13px)",
            fontWeight: winner1 ? 700 : 400,
            color: winner1 ? "#a5b4fc" : colors.val,
            flex: 1,
            textAlign: "left",
          }}
        >
          {val1.toLocaleString()}
          {winner1 && (
            <span
              style={{ marginLeft: "4px", fontSize: "10px", color: "#6366f1" }}
            >
              ▲
            </span>
          )}
        </span>

        <span
          style={{
            fontSize: "clamp(10px, 2.5vw, 11px)",
            color: colors.label,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 500,
            textAlign: "center",
            flex: 1,
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontSize: "clamp(12px, 3vw, 13px)",
            fontWeight: winner2 ? 700 : 400,
            color: winner2 ? "#c4b5fd" : colors.val,
            flex: 1,
            textAlign: "right",
          }}
        >
          {winner2 && (
            <span
              style={{ marginRight: "4px", fontSize: "10px", color: "#8b5cf6" }}
            >
              ▲
            </span>
          )}
          {val2.toLocaleString()}
        </span>
      </div>

      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              height: "5px",
              width: pct1 + "%",
              background: colors.bar1,
              borderRadius: "999px",
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: "5px",
              width: pct2 + "%",
              background: colors.bar2,
              borderRadius: "999px",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Mini Profile Card ────────────────────────────────────────────────────────
function MiniProfileCard({ profile, isDark, side }) {
  const accent = side === "left" ? "#6366f1" : "#8b5cf6";
  const gradStart = side === "left" ? "#6366f1" : "#8b5cf6";
  const gradEnd = side === "left" ? "#a78bfa" : "#38bdf8";

  const colors = {
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    name: isDark ? "#f1f5f9" : "#0f172a",
    bio: isDark ? "#94a3b8" : "#475569",
  };

  return (
    <div
      style={{
        background: colors.cardBg,
        border: "1px solid " + colors.cardBorder,
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "10px",
        height: "100%",
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${gradStart}, ${gradEnd})`,
            zIndex: 0,
          }}
        />
        <img
          src={profile.avatar_url}
          alt={profile.login}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: isDark ? "3px solid #0a0a0f" : "3px solid #f8fafc",
            position: "relative",
            zIndex: 1,
            display: "block",
            objectFit: "cover",
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: colors.name,
            letterSpacing: "-0.02em",
            wordBreak: "break-word",
          }}
        >
          {profile.name || profile.login}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: accent,
            fontWeight: 500,
            marginTop: "2px",
          }}
        >
          @{profile.login}
        </div>
      </div>

      {profile.bio && (
        <p
          style={{
            fontSize: "12px",
            color: colors.bio,
            lineHeight: 1.5,
            margin: "0 0 auto 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {profile.bio}
        </p>
      )}

      <a
        href={profile.html_url}
        target="_blank"
        rel="noreferrer"
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          background: `rgba(${side === "left" ? "99,102,241" : "139,92,246"},0.1)`,
          border: `1px solid rgba(${side === "left" ? "99,102,241" : "139,92,246"},0.25)`,
          color: accent,
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
          marginTop: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        View on GitHub ↗
      </a>
    </div>
  );
}

// ─── Winner Badge ─────────────────────────────────────────────────────────────
function WinnerBadge({ profile1, profile2, isDark }) {
  const score1 =
    profile1.public_repos * 2 + profile1.followers * 3 + profile1.following;
  const score2 =
    profile2.public_repos * 2 + profile2.followers * 3 + profile2.following;

  const tied = score1 === score2;
  const winner = tied ? null : score1 > score2 ? profile1 : profile2;
  const accent = winner?.login === profile1.login ? "#6366f1" : "#8b5cf6";

  return (
    <div
      style={{ textAlign: "center", padding: "16px 0", marginBottom: "8px" }}
    >
      {tied ? (
        <div
          style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: "14px" }}
        >
          🤝 It's a tie!
        </div>
      ) : (
        <div>
          <div
            style={{
              fontSize: "11px",
              color: isDark ? "#64748b" : "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
            }}
          >
            Overall Winner
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: `rgba(${winner?.login === profile1.login ? "99,102,241" : "139,92,246"},0.12)`,
              border: `1px solid ${accent}40`,
              maxWidth: "100%",
            }}
          >
            <img
              src={winner?.avatar_url}
              alt=""
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: accent,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              @{winner?.login}
            </span>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>🏆</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main CompareProfiles Component ──────────────────────────────────────────
function CompareProfiles({ isDark }) {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [profile1, setProfile1] = useState(null);
  const [profile2, setProfile2] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const colors = {
    sectionBg: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    sectionBorder: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    heading: isDark ? "#f1f5f9" : "#0f172a",
    sub: isDark ? "#64748b" : "#94a3b8",
    divider: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    vsText: isDark ? "#334155" : "#cbd5e1",
    errorColor: "#f87171",
  };

  const fetchProfile = async (username, setProfile, setLoading, setError) => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    setProfile(null);
    try {
      const res = await fetch(
        `https://api.github.com/users/${username.trim()}`,
      );
      if (!res.ok)
        throw new Error(res.status === 404 ? "User not found" : "API error");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser1("");
    setUser2("");
    setProfile1(null);
    setProfile2(null);
    setError1("");
    setError2("");
  };

  const bothLoaded = profile1 && profile2;

  return (
    <div style={{ width: "100%", padding: "0 10px", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(20px, 5vw, 24px)",
            fontWeight: 800,
            color: colors.heading,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "24px" }}>⚔️</span> Compare Profiles
        </h2>
        <p
          style={{
            margin: 0,
            color: colors.sub,
            fontSize: "14px",
            padding: "0 10px",
          }}
        >
          Search two GitHub users and compare their stats side by side
        </p>
      </div>

      {/* Fluid Search Inputs (Auto stacks on mobile) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          background: colors.sectionBg,
          padding: "24px 20px",
          borderRadius: "20px",
          border: "1px solid " + colors.sectionBorder,
        }}
      >
        {/* User 1 */}
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#6366f1",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            Player 1
          </div>
          <SearchInput
            value={user1}
            onChange={(val) => {
              setUser1(val);
              if (!val.trim()) {
                setProfile1(null);
                setError1("");
              }
            }}
            onSearch={() =>
              fetchProfile(user1, setProfile1, setLoading1, setError1)
            }
            loading={loading1}
            placeholder="Enter username..."
            isDark={isDark}
          />
          {error1 && (
            <p
              style={{
                color: colors.errorColor,
                fontSize: "12px",
                margin: "6px 0 0",
              }}
            >
              ⚠ {error1}
            </p>
          )}
        </div>

        {/* VS divider */}
        <div
          style={{
            padding: "10px",
            fontSize: "18px",
            fontWeight: 900,
            color: colors.vsText,
            letterSpacing: "0.05em",
            userSelect: "none",
          }}
        >
          VS
        </div>

        {/* User 2 */}
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#8b5cf6",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            Player 2
          </div>
          <SearchInput
            value={user2}
            onChange={(val) => {
              setUser2(val);
              if (!val.trim()) {
                setProfile2(null);
                setError2("");
              }
            }}
            onSearch={() =>
              fetchProfile(user2, setProfile2, setLoading2, setError2)
            }
            loading={loading2}
            placeholder="Enter username..."
            isDark={isDark}
          />
          {error2 && (
            <p
              style={{
                color: colors.errorColor,
                fontSize: "12px",
                margin: "6px 0 0",
              }}
            >
              ⚠ {error2}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      {bothLoaded && (
        <div
          style={{
            background: colors.sectionBg,
            border: "1px solid " + colors.sectionBorder,
            borderRadius: "20px",
            padding: "clamp(16px, 4vw, 32px)", // Dynamic padding
            animation: "fadeIn 0.4s ease",
            boxSizing: "border-box",
          }}
        >
          {/* Fluid Mini profile cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <MiniProfileCard profile={profile1} isDark={isDark} side="left" />
            <MiniProfileCard profile={profile2} isDark={isDark} side="right" />
          </div>

          <WinnerBadge
            profile1={profile1}
            profile2={profile2}
            isDark={isDark}
          />

          <div
            style={{
              borderTop: "2px dashed " + colors.divider,
              margin: "16px auto 20px",
              width: "80%",
            }}
          />

          {/* Stat rows container */}
          <div
            style={{
              background: isDark ? "rgba(0,0,0,0.2)" : "#fff",
              padding: "clamp(12px, 3vw, 24px)",
              borderRadius: "16px",
              border: "1px solid " + colors.sectionBorder,
            }}
          >
            <StatRow
              label="Repositories"
              val1={profile1.public_repos}
              val2={profile2.public_repos}
              isDark={isDark}
            />
            <StatRow
              label="Followers"
              val1={profile1.followers}
              val2={profile2.followers}
              isDark={isDark}
            />
            <StatRow
              label="Following"
              val1={profile1.following}
              val2={profile2.following}
              isDark={isDark}
            />
            <StatRow
              label="Public Gists"
              val1={profile1.public_gists}
              val2={profile2.public_gists}
              isDark={isDark}
            />
          </div>

          {/* Reset button */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button
              onClick={handleReset}
              style={{
                padding: "12px 28px",
                borderRadius: "12px",
                border: "2px solid " + colors.sectionBorder,
                background: "transparent",
                color: colors.sub,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
                width: "100%",
                maxWidth: "250px", // Full width on mobile, capped on desktop
              }}
            >
              Reset Comparison
            </button>
          </div>
        </div>
      )}

      {/* Placeholder when not both loaded */}
      {!bothLoaded && (profile1 || profile2) && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            background: colors.sectionBg,
            border: "1px solid " + colors.sectionBorder,
            borderRadius: "20px",
            color: colors.sub,
            fontSize: "15px",
            marginTop: "16px",
          }}
        >
          {profile1 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "24px" }}>✅</span>
              <div>
                <strong
                  style={{
                    color: isDark ? "#a5b4fc" : "#6366f1",
                    wordBreak: "break-all",
                  }}
                >
                  @{profile1.login}
                </strong>{" "}
                loaded — now search Player 2
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "24px" }}>✅</span>
              <div>
                <strong
                  style={{
                    color: isDark ? "#c4b5fd" : "#8b5cf6",
                    wordBreak: "break-all",
                  }}
                >
                  @{profile2.login}
                </strong>{" "}
                loaded — now search Player 1
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default CompareProfiles;

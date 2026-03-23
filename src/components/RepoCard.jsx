const langColors = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
};

function RepoCard(props) {
  const isDark = props.isDark;
  const url = props.repo.html_url;
  const name = props.repo.name;
  const desc = props.repo.description;
  const lang = props.repo.language;
  const stars = props.repo.stargazers_count;
  const forks = props.repo.forks_count;
  const langColor = lang ? langColors[lang] || "#94a3b8" : null;

  const colors = {
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    cardBorder: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    cardHoverBg: isDark ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.04)",
    name: isDark ? "#a5b4fc" : "#4f46e5",
    desc: isDark ? "#64748b" : "#64748b",
    meta: isDark ? "#64748b" : "#94a3b8",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        background: colors.cardBg,
        border: "1px solid " + colors.cardBorder,
        borderRadius: "14px",
        padding: "20px",
        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
      }}
      onMouseOver={function (e) {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
        e.currentTarget.style.background = colors.cardHoverBg;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={function (e) {
        e.currentTarget.style.borderColor = colors.cardBorder;
        e.currentTarget.style.background = colors.cardBg;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <svg
          width="15"
          height="15"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{ flexShrink: 0 }}
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <span style={{ color: colors.name, fontSize: "14px", fontWeight: 600 }}>
          {name}
        </span>
      </div>

      <p
        style={{
          color: colors.desc,
          fontSize: "13px",
          lineHeight: 1.5,
          margin: "0 0 16px",
          minHeight: "38px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {desc || "No description provided"}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {lang && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: colors.meta,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: langColor,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {lang}
          </span>
        )}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: colors.meta,
          }}
        >
          <svg width="12" height="12" fill={colors.meta} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {stars}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: colors.meta,
          }}
        >
          <svg
            width="12"
            height="12"
            fill="none"
            stroke={colors.meta}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
            <path d="M12 12v3" />
          </svg>
          {forks}
        </span>
      </div>
    </a>
  );
}

export default RepoCard;

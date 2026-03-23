function LanguageChart(props) {
  const repos = props.repos;
  const isDark = props.isDark;

  const langCount = {};
  repos.forEach(function (repo) {
    const lang = repo.language;
    if (lang) {
      langCount[lang] = (langCount[lang] || 0) + 1;
    }
  });

  const sorted = Object.entries(langCount)
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(0, 6);

  const total = sorted.reduce(function (sum, item) {
    return sum + item[1];
  }, 0);

  const colors = [
    "#6366f1",
    "#38bdf8",
    "#a78bfa",
    "#34d399",
    "#fb923c",
    "#f472b6",
  ];

  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const labelColor = isDark ? "#e2e8f0" : "#1e293b";
  const percentBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const percentColor = isDark ? "#64748b" : "#94a3b8";

  if (sorted.length === 0) return null;

  return (
    <div style={{ marginTop: "32px" }}>
      <h2
        style={{
          color: isDark ? "#94a3b8" : "#64748b",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          marginBottom: "16px",
        }}
      >
        TOP LANGUAGES
      </h2>

      <div
        style={{
          background: cardBg,
          border: "1px solid " + cardBorder,
          borderRadius: "16px",
          padding: "24px",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "10px",
            borderRadius: "99px",
            overflow: "hidden",
            marginBottom: "24px",
            gap: "2px",
          }}
        >
          {sorted.map(function (item, i) {
            const percent = (item[1] / total) * 100;
            return (
              <div
                key={item[0]}
                title={item[0] + " " + Math.round(percent) + "%"}
                style={{
                  width: percent + "%",
                  background: colors[i],
                  borderRadius: "99px",
                  transition: "width 0.6s ease",
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "14px",
          }}
        >
          {sorted.map(function (item, i) {
            const percent = Math.round((item[1] / total) * 100);
            return (
              <div
                key={item[0]}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: colors[i],
                    flexShrink: 0,
                    boxShadow: "0 0 6px " + colors[i] + "88",
                  }}
                />
                <span
                  style={{
                    color: labelColor,
                    fontSize: "13px",
                    flex: 1,
                    fontWeight: 500,
                  }}
                >
                  {item[0]}
                </span>
                <span
                  style={{
                    color: percentColor,
                    fontSize: "12px",
                    background: percentBg,
                    padding: "1px 7px",
                    borderRadius: "99px",
                  }}
                >
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageChart;

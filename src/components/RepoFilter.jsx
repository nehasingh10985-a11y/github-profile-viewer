function RepoFilter(props) {
  const isDark = props.isDark;
  const selectedLang = props.selectedLang;
  const sortBy = props.sortBy;
  const onLangChange = props.onLangChange;
  const onSortChange = props.onSortChange;
  const languages = props.languages;

  const colors = {
    bg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    label: isDark ? "#64748b" : "#94a3b8",
    selectBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    selectBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    selectText: isDark ? "#f1f5f9" : "#0f172a",
    activeBg: "rgba(99,102,241,0.15)",
    activeBorder: "rgba(99,102,241,0.4)",
    activeText: "#a5b4fc",
    pillBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    pillBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    pillText: isDark ? "#94a3b8" : "#64748b",
  };

  const sortOptions = [
    { value: "stars", label: "Most Stars" },
    { value: "forks", label: "Most Forks" },
    { value: "name", label: "Name A-Z" },
    { value: "updated", label: "Recently Updated" },
  ];

  return (
    <div
      style={{
        background: colors.bg,
        border: "1px solid " + colors.border,
        borderRadius: "14px",
        padding: "16px 20px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      {/* Language filter pills */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        <span
          style={{
            color: colors.label,
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          LANGUAGE
        </span>
        <button
          onClick={function () {
            onLangChange("all");
          }}
          style={{
            padding: "4px 12px",
            borderRadius: "99px",
            fontSize: "12px",
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "all 0.2s",
            border:
              selectedLang === "all"
                ? "1px solid " + colors.activeBorder
                : "1px solid " + colors.pillBorder,
            background:
              selectedLang === "all" ? colors.activeBg : colors.pillBg,
            color: selectedLang === "all" ? colors.activeText : colors.pillText,
            fontWeight: selectedLang === "all" ? 600 : 400,
          }}
        >
          All
        </button>
        {languages.map(function (lang) {
          const isActive = selectedLang === lang;
          return (
            <button
              key={lang}
              onClick={function () {
                onLangChange(lang);
              }}
              style={{
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "12px",
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.2s",
                border: isActive
                  ? "1px solid " + colors.activeBorder
                  : "1px solid " + colors.pillBorder,
                background: isActive ? colors.activeBg : colors.pillBg,
                color: isActive ? colors.activeText : colors.pillText,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {lang}
            </button>
          );
        })}
      </div>

      {/* Sort dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            color: colors.label,
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          SORT
        </span>
        <select
          value={sortBy}
          onChange={function (e) {
            onSortChange(e.target.value);
          }}
          style={{
            background: colors.selectBg,
            border: "1px solid " + colors.selectBorder,
            borderRadius: "8px",
            padding: "6px 10px",
            color: colors.selectText,
            fontSize: "13px",
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        >
          {sortOptions.map(function (opt) {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default RepoFilter;

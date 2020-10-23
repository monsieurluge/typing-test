let themeColors = {
  bg: "#282625",
  main: "#e15030",
  caret: "#e15030",
  sub: "#b3ab9d",
  text: "#e4dbcd",
  error: "#ca4754",
  errorExtra: "#7e2a33",
  colorfulError: "#ca4754",
  colorfulErrorExtra: "#7e2a33",
};

function refreshThemeColorObject() {
  let computedStyle = getComputedStyle(document.body);

  themeColors.bg = computedStyle.getPropertyValue("--bg-color").replace(" ", "");
  themeColors.main = computedStyle.getPropertyValue("--accent-color").replace(" ", "");
  themeColors.caret = computedStyle.getPropertyValue("--accent-color").replace(" ", "");
  themeColors.sub = computedStyle.getPropertyValue("--sub-color").replace(" ", "");
  themeColors.text = computedStyle.getPropertyValue("--text-color").replace(" ", "");
  themeColors.error = computedStyle.getPropertyValue("--error-color").replace(" ", "");
  themeColors.errorExtra = computedStyle.getPropertyValue("--error-extra-color").replace(" ", "");
}

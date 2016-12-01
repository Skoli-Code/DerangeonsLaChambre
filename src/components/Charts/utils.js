export const objectStyle = (sel, styles) => {
  for (const k in styles) {
    sel.style(k, styles[k]);
  }
  return sel;
}

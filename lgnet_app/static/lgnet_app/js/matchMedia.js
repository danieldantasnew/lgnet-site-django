export default function addMatchMedia(width) {
  const match = window.matchMedia(`(${width})`).matches;
  return match;
}

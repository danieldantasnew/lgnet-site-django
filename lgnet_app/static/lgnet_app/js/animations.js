export default function animations() {
  const sections = document.querySelectorAll("[data-animation]");
  sections.forEach((section) => section.style.opacity = "0");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const {animation} = entry.target.dataset;
            entry.target.classList.add(`animate-${animation}`);
            entry.target.style.opacity = "1"

          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  sections.forEach((s) => observer.observe(s));
}

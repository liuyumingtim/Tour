(function () {
  if (!document.body.classList.contains('yo-notes')) return;
  const nav = document.querySelector('.nav');
  const buttons = Array.from(document.querySelectorAll('.nav-btn'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  window.scrollGuideSection = function (id) {
    const section = document.getElementById(id);
    if (!section) return;
    requestAnimationFrame(function () {
      const offset = (nav ? nav.getBoundingClientRect().height : 0) + 18;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  };

  function syncButtons() {
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    });
  }
  function openLinkedSection() {
    const slug = decodeURIComponent(window.location.hash.slice(1));
    const button = buttons.find(function (item) { return item.dataset.slug === slug; });
    syncButtons();
    if (button) window.scrollGuideSection(button.dataset.target);
  }
  if (nav) nav.addEventListener('click', function () { requestAnimationFrame(syncButtons); });
  window.addEventListener('hashchange', openLinkedSection);
  // Wait for the cover photo's layout before positioning a shared category link.
  if (document.readyState === 'complete') openLinkedSection();
  else window.addEventListener('load', openLinkedSection, { once: true });
  syncButtons();
}());

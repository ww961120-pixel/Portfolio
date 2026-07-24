(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PortfolioApple = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function parseProjectHash(hash) {
    const match = String(hash || '').match(/^#project\/([^/?#]+)$/);
    if (!match) return null;

    try {
      return decodeURIComponent(match[1]);
    } catch (error) {
      if (error instanceof URIError) return null;
      throw error;
    }
  }

  function projectIndexFromHash(projects, hash) {
    const id = parseProjectHash(hash);
    if (!id || !Array.isArray(projects)) return -1;
    return projects.findIndex(project => project.id === id);
  }

  function filterProjects(projects, filter) {
    if (filter === 'all') return [...projects];
    return projects.filter(project => project.portfolioCategory === filter);
  }

  function organizeProjects(projects, featuredIds, filter = 'all') {
    const atlas = filterProjects(Array.isArray(projects) ? projects : [], filter);
    const featuredMap = new Map(atlas.map(project => [project.id, project]));
    const featured = (Array.isArray(featuredIds) ? featuredIds : [])
      .map(id => featuredMap.get(id))
      .filter(Boolean);

    return { featured, atlas };
  }

  function coverPosition(project, portrait) {
    const value = project.coverPosition || {};
    return (portrait ? value.portrait : value.desktop) || value.default || '50% 50%';
  }

  function coverStyle(project, portrait) {
    return {
      position: coverPosition(project, portrait),
      tone: project.coverTone === 'light' ? 'light' : 'dark'
    };
  }

  function preloadNext(projects, activeIndex, count = 2) {
    if (
      !Array.isArray(projects) ||
      projects.length < 2 ||
      !Number.isInteger(activeIndex) ||
      !Number.isFinite(count) ||
      count <= 0 ||
      typeof Image !== 'function'
    ) return [];

    const start = ((activeIndex % projects.length) + projects.length) % projects.length;
    const limit = Math.min(Math.floor(count), projects.length - 1);
    const loaded = [];

    for (let offset = 1; offset < projects.length && loaded.length < limit; offset += 1) {
      const cover = projects[(start + offset) % projects.length]?.cover;
      if (typeof cover !== 'string' || !cover.trim()) continue;

      const image = new Image();
      image.decoding = 'async';
      image.src = cover;
      loaded.push(image);
    }

    return loaded;
  }

  function nextProject(projects, index, delta) {
    const nextIndex = (index + delta + projects.length) % projects.length;
    return projects[nextIndex];
  }

  function activateTheatre({ host, projects, onActive }) {
    if (host._portfolioObserver) host._portfolioObserver.disconnect();

    const slides = Array.from(host.querySelectorAll('.project-slide'));
    let activeIndex = -1;
    const observer = new IntersectionObserver(entries => {
      if (host._portfolioObserver !== observer) return;

      const target = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!target) return;

      const index = slides.indexOf(target.target);
      if (index < 0) return;
      if (index === activeIndex) return;
      activeIndex = index;

      slides.forEach(slide => slide.classList.toggle('is-active', slide === target.target));
      preloadNext(projects, index, 2);
      if (typeof onActive === 'function') onActive(index, projects);
    }, {
      root: host.dataset.observerRoot === 'viewport' ? null : host,
      threshold: [0.55, 0.72]
    });

    slides.forEach(slide => observer.observe(slide));
    host._portfolioObserver = observer;

    return function disconnectTheatre() {
      observer.disconnect();
      if (host._portfolioObserver === observer) host._portfolioObserver = null;
    };
  }

  return {
    parseProjectHash,
    projectIndexFromHash,
    filterProjects,
    organizeProjects,
    coverPosition,
    coverStyle,
    preloadNext,
    nextProject,
    activateTheatre
  };
});

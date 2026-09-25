// Small tap feedback for external links.
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener('click', () => {
    link.classList.add('is-clicked');
    window.setTimeout(() => link.classList.remove('is-clicked'), 140);
  });
});

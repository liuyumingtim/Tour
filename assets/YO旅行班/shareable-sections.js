(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      copied ? resolve() : reject(new Error('copy failed'));
    });
  }

  window.initShareableSections = function (buttons, showSection) {
    const navButtons = Array.from(buttons);
    const shareButton = document.querySelector('.section-share-btn');
    const status = document.querySelector('.section-share-status');

    if (shareButton) shareButton.title = '複製此分類連結';

    function buttonFromHash() {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      return navButtons.find(function (button) {
        return button.dataset.slug === slug;
      });
    }

    function openHashSection() {
      const button = buttonFromHash();
      if (button) showSection(button.dataset.target, button, false);
    }

    openHashSection();
    window.addEventListener('hashchange', openHashSection);

    if (!shareButton) return;
    shareButton.addEventListener('click', function () {
      const activeButton = document.querySelector('.nav-btn.active');
      const slug = activeButton ? activeButton.dataset.slug : 'about';
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${slug}`;

      copyText(url).then(function () {
        status.textContent = '已複製，可以貼到 LINE';
        window.setTimeout(function () { status.textContent = ''; }, 2500);
      }).catch(function () {
        status.textContent = '無法自動複製，請複製網址列';
      });
    });
  };
}());

const bookPage = document.getElementById('book-page');
const formPage = document.getElementById('form-page');
const contactPage = document.getElementById('contact-page');

function showBookPage() {
  formPage.classList.add('hide');
  contactPage.classList.add('hide');
  bookPage.classList.remove('hide');
}

function showFormPage() {
  formPage.classList.remove('hide');
  contactPage.classList.add('hide');
  bookPage.classList.add('hide');
}

function showContactPage() {
  formPage.classList.add('hide');
  contactPage.classList.remove('hide');
  bookPage.classList.add('hide');
}

export default function spaNavigation() {
  window.addEventListener('hashchange', () => {
    const { hash } = window.location;
    if (hash === '#book-page') {
      showBookPage();
    } else if (hash === '#form-page') {
      showFormPage();
    } else if (hash === '#contact-page') {
      showContactPage();
    } else if (hash === '') {
      showBookPage();
    }
  }, false);
}

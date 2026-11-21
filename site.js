const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.mobile-menu-toggle');
const mobileNav = header.querySelector('.desktop-nav').cloneNode(true);
const quoteLink = header.querySelector('.header-cta');

mobileNav.id = 'menu-mobile';
mobileNav.className = 'mobile-nav';
mobileNav.hidden = true;
mobileNav.append(quoteLink.cloneNode(true));
mobileNav.lastElementChild.classList.remove('header-cta');
menuToggle.setAttribute('aria-controls', mobileNav.id);
header.append(mobileNav);

function setMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

menuToggle.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});

const quote = document.querySelector('.contact-form');

quote.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(quote);
  const name = fields.get('name').trim();
  const company = fields.get('company').trim();
  const phone = fields.get('phone').trim();
  const service = fields.get('service');

  const recipient = new URL(quoteLink.href);
  const introduction = recipient.searchParams.get('text');
  const message = [
    introduction,
    '',
    `Nome: ${name}`,
    `Condomínio / Empresa: ${company}`,
    `Telefone / WhatsApp: ${phone}`,
    `Tipo de serviço: ${service}`
  ];
  recipient.searchParams.set('text', message.join('\n'));
  window.open(recipient.href, '_blank', 'noopener,noreferrer');
});

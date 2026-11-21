const quote = document.querySelector('#orcamento');
const service = document.querySelector('#servico');
const phone = quote.elements.telefone;

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
  });
});

phone.addEventListener('input', () => phone.setCustomValidity(''));

quote.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(quote);
  const name = fields.get('nome').trim();
  const company = fields.get('empresa').trim();
  const number = fields.get('telefone').trim();
  const digits = number.replace(/\D/g, '');

  if (!name) {
    quote.elements.nome.value = '';
    quote.elements.nome.reportValidity();
    return;
  }

  if (!/^(?:55)?\d{10,11}$/.test(digits)) {
    phone.setCustomValidity('Informe um número com DDD.');
    phone.reportValidity();
    return;
  }

  const message = [
    'Olá, gostaria de solicitar um orçamento com a Betel Elevadores.',
    '',
    `Nome: ${name}`,
    ...(company ? [`Condomínio ou empresa: ${company}`] : []),
    `WhatsApp: ${number}`,
    `Serviço: ${fields.get('servico')}`
  ];

  const url = new URL(quote.action);
  url.searchParams.set('text', message.join('\n'));
  window.open(url.href, '_blank', 'noopener,noreferrer');
});

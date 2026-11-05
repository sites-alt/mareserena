const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

const today = new Date();
const toLocalDate = date => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
checkin.min = toLocalDate(today);
checkout.min = toLocalDate(new Date(today.getTime() + 86400000));
checkin.addEventListener('change', () => {
  if (!checkin.value) return;
  const nextDay = new Date(`${checkin.value}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  checkout.min = toLocalDate(nextDay);
  if (!checkout.value || checkout.value <= checkin.value) checkout.value = toLocalDate(nextDay);
});

const form = document.getElementById('booking-form');
const toast = document.getElementById('toast');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!checkin.value || !checkout.value || checkout.value <= checkin.value) {
    toast.textContent = 'Selecione datas válidas para sua estadia.';
  } else {
    const guests = document.getElementById('guests').value;
    const format = value => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR');
    toast.textContent = `Consulta demonstrativa: ${format(checkin.value)} a ${format(checkout.value)} · ${guests}. Entre em contato para confirmar.`;
  }
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 5000);
});

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   PANTALLA DE CARGA
   ============================================================ */
(function(){
  const el = document.getElementById('loadScreen');
  function hide(){ el.classList.add('hidden'); }
  window.addEventListener('load', () => setTimeout(hide, 200));
  setTimeout(hide, 700);
})();

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
const panels = document.querySelectorAll('.tab-panel');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });

function armReveal(el) {
  revealObserver.observe(el);
  // Red de seguridad: si el IntersectionObserver no dispara a tiempo, el contenido
  // no puede quedar invisible para siempre — se fuerza visible.
  setTimeout(() => el.classList.add('in'), 1200);
}

function goToTab(tabId) {
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
  const activePanel = document.querySelector('.tab-panel.active');
  if (activePanel) activePanel.querySelectorAll('.reveal').forEach(armReveal);
}
document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); goToTab(el.dataset.tab); });
});
document.querySelectorAll('.tab-panel.active .reveal').forEach(armReveal);

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

/* --------------------------------------------------------------
   CARTA — productos reales: temas más mencionados en las 94
   reseñas de Google (italiana, helados, cannoli, ñoquis, amaretti,
   canelones, ricotta), destacados del Instagram oficial (Tiramisu,
   Crostoli, Cannoli, Pay de limón, Profiterol) y nombres visibles
   en una foto real de la mesa del local (Espresso, Whiskey Espresso,
   Irish Coffee, Caramel Macchiato). Sin precios publicados en
   ningún canal — La Rondine no tiene sitio web propio.
-------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'cafe', label: 'Café & Bebidas' },
  { id: 'dolci', label: 'Postres Italianos' },
  { id: 'pasta', label: 'Pasta & Pizza' },
  { id: 'gelato', label: 'Helados' },
];

const MENU = {
  cafe: {
    items: [
      { n: 'Espresso', d: 'Servido en taza de la casa (Caffè Mauro) — visible en foto real de la mesa.' },
      { n: 'Whiskey Espresso', d: 'Nombre real impreso en los manteles individuales del local.' },
      { n: 'Irish Coffee', d: 'Nombre real impreso en los manteles individuales del local.' },
      { n: 'Caramel Macchiato', d: 'Nombre real impreso en los manteles individuales del local.' },
    ],
    note: 'Nombres reales confirmados en una foto de la mesa del local. Precios sin publicar en ningún canal.'
  },
  dolci: {
    items: [
      { n: 'Tiramisú', d: 'Destacado propio en el Instagram oficial del local.' },
      { n: 'Cannoli', d: 'Mencionado en 5 reseñas reales de Google, con destacado propio en Instagram.' },
      { n: 'Crostoli', d: 'Destacado propio en el Instagram oficial del local.' },
      { n: 'Profiterol', d: 'Destacado propio en el Instagram oficial del local.' },
      { n: 'Pay de limón', d: 'Destacado propio en el Instagram oficial del local.' },
      { n: 'Amaretti', d: 'Mencionado en 3 reseñas reales de Google — se ven servidos en una foto real de la mesa.' },
    ],
    note: 'Productos reales confirmados en Instagram y reseñas de Google. Precios a confirmar con el local.'
  },
  pasta: {
    items: [
      { n: 'Ñoquis', d: 'Mencionado en 4 reseñas reales de Google.' },
      { n: 'Canelones', d: 'Mencionado en 3 reseñas reales de Google.' },
      { n: 'Pizza artesanal', d: 'Visible en publicaciones recientes del Instagram oficial (jun-jul 2026).' },
    ],
    note: 'Platos reales mencionados por clientes. Precios sin publicar en ningún canal.'
  },
  gelato: {
    items: [
      { n: 'Helados artesanales', d: '"Helados" es el segundo tema más mencionado de las 94 reseñas de Google (12 menciones).' },
    ],
    note: 'Real y muy destacado por los clientes — sabores y precios a confirmar con el local.'
  }
};

const tabsEl = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

CATEGORIES.forEach((cat, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.textContent = cat.label;
  tab.dataset.key = cat.id;
  tab.addEventListener('click', () => showMenuTab(cat.id));
  tabsEl.appendChild(tab);

  const data = MENU[cat.id];
  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + cat.id;
  const grid = document.createElement('div');
  grid.className = 'menu-grid';
  const catBlock = document.createElement('div');
  catBlock.className = 'menu-cat';
  const h = document.createElement('h3');
  h.textContent = cat.label;
  catBlock.appendChild(h);
  data.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item';
    row.innerHTML = `<span class="name">${item.n}<span class="desc">${item.d}</span></span><span class="price">Consultar</span>`;
    row.addEventListener('click', () => openModal(cat.label, item));
    catBlock.appendChild(row);
  });
  if (data.note) {
    const note = document.createElement('p');
    note.className = 'ph-note';
    note.style.marginTop = '14px';
    note.textContent = data.note;
    catBlock.appendChild(note);
  }
  grid.appendChild(catBlock);
  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showMenuTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.key === key));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
}

/* --------------------------------------------------------------
   MODAL PRODUCTO
-------------------------------------------------------------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
let currentItem = null;
function openModal(cat, item) {
  currentItem = { ...item, cat };
  document.getElementById('modalCategory').textContent = cat;
  document.getElementById('modalName').textContent = item.n;
  document.getElementById('modalDesc').textContent = item.d;
  document.getElementById('modalPrice').textContent = 'Consultar';
  toggleModal(true);
}
function toggleModal(open) { modalOverlay.classList.toggle('open', open); modalBox.classList.toggle('open', open); }
document.getElementById('modalCloseBtn').addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', () => toggleModal(false));
document.getElementById('modalAddBtn').addEventListener('click', () => {
  if (currentItem) { addToCart(currentItem); toggleModal(false); toggleCart(true); }
});

/* --------------------------------------------------------------
   CARRITO — WhatsApp real confirmado (vía bio de Instagram), el
   checkout invita a pedir directo por ahí.
-------------------------------------------------------------- */
let cart = [];

function addToCart(item) { cart.push({ ...item }); renderCart(); }
function removeFromCart(idx) { cart.splice(idx, 1); renderCart(); }

function renderCart() {
  const linesEl = document.getElementById('cartLines');
  if (cart.length === 0) {
    linesEl.innerHTML = '<p class="cart-empty">Aún no agregas productos. Explora la carta y súmalos aquí.</p>';
  } else {
    linesEl.innerHTML = cart.map((c, i) => `
      <div class="cart-line">
        <div><div class="name">${c.n}</div><div class="price">Consultar precio</div></div>
        <button class="cart-remove" onclick="removeFromCart(${i})">✕</button>
      </div>`).join('');
  }
  document.getElementById('cartTotal').textContent = cart.length ? 'A confirmar' : '$0';
}
function toggleCart(open) { document.getElementById('cartOverlay').classList.toggle('open', open); document.getElementById('cartPanel').classList.toggle('open', open); }
document.getElementById('cartFab').addEventListener('click', () => toggleCart(true));
document.getElementById('cartCloseBtn').addEventListener('click', () => toggleCart(false));
document.getElementById('cartOverlay').addEventListener('click', () => toggleCart(false));
renderCart();

/* --------------------------------------------------------------
   ESTADO ABIERTO / CERRADO — horario real confirmado en Google
   Maps e Instagram el 08-09-2026: lunes a sábado 16:00–21:00,
   domingo cerrado.
-------------------------------------------------------------- */
function getSantiagoNow() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const map = {}; parts.forEach(p => map[p.type] = p.value);
    return { day: map.weekday, hour: parseInt(map.hour) + parseInt(map.minute) / 60 };
  } catch (e) {
    const now = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return { day: days[now.getDay()], hour: now.getHours() + now.getMinutes() / 60 };
  }
}

const now = getSantiagoNow();
const isOpen = now.day !== 'Sun' && now.hour >= 16 && now.hour < 21;
document.getElementById('statusDot').classList.toggle('closed', !isOpen);
document.getElementById('statusText').textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';

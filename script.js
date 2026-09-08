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
   CARTA — carta real completa con precios, transcrita de las fotos
   del menú físico del local (mandadas por el dueño/el usuario el
   08-09-2026). Precio "Simple/Doppio" o "Servirse/Llevar" se muestra
   como rango cuando el producto tiene dos tarifas.
-------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'cafe', label: 'Café & Bebidas' },
  { id: 'dolci', label: 'Dolce' },
  { id: 'salado', label: 'Salado & Pasta' },
  { id: 'pizze', label: 'Pizze' },
  { id: 'gelato', label: 'Helados' },
];

const MENU = {
  cafe: {
    items: [
      { n: 'Espresso', d: 'Carga simple o doble', p: 'Simple $2.270 · Doppio $3.000' },
      { n: 'Espresso Decaffeinando', d: 'Carga simple o doble', p: 'Simple $2.490 · Doppio $3.290' },
      { n: 'Americano', d: 'Carga simple o doble', p: 'Simple $2.600 · Doppio $3.270' },
      { n: 'Capuccino', d: 'Carga simple o doble', p: 'Simple $3.490 · Doppio $3.990' },
      { n: 'Latte', d: 'Vaso de 12oz', p: 'Simple $4.490 · Doppio $4.990' },
      { n: 'Macchiato', d: 'Carga simple o doble', p: 'Simple $3.490 · Doppio $3.990' },
      { n: 'Mocaccino', d: 'Carga simple o doble', p: 'Simple $4.000 · Doppio $4.600' },
      { n: 'Capuccino Vegano', d: 'Con leche de almendras', p: 'Simple $4.590 · Doppio $4.990' },
      { n: 'Latte Vegano', d: 'Con leche de almendras', p: 'Simple $4.890 · Doppio $5.290' },
      { n: 'Affogato', d: 'Helado de vainilla y café espresso', p: 'Simple $4.000 · Doppio $4.600' },
      { n: 'Café Helado', d: 'Café Mauro con leche, helado de vainilla y crema chantilly', p: '$6.290' },
      { n: 'Té Latte Chai', d: 'Té chai con leche', p: '$4.490' },
      { n: 'Chocolate Caliente', d: 'Con marshmallow', p: '$5.590' },
      { n: 'Té e Infusiones', d: 'Consulte por variedades', p: '$2.600' },
      { n: 'Limonada', d: 'Con jengibre y menta', p: '$4.290' },
      { n: 'Jugos Naturales', d: 'Consulte por variedad de sabores', p: '$3.990' },
    ],
    note: 'Cambio a café descafeinado +$1.000 · Leche vegetal +$800. Carta real transcrita del menú físico del local.'
  },
  dolci: {
    items: [
      { n: 'Tiramisù', d: 'Crema mascarpone con galletas savoiardi remojadas en café, espolvoreado en cacao', p: '$4.900' },
      { n: 'Cannoli', d: 'Barquillo frito relleno con ricotta. Extremos a elección: chocolate, pistaccio o fruta', p: '$4.500' },
      { n: 'Crostolli', d: 'Dulce típico del Véneto, de origen veneciano — masa frita delgada espolvoreada con azúcar flor', p: '$4.900' },
      { n: 'Profiterol', d: 'Pasta choux rellena con crema diplomática, bañado en chocolate amargo', p: '$3.800' },
      { n: 'Pie de Limón', d: 'Pasta frola con merengue a la italiana', p: '$4.200' },
      { n: 'Chesscake', d: 'Pasta frola con mermelada de frambuesa de la casa', p: '$4.400' },
      { n: 'Cassatine', d: 'Pasta frola rellena con ricotta — dulce típico de la tradición siciliana', p: '$3.000' },
      { n: 'Torta Ricotta Pera', d: 'Dos discos de bizcocho con avellana y centro de ricotta con pera — tradición de la costa amalfitana', p: '$4.900' },
      { n: 'Amaretti', d: 'Galleta de almendra y clara de huevo, sin harina', p: '$600' },
      { n: 'Maffi Chocolate', d: '', p: '$2.700' },
      { n: 'Galletas de Limón', d: '', p: '$400' },
    ],
    note: 'Consulte por la disponibilidad de los dulces italianos para pedidos en ocasiones especiales.'
  },
  salado: {
    items: [
      { n: 'Toast Jamón Artesanal', d: 'Pan de molde integral con jamón pierna artesanal y mozzarella', p: '$4.600' },
      { n: 'Toast Jamón Serrano', d: 'Pan de molde integral con jamón serrano y mozzarella', p: '$5.500' },
      { n: 'Ciabatta', d: 'Pan ciabatta con jamón pierna, mozzarella, lechuga y tomate', p: '$6.900' },
      { n: 'Club Sándwich', d: 'Pan de molde integral con fritada de huevo, tocino, jamón pierna, mozzarella, tomate y lechuga', p: '$9.900' },
      { n: 'Parmeggiana', d: 'Lasaña de berenjena sin masa, salsa de tomate de la casa y mozzarella', p: 'Servirse $8.500 · Llevar $7.000' },
      { n: 'Cannelloni Ricotta & Espinaca', d: '', p: 'Servirse $8.500 · Llevar $7.000' },
      { n: 'Canelloni Carne', d: '', p: 'Servirse $8.500 · Llevar $7.000' },
    ],
    note: 'Carta real transcrita del menú físico del local (08-09-2026).'
  },
  pizze: {
    items: [
      { n: 'Margarita', d: 'Salsa de tomate de la casa, mozzarella, hojas de albahaca. No puede incluir agregados', p: '$9.900' },
      { n: 'Parmeggiana', d: 'Salsa de tomate de la casa, mozzarella, berenjena grillada y hojuelas de parmesano', p: '$12.700' },
      { n: 'Prosciutto', d: 'Salsa de tomate de la casa, mozzarella y jamón pierna artesanal', p: '$11.900' },
      { n: 'Funghi', d: 'Salsa de tomate de la casa, mozzarella y hongos', p: '$11.900' },
      { n: 'Prosciutto & Funghi', d: 'Salsa de tomate de la casa, mozzarella, hongos y jamón pierna artesanal', p: '$12.900' },
      { n: 'Romana', d: 'Salsa de tomate de la casa, mozzarella, anchoas, alcaparras y aceitunas', p: '$13.700' },
      { n: 'Vegetariana', d: 'Salsa de tomate de la casa, mozzarella, berenjena, zapallo italiano y pimentón grillado', p: '$13.700' },
      { n: 'Tonno & Cipolla', d: 'Salsa de tomate de la casa, mozzarella, atún y cebolla', p: '$12.700' },
      { n: 'Salame', d: 'Salsa de tomate de la casa, mozzarella y salame', p: '$12.700' },
      { n: 'Pepperoni', d: 'Salsa de tomate de la casa, mozzarella y pepperoni', p: '$12.800' },
      { n: 'Capricciosa', d: 'Salsa de tomate de la casa, mozzarella, jamón pierna artesanal y corazón de alcachofa', p: '$15.200' },
      { n: 'Prosciutto Crudo & Tomate Cherry & Rúcula', d: 'Salsa de tomate de la casa, mozzarella, tomate cherry, jamón serrano y rúcula', p: '$15.200' },
    ],
    note: 'Agregados $2.000 · Queso vegano $2.500 · Alcachofas, jamón serrano o anchoas $2.500. Carta real transcrita del menú físico del local.'
  },
  gelato: {
    items: [
      { n: 'Helados Artesanales', d: 'De fruta o de leche — consulte por variedad de sabores disponibles ese día.' },
    ],
    note: '"Helados" es el segundo tema más mencionado en las 94 reseñas de Google del local (12 menciones) — sin precio publicado en el menú físico.'
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
    const nameEl = document.createElement('span');
    nameEl.className = 'name';
    nameEl.textContent = item.n;
    const descEl = document.createElement('span');
    descEl.className = 'desc';
    descEl.textContent = item.d || '';
    nameEl.appendChild(descEl);
    const priceEl = document.createElement('span');
    priceEl.className = 'price';
    priceEl.textContent = item.p || 'Consultar';
    row.appendChild(nameEl);
    row.appendChild(priceEl);
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
  document.getElementById('modalPrice').textContent = item.p || 'Consultar';
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

function firstPrice(p) {
  if (!p) return null;
  const m = p.replace(/\./g, '').match(/\$(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function renderCart() {
  const linesEl = document.getElementById('cartLines');
  linesEl.innerHTML = '';
  if (cart.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Aún no agregas productos. Explora la carta y súmalos aquí.';
    linesEl.appendChild(empty);
  } else {
    cart.forEach((c, i) => {
      const line = document.createElement('div');
      line.className = 'cart-line';
      const info = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = c.n;
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = c.p || 'Consultar precio';
      info.appendChild(name);
      info.appendChild(price);
      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-remove';
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => removeFromCart(i));
      line.appendChild(info);
      line.appendChild(removeBtn);
      linesEl.appendChild(line);
    });
  }
  const total = cart.reduce((sum, c) => {
    const v = firstPrice(c.p);
    return v ? sum + v : sum;
  }, 0);
  const hasUnpriced = cart.some(c => !firstPrice(c.p));
  document.getElementById('cartTotal').textContent = cart.length
    ? '$' + total.toLocaleString('es-CL') + (hasUnpriced ? ' + a confirmar' : '')
    : '$0';
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

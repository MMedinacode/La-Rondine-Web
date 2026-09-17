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
      { n: 'Espresso', d: 'Carga simple o doble', v: [['Simple', 2270], ['Doppio', 3000]] },
      { n: 'Espresso Decaffeinando', d: 'Carga simple o doble', v: [['Simple', 2490], ['Doppio', 3290]] },
      { n: 'Americano', d: 'Carga simple o doble', v: [['Simple', 2600], ['Doppio', 3270]] },
      { n: 'Capuccino', d: 'Carga simple o doble', v: [['Simple', 3490], ['Doppio', 3990]] },
      { n: 'Latte', d: 'Vaso de 12oz', v: [['Simple', 4490], ['Doppio', 4990]] },
      { n: 'Macchiato', d: 'Carga simple o doble', v: [['Simple', 3490], ['Doppio', 3990]] },
      { n: 'Mocaccino', d: 'Carga simple o doble', v: [['Simple', 4000], ['Doppio', 4600]] },
      { n: 'Capuccino Vegano', d: 'Con leche de almendras', v: [['Simple', 4590], ['Doppio', 4990]] },
      { n: 'Latte Vegano', d: 'Con leche de almendras', v: [['Simple', 4890], ['Doppio', 5290]] },
      { n: 'Affogato', d: 'Helado de vainilla y café espresso', v: [['Simple', 4000], ['Doppio', 4600]] },
      { n: 'Café Helado', d: 'Café Mauro con leche, helado de vainilla y crema chantilly', p: 6290 },
      { n: 'Té Latte Chai', d: 'Té chai con leche', p: 4490 },
      { n: 'Chocolate Caliente', d: 'Con marshmallow', p: 5590 },
      { n: 'Té e Infusiones', d: 'Consulte por variedades', p: 2600 },
      { n: 'Limonada', d: 'Con jengibre y menta', p: 4290 },
      { n: 'Jugos Naturales', d: 'Consulte por variedad de sabores', p: 3990 },
    ],
    note: 'Cambio a café descafeinado +$1.000 · Leche vegetal +$800. Carta real transcrita del menú físico del local.'
  },
  dolci: {
    items: [
      { n: 'Tiramisù', d: 'Crema mascarpone con galletas savoiardi remojadas en café, espolvoreado en cacao', p: 4900 },
      { n: 'Cannoli', d: 'Barquillo frito relleno con ricotta. Extremos a elección: chocolate, pistaccio o fruta', p: 4500 },
      { n: 'Crostolli', d: 'Dulce típico del Véneto — masa frita delgada espolvoreada con azúcar flor', p: 4900 },
      { n: 'Profiterol', d: 'Pasta choux rellena con crema diplomática, bañado en chocolate amargo', p: 3800 },
      { n: 'Pie de Limón', d: 'Pasta frola con merengue a la italiana', p: 4200 },
      { n: 'Chesscake', d: 'Pasta frola con mermelada de frambuesa de la casa', p: 4400 },
      { n: 'Cassatine', d: 'Pasta frola rellena con ricotta — dulce típico siciliano', p: 3000 },
      { n: 'Torta Ricotta Pera', d: 'Bizcocho de avellana con centro de ricotta y pera — de la costa amalfitana', p: 4900 },
      { n: 'Amaretti', d: 'Galleta de almendra y clara de huevo, sin harina', p: 600 },
      { n: 'Maffi Chocolate', d: '', p: 2700 },
      { n: 'Galletas de Limón', d: '', p: 400 },
    ],
    note: 'Consulte por la disponibilidad de los dulces italianos para pedidos en ocasiones especiales.'
  },
  salado: {
    items: [
      { n: 'Toast Jamón Artesanal', d: 'Pan de molde integral con jamón pierna artesanal y mozzarella', p: 4600 },
      { n: 'Toast Jamón Serrano', d: 'Pan de molde integral con jamón serrano y mozzarella', p: 5500 },
      { n: 'Ciabatta', d: 'Pan ciabatta con jamón pierna, mozzarella, lechuga y tomate', p: 6900 },
      { n: 'Club Sándwich', d: 'Pan de molde integral con huevo, tocino, jamón pierna, mozzarella, tomate y lechuga', p: 9900 },
      { n: 'Parmeggiana', d: 'Lasaña de berenjena sin masa, salsa de tomate de la casa y mozzarella', v: [['Para servirse', 8500], ['Para llevar', 7000]] },
      { n: 'Cannelloni Ricotta & Espinaca', d: '', v: [['Para servirse', 8500], ['Para llevar', 7000]] },
      { n: 'Canelloni Carne', d: '', v: [['Para servirse', 8500], ['Para llevar', 7000]] },
    ],
    note: 'Carta real transcrita del menú físico del local (08-09-2026).'
  },
  pizze: {
    items: [
      { n: 'Margarita', d: 'Salsa de tomate de la casa, mozzarella y albahaca. No admite agregados', p: 9900 },
      { n: 'Parmeggiana', d: 'Mozzarella, berenjena grillada y hojuelas de parmesano', p: 12700 },
      { n: 'Prosciutto', d: 'Mozzarella y jamón pierna artesanal', p: 11900 },
      { n: 'Funghi', d: 'Mozzarella y hongos', p: 11900 },
      { n: 'Prosciutto & Funghi', d: 'Mozzarella, hongos y jamón pierna artesanal', p: 12900 },
      { n: 'Romana', d: 'Mozzarella, anchoas, alcaparras y aceitunas', p: 13700 },
      { n: 'Vegetariana', d: 'Mozzarella, berenjena, zapallo italiano y pimentón grillado', p: 13700 },
      { n: 'Tonno & Cipolla', d: 'Mozzarella, atún y cebolla', p: 12700 },
      { n: 'Salame', d: 'Mozzarella y salame', p: 12700 },
      { n: 'Pepperoni', d: 'Mozzarella y pepperoni', p: 12800 },
      { n: 'Capricciosa', d: 'Mozzarella, jamón pierna artesanal y corazón de alcachofa', p: 15200 },
      { n: 'Prosciutto Crudo, Cherry & Rúcula', d: 'Mozzarella, tomate cherry, jamón serrano y rúcula', p: 15200 },
    ],
    note: 'Todas llevan salsa de tomate de la casa. Agregados $2.000 · Queso vegano $2.500 · Alcachofas, jamón serrano o anchoas $2.500.'
  },
  gelato: {
    items: [
      { n: 'Helados Artesanales', d: 'De fruta o de leche — consulte por los sabores del día.' },
    ],
    note: '«Helados» es el segundo tema más mencionado en sus 94 reseñas de Google (12 menciones), y no tiene precio en el menú físico.'
  }
};

/* Formatea 2270 -> "$2.270" */
function fmt(n) { return '$' + n.toLocaleString('es-CL'); }

/* Lo que se muestra en la fila de la carta. Con variantes va "desde",
   porque poner los dos precios obliga a dos lineas y descuadra la grilla:
   las dos opciones se eligen al abrir el producto. */
function precioFila(item) {
  if (item.v && item.v.length) return 'desde ' + fmt(item.v[0][1]);
  if (typeof item.p === 'number') return fmt(item.p);
  return 'Consultar';
}

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

  const catBlock = document.createElement('div');
  catBlock.className = 'menu-cat';
  const h = document.createElement('h3');
  h.textContent = cat.label;
  catBlock.appendChild(h);

  /* Las filas van dentro de su propia rejilla: dos columnas en pantalla
     grande, una sola en telefono. Antes colgaban sueltas del bloque y
     quedaba una columna larguisima. */
  const lista = document.createElement('div');
  lista.className = 'menu-items';

  data.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item';

    /* carta-fotos.js inserta su miniatura como primer hijo, asi que la
       fila es una rejilla de tres columnas: foto | texto | precio. Con
       medidas fijas, el precio de TODAS las filas cae en la misma
       vertical, se llame el producto "Latte" o "Espresso Decaffeinando". */
    const txt = document.createElement('span');
    txt.className = 'name';
    txt.textContent = item.n;
    if (item.d) {
      const descEl = document.createElement('span');
      descEl.className = 'desc';
      descEl.textContent = item.d;
      txt.appendChild(descEl);
    }

    const priceEl = document.createElement('span');
    priceEl.className = 'price';
    priceEl.textContent = precioFila(item);
    if (item.v) priceEl.classList.add('price-desde');

    row.appendChild(txt);
    row.appendChild(priceEl);
    row.addEventListener('click', () => openModal(cat.label, item));
    lista.appendChild(row);
  });

  catBlock.appendChild(lista);

  if (data.note) {
    const note = document.createElement('p');
    note.className = 'ph-note';
    note.style.marginTop = '14px';
    note.textContent = data.note;
    catBlock.appendChild(note);
  }
  panel.appendChild(catBlock);
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
let currentVar = null;
let currentItem = null;
function openModal(cat, item) {
  currentItem = { ...item, cat };
  currentVar = null;
  document.getElementById('modalCategory').textContent = cat;
  document.getElementById('modalName').textContent = item.n;
  document.getElementById('modalDesc').textContent = item.d || '';

  /* ⚠️ ACA ESTABA EL BUG. Productos como el espresso traian los dos
     precios metidos en un solo texto ("Simple $2.270 · Doppio $3.000"),
     asi que no habia nada que elegir y el carrito siempre cobraba el
     primero. Ahora cada variante es un boton de verdad. */
  const cont = document.getElementById('modalVariantes');
  cont.innerHTML = '';
  if (item.v && item.v.length) {
    cont.hidden = false;
    item.v.forEach((v, idx) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'var-btn' + (idx === 0 ? ' on' : '');
      b.innerHTML = '<span>' + v[0] + '</span><b>' + fmt(v[1]) + '</b>';
      b.addEventListener('click', () => {
        cont.querySelectorAll('.var-btn').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        currentVar = v;
        document.getElementById('modalPrice').textContent = fmt(v[1]);
      });
      cont.appendChild(b);
    });
    currentVar = item.v[0];
    document.getElementById('modalPrice').textContent = fmt(item.v[0][1]);
  } else {
    cont.hidden = true;
    document.getElementById('modalPrice').textContent =
      typeof item.p === 'number' ? fmt(item.p) : 'Consultar';
  }
  toggleModal(true);
}

function toggleModal(open) { modalOverlay.classList.toggle('open', open); modalBox.classList.toggle('open', open); }
document.getElementById('modalCloseBtn').addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', () => toggleModal(false));
document.getElementById('modalAddBtn').addEventListener('click', () => {
  if (currentItem) {
    const elegido = currentVar
      ? { ...currentItem, n: currentItem.n + ' (' + currentVar[0] + ')', precio: currentVar[1] }
      : { ...currentItem, precio: typeof currentItem.p === 'number' ? currentItem.p : null };
    addToCart(elegido); toggleModal(false); toggleCart(true);
  }
});

/* --------------------------------------------------------------
   CARRITO — WhatsApp real confirmado (vía bio de Instagram), el
   checkout invita a pedir directo por ahí.
-------------------------------------------------------------- */
let cart = [];

function addToCart(item) { cart.push({ ...item }); renderCart(); }
function removeFromCart(idx) { cart.splice(idx, 1); renderCart(); }

/* Antes esto leia el primer $ que encontrara dentro del texto del precio,
   asi que en un producto con dos valores SIEMPRE cobraba el mas barato.
   Ahora cada linea del carrito llega con su precio ya resuelto. */
function firstPrice(item) {
  return (item && typeof item.precio === 'number') ? item.precio : null;
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
      price.textContent = typeof c.precio === 'number' ? fmt(c.precio) : 'Consultar precio';
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

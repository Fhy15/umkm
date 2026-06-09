const menus = [
  {name:'Bakso Slurp Original', cat:'bakso', emoji:'🍲', tag:'Bakso', price:'Rp15K', level:'Gurih', time:'5 menit', desc:'Bakso sapi empuk dengan kuah kaldu hangat, sawi segar, bawang goreng, dan sambal khas Soyam yang aromanya langsung naik saat disiram.'},
  {name:'Bakso Lava Mercon', cat:'bakso', emoji:'🌶️', tag:'Pedas', price:'Rp18K', level:'Pedas++', time:'6 menit', desc:'Bakso isi cabai dengan sensasi meledak di tengah. Cocok untuk pemburu rasa pedas yang tetap ingin kuahnya gurih dan bersih.'},
  {name:'Mie Ayam Slurp Classic', cat:'mie', emoji:'🍜', tag:'Mie Ayam', price:'Rp14K', level:'Manis Gurih', time:'5 menit', desc:'Mie kenyal dengan ayam kecap gurih, sawi, daun bawang, dan minyak bawang harum. Rasa klasik yang aman untuk semua umur.'},
  {name:'Mie Ayam Bakso Komplit', cat:'mie', emoji:'🥢', tag:'Favorit', price:'Rp20K', level:'Komplit', time:'7 menit', desc:'Paket paling ramai: mie ayam, bakso, pangsit, kuah kaldu, dan topping ayam yang lebih royal. Satu mangkuk terasa penuh.'},
  {name:'Pangsit Kuah Hangat', cat:'bakso', emoji:'🥟', tag:'Side Menu', price:'Rp12K', level:'Ringan', time:'4 menit', desc:'Pangsit lembut dalam kuah kaldu hangat. Cocok sebagai teman makan mie ayam atau pilihan ringan saat ingin kuah-kuah.'},
  {name:'Es Teh Jeruk Segar', cat:'minum', emoji:'🍹', tag:'Minuman', price:'Rp7K', level:'Segar', time:'2 menit', desc:'Teh dingin dengan sentuhan jeruk yang menyegarkan. Penyeimbang terbaik setelah makan bakso mercon atau mie ayam komplit.'}
];

const grid = document.getElementById('menuGrid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
const closeModal = document.getElementById('closeModal');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function renderMenus(filter = 'all') {
  grid.innerHTML = '';
  menus.filter(item => filter === 'all' || item.cat === filter).forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-art">
        <div class="menu-emoji">${item.emoji}</div>
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between gap-3">
          <span class="tag">${item.tag}</span>
          <span class="font-black text-soyam-broth">${item.price}</span>
        </div>
        <h3 class="mt-4 text-2xl font-black tracking-tight">${item.name}</h3>
        <p class="mt-2 text-sm text-black/60 leading-relaxed line-clamp-2">${item.desc}</p>
        <button class="detail-btn mt-5" data-index="${index}">Lihat Detail Rasa</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openDetail(item) {
  modalImage.innerHTML = `<div class="absolute inset-0 bg-[linear-gradient(135deg,#fff3d8,#f8c94a,#d87422)]"></div><div class="absolute inset-0 grid place-items-center text-8xl">${item.emoji}</div><div class="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[120%] h-32 rounded-[50%] bg-soyam-broth/60"></div>`;
  modalTag.textContent = item.tag;
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc;
  modalMeta.innerHTML = `
    <div class="meta-box"><b>${item.price}</b><span>Estimasi harga</span></div>
    <div class="meta-box"><b>${item.level}</b><span>Karakter rasa</span></div>
    <div class="meta-box"><b>${item.time}</b><span>Penyajian</span></div>
  `;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

renderMenus();

document.getElementById('filterBtns').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenus(btn.dataset.filter);
});

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.detail-btn');
  if (!btn) return;
  openDetail(menus[Number(btn.dataset.index)]);
});

closeModal.addEventListener('click', closeDetail);
modal.addEventListener('click', (e) => { if (e.target === modal) closeDetail(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

function closeDetail() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('#mobileMenu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

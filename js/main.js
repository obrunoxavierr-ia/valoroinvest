if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const counters = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
  const target   = parseInt(el.dataset.target);
  const prefix   = el.dataset.prefix  || '';
  const suffix   = el.dataset.suffix  || '';
  const thousands = el.dataset.thousands === 'true';
  const duration = 2000;
  const start    = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const value    = Math.floor(ease * target);
    const formatted = thousands ? value.toLocaleString('pt-BR') : value;
    el.textContent  = prefix + formatted + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + (thousands ? target.toLocaleString('pt-BR') : target) + suffix;
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

/* ── RODA DE SOLUÇÕES ── */
const solutions = [
  { label: 'Investimento Nacional',
    desc: 'Acesso criterioso às melhores oportunidades do mercado financeiro brasileiro, com análise fundamentada, diversificação estratégica e gestão ativa voltada à preservação e ao crescimento patrimonial.',
    bullets: ['Renda fixa, variável e fundos de investimento','Alocação personalizada conforme perfil e horizonte','Monitoramento contínuo e rebalanceamento periódico','Relatórios de desempenho e transparência total'] },
  { label: 'Investimento Internacional',
    desc: 'Diversificação global com acesso a ativos internacionais de alta qualidade, protegendo e expandindo seu patrimônio além das fronteiras brasileiras.',
    bullets: ['Acesso a bolsas e ativos internacionais','Proteção cambial e diversificação geográfica','Ativos em dólar, euro e outras moedas','Gestão integrada com a carteira local'] },
  { label: 'Planejamento Financeiro',
    desc: 'Estruturação completa das suas finanças com metas claras, controle de fluxo de caixa e estratégias personalizadas para a realização dos seus objetivos de vida.',
    bullets: ['Diagnóstico financeiro completo','Definição de metas de curto, médio e longo prazo','Controle orçamentário e fluxo de caixa','Acompanhamento e ajustes periódicos'] },
  { label: 'Câmbio Pessoa Física',
    desc: 'Remessas internacionais e operações de câmbio para pessoas físicas com taxas competitivas, agilidade e atendimento personalizado.',
    bullets: ['Remessas para o exterior e recebimentos','Câmbio para viagens e estudos internacionais','Taxas competitivas e spread reduzido','Atendimento dedicado'] },
  { label: 'Câmbio Pessoa Jurídica',
    desc: 'Soluções cambiais completas para empresas que operam no comércio exterior, com hedge cambial e estruturação de contratos internacionais.',
    bullets: ['Operações de importação e exportação','Hedge cambial para proteção de fluxo','Contratos a termo e opções de câmbio','Consultoria em gestão de risco cambial'] },
  { label: 'Financiamento Imobiliário',
    desc: 'Crédito estruturado para aquisição de imóveis residenciais e comerciais, com as melhores condições do mercado e assessoria completa em todo o processo.',
    bullets: ['Financiamento residencial e comercial','Portabilidade de crédito imobiliário','Comparativo entre instituições financeiras','Acompanhamento de todo o processo'] },
  { label: 'Crédito Empresarial',
    desc: 'Linhas de crédito personalizadas para capital de giro, expansão e investimentos empresariais, estruturadas conforme o perfil e necessidade de cada empresa.',
    bullets: ['Capital de giro e antecipação de recebíveis','Crédito para expansão e investimentos','Estruturação de dívida corporativa','Negociação com múltiplas instituições'] },
  { label: 'Abertura de Offshore',
    desc: 'Estruturação jurídica e financeira para investimentos no exterior através de empresas offshore, com conformidade legal e eficiência tributária.',
    bullets: ['Abertura em jurisdições internacionais','Planejamento tributário internacional','Gestão de ativos no exterior','Compliance e regularização junto ao Banco Central'] },
  { label: 'Cartão de Crédito',
    desc: 'Acesso aos melhores cartões premium do mercado, com benefícios exclusivos, programas de milhas e serviços diferenciados para o seu perfil.',
    bullets: ['Cartões de alto padrão e benefícios premium','Maximização de milhas e pontos','Acesso a salas VIP e seguros de viagem','Assessoria na escolha do melhor cartão'] },
  { label: 'Seguros e Gestão de Risco',
    desc: 'Proteção patrimonial completa com soluções de seguros personalizadas, garantindo a segurança do seu patrimônio e da sua família em diferentes cenários.',
    bullets: ['Seguro de vida e previdência','Seguros patrimoniais e empresariais','D&O e responsabilidade civil','Análise e gestão integrada de riscos'] },
  { label: 'Sucessão Patrimonial',
    desc: 'Planejamento e estruturação da transferência de patrimônio para as próximas gerações, com eficiência tributária e preservação dos valores familiares.',
    bullets: ['Estruturação de holding familiar','Planejamento sucessório e testamento','Redução de carga tributária na transferência','Governança familiar e perpetuação do legado'] },
  { label: 'Planejamento Previdenciário',
    desc: 'Estratégias personalizadas para aposentadoria com segurança e tranquilidade, construindo uma renda complementar consistente ao longo do tempo.',
    bullets: ['PGBL e VGBL com gestão ativa','Análise de benefício fiscal','Comparativo entre planos e gestoras','Revisão e portabilidade de previdência existente'] },
];

function buildWheel() {
  const svg = document.getElementById('wheelSvg');
  const guideRing = document.getElementById('guideRing');
  const cx = 290, cy = 290;
  const ri = 92, ro = 200;
  const labelR = 228;
  const n = solutions.length;
  const gap = 2.5;
  const toRad = d => d * Math.PI / 180;
  const px = (r, d) => +(cx + r * Math.cos(toRad(d))).toFixed(2);
  const py = (r, d) => +(cy + r * Math.sin(toRad(d))).toFixed(2);
  const lh = 13.5;

  solutions.forEach((sol, i) => {
    const a1 = i * (360 / n) - 90 + gap / 2;
    const a2 = (i + 1) * (360 / n) - 90 - gap / 2;
    const am = i * (360 / n) - 90 + (360 / n) / 2;

    const pathD = [
      `M ${px(ri, a1)} ${py(ri, a1)}`,
      `L ${px(ro, a1)} ${py(ro, a1)}`,
      `A ${ro} ${ro} 0 0 1 ${px(ro, a2)} ${py(ro, a2)}`,
      `L ${px(ri, a2)} ${py(ri, a2)}`,
      `A ${ri} ${ri} 0 0 0 ${px(ri, a1)} ${py(ri, a1)}`,
      'Z'
    ].join(' ');

    const seg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    seg.setAttribute('d', pathD);
    seg.classList.add('wheel-seg');
    if (i === 0) seg.classList.add('active');
    seg.addEventListener('click', () => activateSolution(i));
    svg.insertBefore(seg, guideRing);

    const lx = px(labelR, am);
    const ly = py(labelR, am);
    const cosA = Math.cos(toRad(am));
    const anchor = cosA > 0.25 ? 'start' : cosA < -0.25 ? 'end' : 'middle';

    const words = sol.label.split(' ');
    let line1 = '', line2 = '';
    for (let j = 0; j < words.length; j++) {
      const cand = line1 ? line1 + ' ' + words[j] : words[j];
      if (cand.length <= 13 || line1 === '') { line1 = cand; }
      else { line2 = words.slice(j).join(' '); break; }
    }
    const lines = line2 ? [line1, line2] : [line1];
    const blockH = lines.length * lh;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('text-anchor', anchor);
    text.classList.add('wheel-label');
    if (i === 0) text.classList.add('active');
    text.addEventListener('click', () => activateSolution(i));

    lines.forEach((lineText, li) => {
      const ts = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      ts.setAttribute('x', lx);
      ts.setAttribute('y', +(ly - blockH / 2 + lh / 2 + li * lh).toFixed(2));
      ts.textContent = lineText;
      text.appendChild(ts);
    });

    svg.appendChild(text);
  });
}

function activateSolution(index) {
  const sol = solutions[index];
  const panel = document.getElementById('solPanel');
  panel.style.opacity = '0';
  setTimeout(() => {
    document.getElementById('panelCounter').textContent =
      String(index + 1).padStart(2, '0') + ' / ' + solutions.length;
    document.getElementById('panelTitle').textContent = sol.label;
    document.getElementById('panelDesc').textContent = sol.desc;
    const ul = document.getElementById('panelBullets');
    ul.textContent = '';
    sol.bullets.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      ul.appendChild(li);
    });
    panel.style.opacity = '1';
  }, 220);
  document.querySelectorAll('.wheel-seg').forEach((s, i) => s.classList.toggle('active', i === index));
  document.querySelectorAll('.wheel-label').forEach((l, i) => l.classList.toggle('active', i === index));
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', () => window.scrollTo(0, 0));


buildWheel();
activateSolution(0);

document.querySelectorAll('.legal-modal-close, .legal-modal-backdrop').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.legal-modal').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.legal-modal').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

/* ── MOBILE NAV ── */
(function () {
  var hamburger = document.getElementById('navHamburger');
  var overlay   = document.getElementById('navOverlay');
  var nav       = document.querySelector('nav');
  if (!hamburger || !overlay || !nav) return;

  function closeMenu() {
    nav.classList.remove('nav-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var opening = !nav.classList.contains('nav-open');
    if (opening) {
      nav.classList.add('nav-open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* Dropdown de calculadoras — clicável no mobile */
  var dropdownToggle = nav.querySelector('.nav-dropdown-toggle');
  var dropdown       = nav.querySelector('.nav-dropdown');
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('dropdown-open');
    });
  }
})();

/* ── SOLUÇÕES MOBILE ACORDEÃO ── */
(function () {
  var container = document.getElementById('solMobileList');
  if (!container) return;

  solutions.forEach(function (sol) {
    var item = document.createElement('div');
    item.className = 'sol-mobile-item';
    item.innerHTML =
      '<button class="sol-mobile-toggle">' +
        '<span>' + sol.label + '</span>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</button>' +
      '<div class="sol-mobile-body">' +
        '<p>' + sol.desc + '</p>' +
        '<ul>' + sol.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>' +
        '<a href="contato.html" class="sol-mobile-cta">Falar com um especialista</a>' +
      '</div>';

    item.querySelector('.sol-mobile-toggle').addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      container.querySelectorAll('.sol-mobile-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });

    container.appendChild(item);
  });
})();

/* ── MISSÃO CAROUSEL (mobile) ── */
(function () {
  var grid = document.getElementById('missaoGrid');
  var prev = document.getElementById('missaoPrev');
  var next = document.getElementById('missaoNext');
  if (!grid || !prev || !next) return;
  var cards = Array.from(grid.querySelectorAll('.missao-card'));
  var current = 0;
  function goToCard(idx) {
    current = Math.max(0, Math.min(idx, cards.length - 1));
    var card = cards[current];
    var offset = card.offsetLeft - (grid.offsetWidth - card.offsetWidth) / 2;
    grid.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
  }
  prev.addEventListener('click', function () { goToCard(current - 1); });
  next.addEventListener('click', function () { goToCard(current + 1); });
  grid.addEventListener('scroll', function () {
    var center = grid.scrollLeft + grid.offsetWidth / 2;
    cards.forEach(function (card, i) {
      if (card.offsetLeft <= center && card.offsetLeft + card.offsetWidth > center) current = i;
    });
  });
})();

/* ── FAQ acordeão ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

(function () {
  const KEY = 'valoro_cookie_consent';
  if (localStorage.getItem(KEY)) return;

  const style = document.createElement('style');
  style.textContent = [
    '#cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;',
    'background:#0d1f3c;color:#e8edf5;padding:1rem 1.5rem;',
    'display:flex;align-items:center;justify-content:space-between;',
    'gap:1rem;flex-wrap:wrap;box-shadow:0 -2px 12px rgba(0,0,0,.4);',
    'border-top:2px solid #c9a227;font-family:Inter,sans-serif;font-size:.875rem;}',
    '#cookie-banner p{margin:0;flex:1;min-width:200px;line-height:1.5;}',
    '#cookie-banner a{color:#c9a227;text-decoration:underline;}',
    '#cookie-banner .cb-actions{display:flex;gap:.75rem;flex-shrink:0;}',
    '#cookie-banner button{padding:.5rem 1.25rem;border:none;border-radius:4px;',
    'font-size:.875rem;font-family:Inter,sans-serif;cursor:pointer;font-weight:600;}',
    '#cookie-accept{background:#c9a227;color:#0d1f3c;}',
    '#cookie-reject{background:transparent;color:#e8edf5;border:1px solid #e8edf5!important;}',
    '#cookie-banner.hiding{transition:transform .4s ease,opacity .4s ease;',
    'transform:translateY(100%);opacity:0;}'
  ].join('');
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Consentimento de cookies');

  const msg = document.createElement('p');
  msg.textContent = 'Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa ';
  const link = document.createElement('a');
  link.href = 'privacidade.html';
  link.textContent = 'Política de Privacidade';
  msg.appendChild(link);
  msg.appendChild(document.createTextNode('.'));

  const actions = document.createElement('div');
  actions.className = 'cb-actions';

  const btnAccept = document.createElement('button');
  btnAccept.id = 'cookie-accept';
  btnAccept.textContent = 'Aceitar';

  const btnReject = document.createElement('button');
  btnReject.id = 'cookie-reject';
  btnReject.textContent = 'Recusar';

  actions.appendChild(btnAccept);
  actions.appendChild(btnReject);
  banner.appendChild(msg);
  banner.appendChild(actions);
  document.body.appendChild(banner);

  function dismiss(value) {
    localStorage.setItem(KEY, value);
    localStorage.setItem('valoro_cookie_consent_ts', new Date().toISOString());
    banner.classList.add('hiding');
    setTimeout(function () { banner.remove(); }, 400);
  }

  btnAccept.addEventListener('click', function () { dismiss('accepted'); });
  btnReject.addEventListener('click', function () { dismiss('rejected'); });
})();

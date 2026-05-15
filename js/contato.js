if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyiwK7ZY-DZEg8xDcvXQpKsKJcH8kKSn64RUtskbjYQW66oyXuNPknDJzZafKe-7IOm/exec';
const RECAPTCHA_SITE_KEY = '6LcCregsAAAAAALDuQ62N5zcGJCfjP3w4c4yZdo8';

const codigoPaisEl = document.getElementById('codigoPais');
const telefoneEl   = document.getElementById('telefone');

/* ── Exibe só o código (+XX) após seleção, nome completo no dropdown ── */
(function () {
  var sel = codigoPaisEl;
  if (!sel) return;
  Array.from(sel.options).forEach(function (opt) {
    opt.dataset.fullLabel = opt.text;
  });
  function collapse() {
    var chosen = sel.options[sel.selectedIndex];
    Array.from(sel.options).forEach(function (opt) {
      if (opt.dataset.fullLabel) opt.text = opt.dataset.fullLabel;
    });
    if (chosen && chosen.value) chosen.text = chosen.value;
  }
  function expand() {
    Array.from(sel.options).forEach(function (opt) {
      if (opt.dataset.fullLabel) opt.text = opt.dataset.fullLabel;
    });
  }
  sel.addEventListener('mousedown', expand);
  sel.addEventListener('touchstart', expand, { passive: true });
  sel.addEventListener('change', function () { setTimeout(collapse, 0); });
  sel.addEventListener('blur', collapse);
  collapse();
})();

function aplicarMascara() {
  let v = telefoneEl.value.replace(/\D/g, '');
  const cod = codigoPaisEl.value;
  if (cod === '+55') {
    v = v.slice(0, 11);
    if (v.length > 10)     v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d+)$/, '($1) $2');
    else if (v.length > 0) v = '(' + v;
  } else if (cod === '+1') {
    v = v.slice(0, 10);
    if (v.length > 6)      v = v.replace(/^(\d{3})(\d{3})(\d+)$/, '($1) $2-$3');
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d+)$/, '($1) $2');
  } else {
    v = v.slice(0, 15);
  }
  telefoneEl.value = v;
}

codigoPaisEl.addEventListener('change', function () {
  telefoneEl.value = '';
  telefoneEl.placeholder = this.value === '+55' ? '(00) 00000-0000'
                         : this.value === '+1'  ? '(000) 000-0000'
                         : 'Número de telefone';
});

telefoneEl.addEventListener('input', aplicarMascara);

function setError(inputId, errId, show) {
  document.getElementById(inputId).classList.toggle('error', show);
  document.getElementById(errId).classList.toggle('visible', show);
}

function validate() {
  const nome       = document.getElementById('nome').value.trim();
  const email      = document.getElementById('email').value.trim();
  const telefone   = telefoneEl.value.trim();
  const patrimonio = document.getElementById('patrimonio').value;
  const concordo   = document.getElementById('concordo').checked;
  let ok = true;

  if (nome.length < 2)                                  { setError('nome', 'nomeError', true);           ok = false; } else { setError('nome', 'nomeError', false); }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))       { setError('email', 'emailError', true);         ok = false; } else { setError('email', 'emailError', false); }
  if (telefone.replace(/\D/g,'').length < 6)            { setError('telefone', 'telefoneError', true);   ok = false; } else { setError('telefone', 'telefoneError', false); }
  if (!patrimonio)                                       { setError('patrimonio', 'patrimonioError', true); ok = false; } else { setError('patrimonio', 'patrimonioError', false); }

  const concordoErr = document.getElementById('concordoError');
  if (!concordo) { concordoErr.classList.add('visible'); ok = false; } else { concordoErr.classList.remove('visible'); }

  return ok;
}

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  document.getElementById('errorBanner').classList.remove('visible');
  if (!validate()) return;

  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const spinner = document.getElementById('spinner');

  btn.disabled          = true;
  btnText.textContent   = 'Enviando...';
  btnIcon.style.display = 'none';
  spinner.style.display = 'block';

  try {
    await new Promise(resolve => grecaptcha.ready(resolve));
    const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });

    const payload = new URLSearchParams({
      recaptcha_token: recaptchaToken,
      _hp:        document.getElementById('_hp').value,
      nome:       document.getElementById('nome').value.trim(),
      email:      document.getElementById('email').value.trim(),
      telefone:   codigoPaisEl.value + ' ' + telefoneEl.value.trim(),
      patrimonio: document.getElementById('patrimonio').value,
      mensagem:   document.getElementById('mensagem').value.trim(),
    });

    await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: payload });
    document.getElementById('formState').style.display        = 'none';
    document.getElementById('successState').style.display     = 'flex';
    document.getElementById('successState').style.flexDirection = 'column';
    document.getElementById('successState').style.alignItems  = 'center';
  } catch (err) {
    btn.disabled          = false;
    btnText.textContent   = 'Enviar mensagem';
    btnIcon.style.display = '';
    spinner.style.display = 'none';
    document.getElementById('errorBanner').classList.add('visible');
  }
});

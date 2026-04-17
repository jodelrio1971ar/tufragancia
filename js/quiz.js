// ============================================
// QUIZ JS — Aromas & Sentimientos
// ============================================

const FRAGANCIAS_DATA = [
  { id:1, nombre:'Magnolia', perfil:'Fresca con notas dulces', categoria:'Floral · Delicada', desc:'Evoca la pureza y la calma del jardín primaveral.', img:'images/fragrance-magnolia.jpg', propiedades:{ uso:['Ropa','Persona','Casa'] }, puntuaciones:{ calma:9, energia:3, seduccion:2, bienestar:8, frescor:7 } },
  { id:2, nombre:'Gardenias', perfil:'Fresca, intensa y atractiva', categoria:'Floral · Intensa', desc:'Un aroma que cautiva y energiza el ambiente.', img:'images/fragrance-gardenias.jpg', propiedades:{ uso:['Ambiente','Persona'] }, puntuaciones:{ calma:4, energia:8, seduccion:7, bienestar:6, frescor:8 } },
  { id:3, nombre:'Bullbridge', perfil:'Sofisticada, cálida, fresca y cítrica', categoria:'Cítrica · Sofisticada', desc:'Una fragancia compleja que te identifica por tu perfume.', img:'images/fragrance-bullbridge.jpg', propiedades:{ uso:['Firma','Persona'] }, puntuaciones:{ calma:6, energia:7, seduccion:8, bienestar:7, frescor:8 } },
  { id:4, nombre:'Sandía y Pepino', perfil:'Revitalizante y fresca', categoria:'Acuática · Revitalizante', desc:'Ideal para momentos de fatiga. Frescura acuática que despierta los sentidos.', img:'images/fragrance-sandia.jpg', propiedades:{ uso:['Auto','Oficina'] }, puntuaciones:{ calma:3, energia:9, seduccion:2, bienestar:7, frescor:10 } },
  { id:5, nombre:'Softy', perfil:'Suave, fresca, limpia y reconfortante', categoria:'Suave · Hogareña', desc:'Transmite la sensación de sábanas limpias y un hogar acogedor.', img:'images/fragrance-softy.jpg', propiedades:{ uso:['Ropa de cama','Casa'] }, puntuaciones:{ calma:8, energia:2, seduccion:1, bienestar:9, frescor:7 } },
  { id:6, nombre:'Almendra y Fresia', perfil:'Dulce y floral con calidez', categoria:'Dulce · Floral', desc:'Brinda calidez y una sensación de abrazo constante.', img:'images/fragrance-almendra.jpg', propiedades:{ uso:['Persona','Ropa'] }, puntuaciones:{ calma:7, energia:3, seduccion:6, bienestar:9, frescor:4 } },
  { id:7, nombre:'Miel de Hadas', perfil:'Dulce y mágica', categoria:'Dulce · Etérea', desc:'Un aroma etéreo que invita a soñar y a la alegría.', img:'images/fragrance-miel.jpg', propiedades:{ uso:['Niños','Ambiente'] }, puntuaciones:{ calma:6, energia:4, seduccion:2, bienestar:8, frescor:3 } },
  { id:8, nombre:'Limón y Jengibre', perfil:'Cítrica y picante', categoria:'Cítrica · Energizante', desc:'Energizante natural que ayuda a enfocar la mente.', img:'images/fragrance-limon.jpg', propiedades:{ uso:['Oficina','Estudio'] }, puntuaciones:{ calma:2, energia:10, seduccion:1, bienestar:6, frescor:9 } },
  { id:9, nombre:'Coco y Melón', perfil:'Tropical y alegre', categoria:'Tropical · Alegre', desc:'Transporta a lugares soñados de playa y sol.', img:'images/fragrance-coco.jpg', propiedades:{ uso:['Verano','Auto','Casa'] }, puntuaciones:{ calma:4, energia:7, seduccion:3, bienestar:8, frescor:8 } },
  { id:10, nombre:'Té Verde', perfil:'Herbal y fresco', categoria:'Herbal · Meditativa', desc:'Ayuda a la meditación y a la limpieza energética.', img:'images/fragrance-te.jpg', propiedades:{ uso:['Meditación','Yoga'] }, puntuaciones:{ calma:9, energia:2, seduccion:1, bienestar:9, frescor:6 } },
  { id:11, nombre:'Bambú', perfil:'Zen y natural', categoria:'Natural · Zen', desc:'Una fragancia pura que conecta con lo esencial de la vida.', img:'images/fragrance-bambu.jpg', propiedades:{ uso:['Spa','Minimalista'] }, puntuaciones:{ calma:10, energia:1, seduccion:1, bienestar:9, frescor:5 } },
  { id:12, nombre:'Jazmín', perfil:'Floral intenso y seductor', categoria:'Floral · Intensa', desc:'Seductor y calmante al mismo tiempo.', img:'images/fragrance-jazmin.jpg', propiedades:{ uso:['Noche','Persona'] }, puntuaciones:{ calma:6, energia:3, seduccion:10, bienestar:7, frescor:3 } },
  { id:13, nombre:'Cristóbal', perfil:'Fresco, limpio y seguro', categoria:'Masculina · Fresca', desc:'Una opción masculina que proyecta seguridad y paz envidiable.', img:'images/fragrance-cristobal.jpg', propiedades:{ uso:['Hombre','Persona'] }, puntuaciones:{ calma:7, energia:6, seduccion:5, bienestar:8, frescor:8 } }
];

let respuestas = { emo_feeling:null, emo_mood:null, aroma_type:null, uso_principal:null, preferencia_temporal:null };
let currentStep = 1;
const TOTAL_STEPS = 6;

const aromapMapping = {
  floral: ['Magnolia','Gardenias','Almendra y Fresia','Jazmín'],
  citrica: ['Bullbridge','Limón y Jengibre'],
  dulce: ['Almendra y Fresia','Miel de Hadas'],
  fresca: ['Sandía y Pepino','Softy','Bambú','Cristóbal'],
  herbal: ['Té Verde','Bambú'],
  tropical: ['Coco y Melón']
};

function selectOption(el, campo, valor) {
  // Deselect siblings
  el.closest('.quiz-options').querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.remove('selected');
    btn.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('selected');
  el.setAttribute('aria-pressed', 'true');
  respuestas[campo] = valor;
}

function updateProgress(step) {
  const pct = (step / TOTAL_STEPS) * 100;
  document.getElementById('quiz-progress').style.width = pct + '%';
  const bar = document.querySelector('.quiz-progress-bar');
  if (bar) bar.setAttribute('aria-valuenow', step);
}

function nextStep(to) {
  // Validate current step has a selection (except step 6)
  const currentKey = getKeyForStep(to - 1);
  if (currentKey && !respuestas[currentKey]) {
    showStepError('Por favor seleccioná una opción antes de continuar.');
    return;
  }
  clearStepError();

  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${to}`).classList.add('active');
  currentStep = to;
  updateProgress(to);
  document.getElementById('quiz-container').scrollIntoView({ behavior:'smooth', block:'start' });
}

function prevStep(to) {
  clearStepError();
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${to}`).classList.add('active');
  currentStep = to;
  updateProgress(to);
}

function getKeyForStep(step) {
  const map = { 1:'emo_feeling', 2:'emo_mood', 3:'aroma_type', 4:'uso_principal', 5:'preferencia_temporal' };
  return map[step] || null;
}

function showStepError(msg) {
  let err = document.getElementById('step-error');
  if (!err) {
    err = document.createElement('p');
    err.id = 'step-error';
    err.style.cssText = 'color:#ff7575; font-size:0.8rem; margin-top:0.8rem; text-align:center;';
    document.getElementById(`step-${currentStep}`).appendChild(err);
  }
  err.textContent = msg;
}
function clearStepError() {
  const err = document.getElementById('step-error');
  if (err) err.remove();
}

// Validaciones
function validarNombre(n) {
  if (!n || n.length < 2) return { valido:false, error:'El nombre debe tener al menos 2 caracteres.' };
  if (n.length > 50) return { valido:false, error:'El nombre no puede exceder 50 caracteres.' };
  if (/\d/.test(n)) return { valido:false, error:'El nombre no puede contener números.' };
  if (!/^[a-záéíóúàèìòùäëïöüâêîôûãõñçA-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÃÕÑÇ\s\-\']+$/.test(n)) return { valido:false, error:'El nombre contiene caracteres inválidos.' };
  return { valido:true };
}
function validarEmail(e) {
  if (!e || e.length === 0) return { valido:false, error:'El email es obligatorio.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { valido:false, error:'Por favor ingresá un email válido.' };
  return { valido:true };
}
function validarTelefono(t) {
  if (!t || t.length === 0) return { valido:false, error:'El teléfono es obligatorio.' };
  const limpio = t.replace(/[\s\-\(\)]/g, '');
  if (!/^\+?[0-9]{6,20}$/.test(limpio)) return { valido:false, error:'El teléfono debe contener al menos 6 dígitos.' };
  return { valido:true };
}

function validarCampoLive(input, tipo) {
  const val = input.value.trim();
  const vmap = { nombre: validarNombre, email: validarEmail, telefono: validarTelefono };
  const result = vmap[tipo] ? vmap[tipo](val) : { valido:true };
  let errDiv = input.nextElementSibling;
  if (!errDiv || !errDiv.classList.contains('campo-error')) {
    errDiv = document.createElement('div');
    errDiv.className = 'campo-error';
    input.parentNode.insertBefore(errDiv, input.nextSibling);
  }
  if (!val) {
    input.style.borderColor = 'rgba(201,169,110,0.2)';
    errDiv.textContent = ''; errDiv.style.display = 'none'; input.style.boxShadow = 'none';
  } else if (result.valido) {
    input.style.borderColor = '#c9a96e';
    errDiv.textContent = ''; errDiv.style.display = 'none';
    input.style.boxShadow = '0 0 0 2px rgba(201,169,110,0.15)';
  } else {
    input.style.borderColor = '#ff6b6b';
    errDiv.textContent = result.error; errDiv.style.display = 'block';
    input.style.boxShadow = '0 0 0 2px rgba(255,107,107,0.15)';
  }
}

// Attach live validation
document.addEventListener('DOMContentLoaded', () => {
  const inputs = [
    { id:'nombre-usuario', tipo:'nombre' },
    { id:'email-usuario', tipo:'email' },
    { id:'telefono-usuario', tipo:'telefono' }
  ];
  inputs.forEach(({ id, tipo }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => validarCampoLive(el, tipo));
      el.addEventListener('blur', () => validarCampoLive(el, tipo));
    }
  });
});

function calcularRecomendacion() {
  const puntuaciones = {};
  FRAGANCIAS_DATA.forEach(f => puntuaciones[f.id] = 0);

  const emoMap = { calma:'calma', energia:'energia', seduccion:'seduccion', bienestar:'bienestar' };

  FRAGANCIAS_DATA.forEach(f => {
    if (emoMap[respuestas.emo_feeling]) puntuaciones[f.id] += f.puntuaciones[emoMap[respuestas.emo_feeling]] * 2;
    if (emoMap[respuestas.emo_mood]) puntuaciones[f.id] += f.puntuaciones[emoMap[respuestas.emo_mood]] * 1.5;
  });

  if (respuestas.aroma_type && aromapMapping[respuestas.aroma_type]) {
    const lista = aromapMapping[respuestas.aroma_type];
    FRAGANCIAS_DATA.forEach(f => {
      if (!lista.includes(f.nombre)) puntuaciones[f.id] *= 0.4;
      else puntuaciones[f.id] += 5;
    });
  }

  if (respuestas.uso_principal) {
    FRAGANCIAS_DATA.forEach(f => {
      if (f.propiedades.uso.includes(respuestas.uso_principal)) puntuaciones[f.id] += 3;
    });
  }

  const bestId = Object.keys(puntuaciones).reduce((a, b) => puntuaciones[a] > puntuaciones[b] ? a : b);
  return FRAGANCIAS_DATA.find(f => f.id == bestId);
}

async function finalizarQuiz() {
  const nombre = document.getElementById('nombre-usuario').value.trim();
  const email = document.getElementById('email-usuario').value.trim().toLowerCase();
  const telefono = document.getElementById('telefono-usuario').value.trim();

  const vNombre = validarNombre(nombre);
  if (!vNombre.valido) { alert(vNombre.error); document.getElementById('nombre-usuario').focus(); return; }
  const vEmail = validarEmail(email);
  if (!vEmail.valido) { alert(vEmail.error); document.getElementById('email-usuario').focus(); return; }
  const vTel = validarTelefono(telefono);
  if (!vTel.valido) { alert(vTel.error); document.getElementById('telefono-usuario').focus(); return; }

  const fragancia = calcularRecomendacion();

  // Guardar en Supabase antes de mostrar el resultado
  await saveQuizResponse(nombre, email, telefono, respuestas, fragancia.nombre);

  mostrarResultado(fragancia, nombre, email);
}

function mostrarResultado(fragancia, nombre, email) {
  // Hide all steps
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));

  const resultado = document.getElementById('quiz-resultado');
  resultado.innerHTML = `
    <div style="text-align:center; animation: fadeUp 0.6s ease both;">
      <p style="font-size:0.65rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem;">Tu fragancia perfecta</p>
      <img src="${fragancia.img}" alt="${fragancia.nombre}" style="width:180px; height:180px; object-fit:cover; border-radius:50%; border:2px solid var(--gold-dim); margin:0 auto 1.5rem; display:block;">
      <p style="font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold-dim); margin-bottom:0.3rem;">${fragancia.categoria}</p>
      <h2 style="font-family:'Cormorant Garamond',serif; font-size:3rem; color:var(--white); margin-bottom:0.4rem;">${fragancia.nombre}</h2>
      <p style="font-size:0.9rem; color:var(--gold-light); font-style:italic; margin-bottom:1.2rem;">${fragancia.perfil}</p>
      <p style="font-size:0.85rem; color:var(--cream-dim); max-width:48ch; line-height:1.8; margin:0 auto 2rem;">${fragancia.desc}</p>

      <div style="background:rgba(201,169,110,0.06); border:1px solid var(--border); border-radius:0.5rem; padding:1.5rem; margin-bottom:2rem; text-align:left;">
        <p style="font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:0.8rem;">Tu perfil aromático</p>
        <p style="font-size:0.9rem; color:var(--cream); margin-bottom:0.4rem;"><strong>¡Hola ${nombre}!</strong></p>
        <p style="font-size:0.82rem; color:var(--cream-dim);">Hemos guardado tu perfil aromático. Te enviaremos detalles sobre <strong>${fragancia.nombre}</strong> a <strong>${email}</strong></p>
      </div>

      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <a href="https://api.whatsapp.com/send?phone=541144353202&text=Hola%2C%20hice%20el%20quiz%20y%20me%20recomendaron%20${encodeURIComponent(fragancia.nombre)}%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" class="btn btn-gold">💬 Consultar sobre ${fragancia.nombre}</a>
        <button onclick="reiniciarQuiz()" class="btn btn-outline">🔄 Hacer de nuevo</button>
      </div>
    </div>
  `;
  resultado.classList.add('show');
  setTimeout(() => resultado.scrollIntoView({ behavior:'smooth', block:'center' }), 100);
}

function reiniciarQuiz() {
  respuestas = { emo_feeling:null, emo_mood:null, aroma_type:null, uso_principal:null, preferencia_temporal:null };
  currentStep = 1;

  document.getElementById('quiz-resultado').classList.remove('show');
  document.getElementById('quiz-resultado').innerHTML = '';
  document.getElementById('nombre-usuario').value = '';
  document.getElementById('email-usuario').value = '';
  document.getElementById('telefono-usuario').value = '';

  // Reset all options
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.remove('selected');
    btn.setAttribute('aria-pressed', 'false');
  });

  // Reset input styles
  ['nombre-usuario','email-usuario','telefono-usuario'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.borderColor = ''; el.style.boxShadow = ''; }
  });

  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-1').classList.add('active');
  updateProgress(1);
  document.getElementById('quiz-container').scrollIntoView({ behavior:'smooth', block:'start' });
}

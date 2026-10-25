document.addEventListener('DOMContentLoaded', () => {
  initModoOscuro();
  initBarraProgresoLectura();
  initBuscadorTarjetas();
});

function initModoOscuro() {
  const botonTema = document.getElementById('btn-tema');
  if (!botonTema) return;

  const temaGuardado = localStorage.getItem('tema-adso');
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (temaGuardado === 'dark' || (!temaGuardado && prefiereOscuro)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    actualizarBotonTema(true);
  }

  botonTema.addEventListener('click', () => {
    const esOscuroActual = document.documentElement.getAttribute('data-theme') === 'dark';
    const nuevoTema = esOscuroActual ? 'light' : 'dark';

    if (nuevoTema === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('tema-adso', 'dark');
      actualizarBotonTema(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('tema-adso', 'light');
      actualizarBotonTema(false);
    }
  });
}

function actualizarBotonTema(esOscuro) {
  const botonTema = document.getElementById('btn-tema');
  if (!botonTema) return;

  botonTema.setAttribute('aria-pressed', esOscuro ? 'true' : 'false');
  botonTema.innerHTML = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
}

function initBarraProgresoLectura() {
  const barra = document.querySelector('.barra-progreso');
  if (!barra) return;

  window.addEventListener('scroll', () => {
    const alturaVentana = window.innerHeight;
    const alturaDocumento = document.documentElement.scrollHeight;
    const posicionScroll = window.scrollY;

    const porcentaje = (posicionScroll / (alturaDocumento - alturaVentana)) * 100;
    barra.style.width = `${Math.min(100, Math.max(0, porcentaje))}%`;
  });
}

function initBuscadorTarjetas() {
  const inputBusqueda = document.getElementById('input-busqueda');
  const tarjetas = document.querySelectorAll('.tarjeta-educativa');
  const mensajeVacio = document.getElementById('sin-resultados');

  if (!inputBusqueda || tarjetas.length === 0) return;

  inputBusqueda.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase().trim();
    let encontrados = 0;

    tarjetas.forEach((tarjeta) => {
      const titulo = tarjeta.querySelector('h2').textContent.toLowerCase();
      const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();

      if (titulo.includes(termino) || descripcion.includes(termino)) {
        tarjeta.style.display = 'flex';
        encontrados++;
      } else {
        tarjeta.style.display = 'none';
      }
    });

    if (mensajeVacio) {
      mensajeVacio.style.display = encontrados === 0 ? 'block' : 'none';
    }
  });
}

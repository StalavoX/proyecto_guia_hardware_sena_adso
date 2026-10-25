document.addEventListener('DOMContentLoaded', () => {
  const formSimulador = document.getElementById('form-simulador');
  if (!formSimulador) return;

  formSimulador.addEventListener('input', calcularYValidarPC);
  calcularYValidarPC();
});

function calcularYValidarPC() {
  const selectCpu = document.getElementById('select-cpu');
  const selectRam = document.getElementById('select-ram');
  const selectSsd = document.getElementById('select-ssd');
  const selectGpu = document.getElementById('select-gpu');

  if (!selectCpu || !selectRam || !selectSsd || !selectGpu) return;

  const precioCpu = parseInt(selectCpu.selectedOptions[0].dataset.precio || 0);
  const precioRam = parseInt(selectRam.selectedOptions[0].dataset.precio || 0);
  const precioSsd = parseInt(selectSsd.selectedOptions[0].dataset.precio || 0);
  const precioGpu = parseInt(selectGpu.selectedOptions[0].dataset.precio || 0);

  const wattsCpu = parseInt(selectCpu.selectedOptions[0].dataset.watts || 0);
  const wattsGpu = parseInt(selectGpu.selectedOptions[0].dataset.watts || 0);
  const wattsBase = 100;

  const totalPrecio = precioCpu + precioRam + precioSsd + precioGpu;
  const consumoTotalWatts = wattsCpu + wattsGpu + wattsBase;
  const fuenteRecomendadaWatts = Math.ceil((consumoTotalWatts * 1.3) / 50) * 50;

  document.getElementById('res-precio').textContent = `$ ${totalPrecio.toLocaleString('es-CO')} COP`;
  document.getElementById('res-watts').textContent = `${consumoTotalWatts} W (Fuente sugerida: ${fuenteRecomendadaWatts}W)`;

  const esRamSuficiente = parseInt(selectRam.value) >= 16;
  const esCpuAdecuado = parseInt(selectCpu.value) >= 6;
  const esSsdSuficiente = parseInt(selectSsd.value) >= 500;

  const elementoEstado = document.getElementById('res-estado-adso');
  
  if (esRamSuficiente && esCpuAdecuado && esSsdSuficiente) {
    elementoEstado.className = 'estado-adso estado-optimo';
    elementoEstado.innerHTML = '✅ <strong>Configuración Óptima para ADSO:</strong> Excelente para Docker, Bases de Datos y desarrollo Web/Móvil.';
  } else if (parseInt(selectRam.value) >= 8) {
    elementoEstado.className = 'estado-adso estado-advertencia';
    elementoEstado.innerHTML = '⚠️ <strong>Configuración Básica:</strong> Permitirá programar, pero podrías experimentar lentitud al usar máquinas virtuales o Android Studio.';
  } else {
    elementoEstado.className = 'estado-adso estado-insuficiente';
    elementoEstado.innerHTML = '❌ <strong>Insuficiente:</strong> Requiere al menos 16 GB de RAM y un SSD de 500 GB para cumplir las guías del programa.';
  }
}

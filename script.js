/* ══════════════════════════════════════════════
   Bar New Paraíso — script.js
   1. Estado abierto/cerrado en vivo
   2. Resaltar día actual en la tabla de horario
   3. Scroll reveal (IntersectionObserver)
   ══════════════════════════════════════════════ */

/* ─── Horario real del bar ──────────────────── */
// day: 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
// open/close en minutos desde medianoche (0 = 00:00, 540 = 9:00, 1440 = 24:00)
const SCHEDULE = {
  0: { open: 600, close: 1440 }, // Domingo  10:00 – 00:00
  1: { open: 540, close: 1440 }, // Lunes    09:00 – 00:00
  2: null,                        // Martes   CERRADO
  3: { open: 540, close: 1440 }, // Miércoles 09:00 – 00:00
  4: { open: 540, close: 1440 }, // Jueves   09:00 – 00:00
  5: { open: 540, close: 1440 }, // Viernes  09:00 – 00:00
  6: { open: 600, close: 1440 }, // Sábado   10:00 – 00:00
};

function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function isOpen() {
  const now     = new Date();
  const day     = now.getDay();
  const minutes = getNowMinutes();
  const slot    = SCHEDULE[day];
  if (!slot) return false;
  // close == 1440 significa medianoche del mismo día (fin del día)
  return minutes >= slot.open && minutes < slot.close;
}

/* ─── Actualizar indicadores de estado ─────── */
function updateStatus() {
  const open      = isOpen();
  const statusDot  = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const heroStatus = document.getElementById('hero-status-inline');

  const label = open ? 'Abierto ahora' : 'Cerrado';
  const cssClass = open ? 'open' : 'closed';

  // Header badge
  if (statusDot)  { statusDot.className  = 'status-dot ' + cssClass; }
  if (statusText) { statusText.textContent = label; }

  // Indicador hero
  if (heroStatus) {
    heroStatus.textContent = label;
    heroStatus.className   = 'hero-status-inline ' + (open ? 'is-open' : 'is-closed');
  }
}

/* ─── Resaltar día actual en la tabla ──────── */
function highlightToday() {
  const today  = new Date().getDay();
  const rows   = document.querySelectorAll('#horario-tabla-body tr[data-day]');

  rows.forEach(function(row) {
    const dayAttr = parseInt(row.getAttribute('data-day'), 10);
    // La fila de sábado también cubre domingo (data-day="6")
    const isToday = dayAttr === today || (dayAttr === 6 && today === 0);

    if (isToday) {
      row.classList.add('hoy');
      // Añadir etiqueta "Hoy" en la última celda
      const estadoCell = row.querySelector('.dia-estado');
      if (estadoCell) {
        estadoCell.innerHTML = '<span class="dia-estado-hoy">Hoy</span>';
      }
    }
  });
}

/* ─── Scroll reveal con IntersectionObserver ─ */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar todo sin animación
    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Revelar una sola vez
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

/* ─── Init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  updateStatus();
  highlightToday();
  initReveal();

  // Refrescar el estado cada minuto (sin recargar la página)
  setInterval(updateStatus, 60 * 1000);
});

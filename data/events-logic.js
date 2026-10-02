/**
 * events.js (logik)
 * 
 * Renderer events fra data/events.js som kort på events.html,
 * sorteret kronologisk efter startdato.
 */

const DANISH_MONTHS_SHORT = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

document.addEventListener('DOMContentLoaded', () => {
  renderEventsList();
});

/**
 * Renderer alle events, sorteret efter startdato (tidligste først)
 */
function renderEventsList() {
  const container = document.getElementById('events-list');

  if (!container) {
    console.error('events-list container ikke fundet i HTML');
    return;
  }

  if (!events || events.length === 0) {
    container.innerHTML = '<div class="events-empty">Der er ingen events på programmet lige nu - kig forbi igen senere!</div>';
    return;
  }

  // Sorter events kronologisk efter startdato
  const sortedEvents = [...events].sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart));

  const grid = document.createElement('div');
  grid.className = 'events-grid';

  sortedEvents.forEach(event => {
    grid.appendChild(renderEventCard(event));
  });

  container.appendChild(grid);
}

/**
 * Renderer et enkelt event-kort
 */
function renderEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event-card';

  const dateBadge = formatDateBadge(event.dateStart, event.dateEnd);

  card.innerHTML = `
    <div class="event-date-badge">
      <span class="event-day">${dateBadge.day}</span>
      <span class="event-month">${dateBadge.month}</span>
    </div>
    <div class="event-content">
      <h3 class="event-title">${escapeHtml(event.title)}</h3>
      <div class="event-meta">
        ${event.location ? `<span class="event-meta-row">📍 ${escapeHtml(event.location)}</span>` : ''}
        ${event.time ? `<span class="event-meta-row">🕐 ${escapeHtml(event.time)}</span>` : ''}
      </div>
      <p class="event-description">${escapeHtml(event.description)}</p>
    </div>
  `;

  return card;
}

/**
 * Formaterer dato-badge: enkelt dag ("18" / "APR") eller periode ("18.-20." / "APR")
 * hvis events strækker sig over flere dage inden for samme måned.
 * Ved flerdags-events på tværs af måneder vises en kompakt kombineret tekst.
 */
function formatDateBadge(dateStart, dateEnd) {
  const start = new Date(dateStart);
  const startDay = start.getDate();
  const startMonth = DANISH_MONTHS_SHORT[start.getMonth()].toUpperCase();

  if (!dateEnd) {
    return { day: String(startDay), month: startMonth };
  }

  const end = new Date(dateEnd);
  const endDay = end.getDate();
  const endMonth = DANISH_MONTHS_SHORT[end.getMonth()].toUpperCase();

  if (startMonth === endMonth) {
    return { day: `${startDay}.-${endDay}.`, month: startMonth };
  }

  // Flerdags-event der går på tværs af to måneder
  return { day: `${startDay}.${startMonth.charAt(0)}${startMonth.charAt(1)}-${endDay}.${endMonth.charAt(0)}${endMonth.charAt(1)}`, month: '' };
}

/**
 * Escaper HTML for at undgå XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

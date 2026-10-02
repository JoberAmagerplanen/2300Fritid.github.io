/**
 * events.js
 *
 * Renderer for aktuelle events på events.html.
 */

const monthNames = [
  'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
];

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseDate(dateString) {
  return new Date(`${dateString}T12:00:00`);
}

function formatDateBadge(dateString) {
  const date = parseDate(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return {
    day,
    month
  };
}

function formatEventDateRange(event) {
  const start = parseDate(event.dateStart);
  const end = event.dateEnd ? parseDate(event.dateEnd) : null;

  if (!end || start.toDateString() === end.toDateString()) {
    return `${start.getDate()}. ${monthNames[start.getMonth()]}`;
  }

  return `${start.getDate()}. ${monthNames[start.getMonth()]} - ${end.getDate()}. ${monthNames[end.getMonth()]}`;
}

function formatDescriptionWithLinks(text) {
  if (!text) return '';

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return escapeHtml(text).replace(urlRegex, (url) => {
    const safeUrl = escapeHtml(url);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="event-link">Se mere her ↗</a>`;
  });
}

function renderEventCard(event) {
  const card = document.createElement('article');
  card.className = 'event-card';

  const startBadge = formatDateBadge(event.dateStart);
  const dateRangeText = formatEventDateRange(event);

  card.innerHTML = `
    <div class="event-date-badge">
      <div class="event-day">${startBadge.day}</div>
      <div class="event-month">${startBadge.month}</div>
    </div>
    <div class="event-content">
      <h2 class="event-title">${escapeHtml(event.title)}</h2>
      <div class="event-meta">
        <span class="event-meta-row">📅 ${escapeHtml(dateRangeText)}</span>
        ${event.time ? `<span class="event-meta-row">🕐 ${escapeHtml(event.time)}</span>` : ''}
        ${event.location ? `<span class="event-meta-row">📍 ${escapeHtml(event.location)}</span>` : ''}
      </div>
      ${event.description ? `<p class="event-description">${formatDescriptionWithLinks(event.description)}</p>` : ''}
    </div>
  `;

  return card;
}

function renderEventsList() {
  const container = document.getElementById('events-list');

  if (!container) {
    console.error('events-list container ikke fundet i HTML');
    return;
  }

  if (!Array.isArray(events) || events.length === 0) {
    container.innerHTML = '<div class="events-empty">Ingen aktuelle events fundet.</div>';
    return;
  }

  const sortedEvents = [...events].sort((a, b) => parseDate(a.dateStart) - parseDate(b.dateStart));

  const list = document.createElement('div');
  list.className = 'events-list';

  const grid = document.createElement('div');
  grid.className = 'events-grid';

  sortedEvents.forEach(event => {
    grid.appendChild(renderEventCard(event));
  });

  list.appendChild(grid);
  container.innerHTML = '';
  container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
  renderEventsList();
});

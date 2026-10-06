/**
 * liste.js
 * 
 * Logik for aktivitetsliste med kategorisering og filtrering.
 * Genbruger aktivitets-data fra activities.js og filter-koncept fra map.js.
 * 
 * Funktionalitet:
 * - Grupperer aktiviteter efter kategori
 * - Filter-buttons til at vise/skjule kategorier (klik isolerer en kategori)
 * - "Kun gratis"-knap, der kan kombineres med kategorifiltrene
 * - Responsive aktivitetskort
 */

// ===========================
// STATE MANAGEMENT
// ===========================

// Holder styr på hvilke kategorier der er aktive filtreret
const activeFilters = {
  "Bold": true,
  "Dans & bevægelse": true,
  "Krea & kultur": true,
  "Kampsport": true,
  "Andet": true
};

// Holder styr på om "Kun gratis"-filteret er slået til
let showOnlyFree = false;

// Kategori-mapping (id til kategori)
const categoryMap = {
  1: "Bold",
  2: "Dans & bevægelse",
  3: "Krea & kultur",
  4: "Kampsport",
  5: "Andet"
};

// CSS-klasse-mapping for farver
const categoryClassMap = {
  "Bold": "bold",
  "Dans & bevægelse": "dans-bevægelse",
  "Krea & kultur": "krea-kultur",
  "Kampsport": "kampsport",
  "Andet": "andet"
};

// ===========================
// INITIALISERING
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  setupFreeFilterButton();
  renderActivitiesList();
});

// ===========================
// FILTER BUTTONS
// ===========================

/**
 * Sætter up filterknapper for hver kategori.
 * Klik på en knap isolerer den kategori (viser kun den).
 * Klik på den samme knap igen (når den allerede er ene aktive) nulstiller til at vise alle.
 */
function setupFilterButtons() {
  const filterContainer = document.getElementById('filter-buttons');

  if (!filterContainer) {
    console.error('filter-buttons container ikke fundet i HTML');
    return;
  }

  const categories = ["Bold", "Dans & bevægelse", "Krea & kultur", "Kampsport", "Andet"];
  const buttons = [];

  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = `filter-button active ${categoryClassMap[category]}`;
    button.textContent = category;
    button.setAttribute('data-category', category);

    button.addEventListener('click', () => {
      // Tjek om den klikkede kategori allerede er den eneste aktive
      const isOnlyActive = activeFilters[category] &&
        categories.every(cat => cat === category ? activeFilters[cat] : !activeFilters[cat]);

      if (isOnlyActive) {
        // Nulstil: vis alle kategorier igen
        categories.forEach(cat => {
          activeFilters[cat] = true;
        });
      } else {
        // Isoler: vis kun den klikkede kategori
        categories.forEach(cat => {
          activeFilters[cat] = (cat === category);
        });
      }

      // Opdater alle knappers visuelle state
      buttons.forEach(btn => {
        const btnCategory = btn.getAttribute('data-category');
        btn.classList.toggle('active', activeFilters[btnCategory]);
      });

      // Opdater synlighed
      updateVisibility();
    });

    buttons.push(button);
    filterContainer.appendChild(button);
  });
}

/**
 * Sætter up "Kun gratis"-knappen. Fungerer uafhængigt af kategoriknapperne
 * (tænd/sluk-toggle, ikke "isoler") og kan kombineres frit med dem.
 */
function setupFreeFilterButton() {
  const filterContainer = document.getElementById('filter-buttons');

  if (!filterContainer) {
    return;
  }

  const button = document.createElement('button');
  button.className = 'filter-button free-filter-button';
  button.textContent = 'Kun gratis';
  button.setAttribute('aria-pressed', 'false');

  button.addEventListener('click', () => {
    showOnlyFree = !showOnlyFree;
    button.classList.toggle('active', showOnlyFree);
    button.setAttribute('aria-pressed', String(showOnlyFree));
    updateVisibility();
  });

  filterContainer.appendChild(button);
}

// ===========================
// LISTE RENDERING
// ===========================

/**
 * Grupperer aktiviteter efter kategori og renderer listen
 */
function renderActivitiesList() {
  const listContainer = document.getElementById('activities-list');

  if (!listContainer) {
    console.error('activities-list container ikke fundet i HTML');
    return;
  }

  // Gruppér aktiviteter efter kategori
  const groupedActivities = groupActivitiesByCategory();

  // Render hver kategori-sektion
  Object.keys(groupedActivities).forEach(category => {
    const section = renderCategorySection(category, groupedActivities[category]);
    listContainer.appendChild(section);
  });
}

/**
 * Grupperer aktiviteter efter deres kategori
 * Returnerer objekt: { "Bold": [...], "Dans & bevægelse": [...], ... }
 */
function groupActivitiesByCategory() {
  const grouped = {
    "Bold": [],
    "Dans & bevægelse": [],
    "Krea & kultur": [],
    "Kampsport": [],
    "Andet": []
  };

  activities.forEach(activity => {
    const category = activity.category;
    if (grouped[category]) {
      grouped[category].push(activity);
    }
  });

  return grouped;
}

/**
 * Renderer en kategori-sektion med aktivitetskort
 */
function renderCategorySection(category, activitiesInCategory) {
  const section = document.createElement('section');
  section.className = `category-section`;
  section.setAttribute('data-category', category);

  const categoryClass = categoryClassMap[category];

  // Kategori-overskrift
  const header = document.createElement('div');
  header.className = `category-header ${categoryClass}`;
  header.innerHTML = `
    <h2>${escapeHtml(category)}</h2>
    <span class="category-count">${activitiesInCategory.length}</span>
  `;
  section.appendChild(header);

  // Hvis ingen aktiviteter i kategorien
  if (activitiesInCategory.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'category-empty';
    empty.textContent = 'Ingen aktiviteter i denne kategori endnu.';
    section.appendChild(empty);
    return section;
  }

  // Grid med aktivitetskort
  const grid = document.createElement('div');
  grid.className = 'activities-grid';

  activitiesInCategory.forEach(activity => {
    const card = renderActivityCard(activity);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

/**
 * Renderer et enkelt aktivitetskort
 */
function renderActivityCard(activity) {
  const card = document.createElement('div');
  card.className = `activity-card ${categoryClassMap[activity.category]}`;
  // Bruges af gratis-filteret til at afgøre om kortet skal vises/skjules
  card.setAttribute('data-free', isFreeActivity(activity.price) ? 'true' : 'false');

  card.innerHTML = `
    <h3 class="activity-title">${escapeHtml(activity.title)}</h3>
    <div class="badge-row">
      <span class="activity-badge ${categoryClassMap[activity.category]}">${escapeHtml(activity.category)}</span>
      ${renderPriceBadge(activity.price)}
    </div>
    
    <div class="activity-info">
      <div class="activity-info-row">
        <strong>📍</strong>
        <span>${escapeHtml(activity.location)}</span>
      </div>
      <div class="activity-info-row">
        <strong>🕐</strong>
        <span>${escapeHtml(activity.time)}</span>
      </div>
      <div class="activity-info-row">
        <strong>📞</strong>
        <span>${formatContact(activity.contact)}</span>
      </div>
    </div>
    
    <div class="activity-description">
      ${escapeHtml(activity.description)}
    </div>
  `;

  return card;
}

// ===========================
// FILTRERING
// ===========================

/**
 * Opdaterer synligheden af kategorisektioner OG enkelte aktivitetskort,
 * baseret på både kategorifiltre og "Kun gratis"-filteret.
 */
function updateVisibility() {
  const sections = document.querySelectorAll('.category-section');

  sections.forEach(section => {
    const category = section.getAttribute('data-category');
    const isCategoryActive = activeFilters[category];

    // Hel kategori skjules, hvis dens filterknap er fravalgt
    section.classList.toggle('hidden', !isCategoryActive);

    if (!isCategoryActive) {
      return;
    }

    // Inden for en synlig kategori: skjul evt. ikke-gratis kort,
    // hvis "Kun gratis" er slået til
    const cards = section.querySelectorAll('.activity-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const isFree = card.getAttribute('data-free') === 'true';
      const shouldHide = showOnlyFree && !isFree;
      card.classList.toggle('hidden', shouldHide);
      if (!shouldHide) {
        visibleCount++;
      }
    });

    // Vis en besked, hvis "Kun gratis" filtrerer en hel kategori helt væk
    let noFreeMessage = section.querySelector('.category-empty.free-filter-empty');
    if (showOnlyFree && visibleCount === 0 && cards.length > 0) {
      if (!noFreeMessage) {
        noFreeMessage = document.createElement('div');
        noFreeMessage.className = 'category-empty free-filter-empty';
        noFreeMessage.textContent = 'Ingen gratis aktiviteter i denne kategori lige nu.';
        section.appendChild(noFreeMessage);
      }
    } else if (noFreeMessage) {
      noFreeMessage.remove();
    }
  });
}

// ===========================
// UTILITY
// ===========================

/**
 * Afgør om en aktivitet er gratis, ud fra dens price-felt.
 * Bruges både til pris-badgen og til "Kun gratis"-filteret.
 */
function isFreeActivity(price) {
  return !!(price && price.trim().toLowerCase().startsWith('gratis'));
}

/**
 * Renderer pris-badge (Gratis / Kræver betaling), hvis aktiviteten har et price-felt.
 * Aktiviteter uden price-felt viser ingen badge.
 */
function renderPriceBadge(price) {
  if (!price || !price.trim()) {
    return '';
  }
  const priceClass = isFreeActivity(price) ? 'price-free' : 'price-paid';
  return `<span class="price-badge ${priceClass}">${escapeHtml(price)}</span>`;
}

/**
 * Formaterer kontaktfeltet: hvis det er et link (starter med http),
 * vises det som et klikbart link. Ellers vises det som almindelig tekst.
 */
function formatContact(contact) {
  const trimmed = contact.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const safeUrl = escapeHtml(trimmed);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="contact-link-inline">Se mere her ↗</a>`;
  }
  return escapeHtml(contact);
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

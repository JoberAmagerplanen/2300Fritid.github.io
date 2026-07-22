/**
 * liste.js
 * 
 * Logik for aktivitetsliste med kategorisering og filtrering.
 * Genbruger aktivitets-data fra activities.js og filter-koncept fra map.js.
 * 
 * Funktionalitet:
 * - Grupperer aktiviteter efter kategori
 * - Filter-buttons til at vise/skjule kategorier
 * - Responsive aktivitetskort
 */

// ===========================
// STATE MANAGEMENT
// ===========================

// Holder styr på hvilke kategorier der er aktive filtreret
const activeFilters = {
  "Fodbold": true,
  "Dans": true,
  "Krea & kultur": true,
  "Boksning": true,
  "Andet": true
};

// Kategori-mapping (id til kategori)
const categoryMap = {
  1: "Fodbold",
  2: "Dans",
  3: "Krea & kultur",
  4: "Boksning",
  5: "Andet"
};

// CSS-klasse-mapping for farver
const categoryClassMap = {
  "Fodbold": "fodbold",
  "Dans": "dans",
  "Krea & kultur": "krea-kultur",
  "Boksning": "boksning",
  "Andet": "andet"
};

// ===========================
// INITIALISERING
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  renderActivitiesList();
});

// ===========================
// FILTER BUTTONS
// ===========================

/**
 * Sætter up filterknapper for hver kategori
 */
function setupFilterButtons() {
  const filterContainer = document.getElementById('filter-buttons');

  if (!filterContainer) {
    console.error('filter-buttons container ikke fundet i HTML');
    return;
  }

  const categories = ["Fodbold", "Dans", "Krea & kultur", "Boksning", "Andet"];

  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = `filter-button active ${categoryClassMap[category]}`;
    button.textContent = category;
    button.setAttribute('data-category', category);

    button.addEventListener('click', () => {
      // Toggle filter
      activeFilters[category] = !activeFilters[category];

      // Opdater knappens visual state
      button.classList.toggle('active', activeFilters[category]);

      // Opdater kategorisektioners synlighed
      updateCategoryVisibility();
    });

    filterContainer.appendChild(button);
  });
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
 * Returnerer objekt: { "Fodbold": [...], "Dans": [...], ... }
 */
function groupActivitiesByCategory() {
  const grouped = {
    "Fodbold": [],
    "Dans": [],
    "Krea & kultur": [],
    "Boksning": [],
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

  card.innerHTML = `
    <h3 class="activity-title">${escapeHtml(activity.title)}</h3>
    <span class="activity-badge ${categoryClassMap[activity.category]}">${escapeHtml(activity.category)}</span>
    
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
        <span>${escapeHtml(activity.contact)}</span>
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
 * Opdaterer synligheden af kategorisektioner baseret på aktive filtre
 */
function updateCategoryVisibility() {
  const sections = document.querySelectorAll('.category-section');

  sections.forEach(section => {
    const category = section.getAttribute('data-category');
    const isActive = activeFilters[category];

    if (isActive) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
}

// ===========================
// UTILITY
// ===========================

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

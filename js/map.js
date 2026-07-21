/**
 * map.js
 * 
 * Logik for interaktiv kortvisning med pins, filtrering og popup.
 * Arbejder sammen med activities.js (data) og map.css (styling).
 */

// ===========================
// STATE MANAGEMENT
// ===========================

// Holder styr på hvilke kategorier der er aktivt filtreret
const activeFilters = {
  "Fodbold": true,
  "Dans": true,
  "Krea & kultur": true,
  "Boksning": true,
  "Andet": true
};

// Holder styr på aktuel åben popup
let currentPopup = null;

// ===========================
// INITIALISERING
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  setupFilterButtons();
  setupCoordinateHelper();
});

/**
 * Initialiserer kortet ved at rendre alle pins
 */
function initializeMap() {
  const mapContainer = document.getElementById('map-container');
  
  if (!mapContainer) {
    console.error('map-container ikke fundet i HTML');
    return;
  }

  // Render pins for alle aktiviteter
  activities.forEach(activity => {
    renderPin(activity, mapContainer);
  });
}

/**
 * Renderer en enkelt pin på kortet
 */
function renderPin(activity, container) {
  // Opret pin-element
  const pin = document.createElement('div');
  pin.className = `map-pin ${activity.category.toLowerCase().replace(/ /g, '-')}`;
  pin.style.left = activity.x + '%';
  pin.style.top = activity.y + '%';
  pin.setAttribute('data-activity-id', activity.id);
  pin.setAttribute('data-category', activity.category);

  // Opret SVG cirkel ikon (lille prik)
  pin.innerHTML = `
    <svg viewBox="0 0 24 24" width="32" height="32" class="pin-icon">
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="white" stroke-width="2"/>
    </svg>
  `;

  // Tilføj click-listener
  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    openPopup(activity);
  });

  container.appendChild(pin);
}

/**
 * Åbner popup med aktivitetsdetaljer
 */
function openPopup(activity) {
  // Luk eventuel åben popup
  if (currentPopup) {
    currentPopup.remove();
  }

  // Opret popup-element
  const popup = document.createElement('div');
  popup.className = 'activity-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <button class="popup-close" aria-label="Luk popup">&times;</button>
      <div class="popup-header">
        <h3>${escapeHtml(activity.title)}</h3>
        <span class="popup-badge ${activity.category.toLowerCase().replace(/ /g, '-')}">${escapeHtml(activity.category)}</span>
      </div>
      <div class="popup-body">
        <p class="popup-row">
          <strong>📍 Placering:</strong> ${escapeHtml(activity.location)}
        </p>
        <p class="popup-row">
          <strong>🕐 Tid:</strong> ${escapeHtml(activity.time)}
        </p>
        <p class="popup-row">
          <strong>📝 Beskrivelse:</strong> ${escapeHtml(activity.description)}
        </p>
        <p class="popup-row">
          <strong>📞 Kontakt:</strong> ${escapeHtml(activity.contact)}
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
  currentPopup = popup;

  // Luk popup ved klik på kryds
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.remove();
    currentPopup = null;
  });

  // Luk popup ved klik udenfor
  document.addEventListener('click', (e) => {
    if (currentPopup && !popup.contains(e.target) && !e.target.closest('.map-pin')) {
      popup.remove();
      currentPopup = null;
    }
  });
}

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
    button.className = `filter-button active ${category.toLowerCase().replace(/ /g, '-')}`;
    button.textContent = category;
    button.setAttribute('data-category', category);

    button.addEventListener('click', () => {
      // Toggle filter
      activeFilters[category] = !activeFilters[category];
      
      // Opdater knappens visual state
      button.classList.toggle('active', activeFilters[category]);
      
      // Opdater pins på kortet
      updatePinVisibility();
    });

    filterContainer.appendChild(button);
  });
}

/**
 * Opdaterer synligheden af pins baseret på aktive filtre
 */
function updatePinVisibility() {
  const pins = document.querySelectorAll('.map-pin');

  pins.forEach(pin => {
    const category = pin.getAttribute('data-category');
    const isActive = activeFilters[category];
    
    if (isActive) {
      pin.classList.remove('hidden');
    } else {
      pin.classList.add('hidden');
    }
  });
}

/**
 * Sætter up koordinat-hjælper: klik på billedet for at få procent-koordinater
 * (Hjælpefunktion til justering af pin-placering)
 */
function setupCoordinateHelper() {
  const mapImage = document.getElementById('map-image');
  
  if (!mapImage) {
    console.error('map-image ikke fundet i HTML');
    return;
  }

  mapImage.addEventListener('click', (e) => {
    const rect = mapImage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const message = `Map clicked at: x: ${x.toFixed(1)}%, y: ${y.toFixed(1)}%`;
    console.log(message);
    console.log(`Kopier disse værdier til activities.js: x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
  });

  console.log('✓ Koordinat-hjælper aktiveret. Klik på kortbilledet for at få procent-koordinater.');
}

/**
 * Utility: Escaper HTML for at undgå XSS
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

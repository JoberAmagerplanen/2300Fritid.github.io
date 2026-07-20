// =====================
// 2300Fritid Activity Map
// =====================

// Sample activities data
const activities = [
  {
    id: 1,
    name: 'Football Match',
    type: 'sports',
    x: 35,
    y: 45,
    time: '16:00',
    description: 'Friendly football match at the local field'
  },
  {
    id: 2,
    name: 'Art Exhibition',
    type: 'culture',
    x: 65,
    y: 30,
    time: '18:00',
    description: 'Local artists showcase - Free entry'
  },
  {
    id: 3,
    name: 'Basketball Game',
    type: 'sports',
    x: 50,
    y: 70,
    time: '19:00',
    description: 'Community basketball tournament'
  },
  {
    id: 4,
    name: 'Picnic Area',
    type: 'recreation',
    x: 20,
    y: 25,
    time: '12:00',
    description: 'Family picnic gathering'
  }
];

let activePin = null;

// Initialize map
document.addEventListener('DOMContentLoaded', () => {
  const pinsOverlay = document.getElementById('pinsOverlay');
  const activityList = document.getElementById('activityList');
  const mapContainer = document.getElementById('mapContainer');

  // Create pins
  activities.forEach(activity => {
    // Create pin element
    const pin = document.createElement('div');
    pin.className = 'activity-pin';
    pin.style.left = activity.x + '%';
    pin.style.top = activity.y + '%';
    pin.id = `pin-${activity.id}`;
    pin.innerHTML = `<div class="pin-marker ${activity.type}"></div>`;

    // Create popup
    const popup = document.createElement('div');
    popup.className = 'pin-popup';
    popup.id = `popup-${activity.id}`;
    popup.innerHTML = `
      <button class="close-btn" onclick="closePopup(${activity.id})">✕</button>
      <h3>${activity.name}</h3>
      <span class="activity-type">${activity.type}</span>
      <div class="activity-details">🕐 ${activity.time}</div>
      <p>${activity.description}</p>
    `;

    // Position popup near pin
    popup.style.left = activity.x + '%';
    popup.style.top = (activity.y + 8) + '%';
    popup.style.transform = 'translateX(-50%)';

    // Add click listener to pin
    pin.addEventListener('click', () => {
      openPopup(activity.id, activity.x, activity.y);
    });

    // Add hover animation
    pin.addEventListener('mouseenter', () => {
      pin.classList.add('hover');
    });

    pin.addEventListener('mouseleave', () => {
      pin.classList.remove('hover');
    });

    pinsOverlay.appendChild(pin);
    pinsOverlay.appendChild(popup);

    // Add to activity list
    const listItem = document.createElement('div');
    listItem.className = 'activity-item';
    listItem.id = `list-${activity.id}`;
    listItem.innerHTML = `
      <div class="activity-item-title">${activity.name}</div>
      <div class="activity-item-type">${activity.type} • ${activity.time}</div>
    `;
    listItem.addEventListener('click', () => {
      openPopup(activity.id, activity.x, activity.y);
    });
    activityList.appendChild(listItem);
  });

  // Toggle sidebar on mobile
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth < 768) {
    // Sidebar appears as needed on mobile
  }
});

// Open popup for specific activity
function openPopup(activityId, x, y) {
  // Close previous popup
  if (activePin && activePin !== activityId) {
    closePopup(activePin);
  }

  activePin = activityId;

  const popup = document.getElementById(`popup-${activityId}`);
  const pin = document.getElementById(`pin-${activityId}`);
  const listItem = document.getElementById(`list-${activityId}`);

  if (popup) {
    popup.classList.add('active');
  }

  if (pin) {
    pin.classList.add('active');
  }

  if (listItem) {
    listItem.classList.add('active');
  }
}

// Close popup
function closePopup(activityId) {
  const popup = document.getElementById(`popup-${activityId}`);
  const pin = document.getElementById(`pin-${activityId}`);
  const listItem = document.getElementById(`list-${activityId}`);

  if (popup) {
    popup.classList.remove('active');
  }

  if (pin) {
    pin.classList.remove('active');
  }

  if (listItem) {
    listItem.classList.remove('active');
  }

  if (activePin === activityId) {
    activePin = null;
  }
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  const pinsOverlay = document.getElementById('pinsOverlay');
  
  // Check if click is on a pin or popup
  if (!e.target.closest('.activity-pin') && 
      !e.target.closest('.pin-popup') && 
      !e.target.closest('.activity-item') &&
      activePin) {
    closePopup(activePin);
  }
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
  // Add any responsive behavior here
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth < 768) {
    sidebar.classList.remove('active');
  }
});

// API-ready function to add new activity
function addActivity(activityData) {
  const newActivity = {
    id: activities.length + 1,
    ...activityData
  };
  
  activities.push(newActivity);
  
  // Create pin dynamically
  const pinsOverlay = document.getElementById('pinsOverlay');
  const pin = document.createElement('div');
  pin.className = 'activity-pin';
  pin.style.left = newActivity.x + '%';
  pin.style.top = newActivity.y + '%';
  pin.id = `pin-${newActivity.id}`;
  pin.innerHTML = `<div class="pin-marker ${newActivity.type}"></div>`;
  
  pin.addEventListener('click', () => {
    openPopup(newActivity.id, newActivity.x, newActivity.y);
  });
  
  pinsOverlay.appendChild(pin);
  
  console.log('Activity added:', newActivity);
  return newActivity;
}

// Example: Add activity programmatically
// addActivity({
//   name: 'Yoga Class',
//   type: 'recreation',
//   x: 45,
//   y: 50,
//   time: '09:00',
//   description: 'Morning yoga session in the park'
// });

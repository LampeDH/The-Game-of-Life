/**
 * Main Application Module
 * Game of Life Habit Tracker
 *
 * Handles:
 * - Navigation and view switching
 * - Modal management (create/edit habits)
 * - Theme toggling
 * - Event delegation
 * - Overall app initialization
 */

// ========== APPLICATION STATE ==========

const appState = {
  currentView: 'habits',
  currentHabitDetail: null,
  editingHabitId: null,
  theme: 'dark'
};

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Load saved theme
  loadTheme();

  // Set up navigation
  setupNavigation();

  // Set up modals
  setupHabitModal();

  // Set up confirmation dialog
  setupConfirmationDialog();

  // Set up settings
  setupSettings();

  // Initial render
  renderHabits();
  renderAvatarView();

  // Update date indicator
  updateDateIndicator();
}

/**
 * Initialize date indicator with current month
 */
function updateDateIndicator() {
  const indicator = document.getElementById('date-indicator');
  if (indicator) {
    indicator.textContent = getMonthYear();
  }
}

// ========== NAVIGATION ==========

/**
 * Set up bottom navigation tab switching
 */
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // If clicking on habits tab while in detail view, go back to habits list
      if (targetTab === 'habits' && appState.currentHabitDetail) {
        returnToHabits();
      } else {
        switchView(targetTab);
      }

      // Update active state - only update if not in detail view
      if (!appState.currentHabitDetail || targetTab === 'habits') {
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });

  // Listen for custom detail view event
  document.addEventListener('openHabitDetail', (e) => {
    openHabitDetail(e.detail.habitId);
  });
}

/**
 * Switch to a different view
 * @param {string} viewName - View to switch to (habits, avatar, settings)
 */
function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const viewId = `${viewName}-view`;
  const view = document.getElementById(viewId);

  if (view) {
    view.classList.add('active');
    appState.currentView = viewName;

    // Refresh avatar view when switching to it
    if (viewName === 'avatar') {
      refreshAvatarView();
    }
  }
}

/**
 * Open habit detail view
 * @param {string} habitId - Habit ID to display
 */
function openHabitDetail(habitId) {
  const habit = getHabitById(habitId);
  if (!habit) return;

  appState.currentHabitDetail = habitId;

  // Update detail view header
  const habitName = document.getElementById('detail-habit-name');
  if (habitName) {
    habitName.textContent = habit.name;
  }

  // Render detail content
  renderHabitDetail(habitId);

  // Switch to detail view
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('detail-view').classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
}

/**
 * Return to habits list from detail view
 */
function returnToHabits() {
  appState.currentHabitDetail = null;
  renderHabits();
  switchView('habits');
  document.querySelector('[data-tab="habits"]').classList.add('active');
}

/**
 * Format goal text for habit detail view
 * @param {Object} habit - Habit object
 * @returns {string} Formatted goal text
 */
function formatGoalText(habit) {
  const frequencyText = habit.frequencyTarget === 1 && habit.frequencyPeriod === 'day'
    ? 'daily'
    : `${habit.frequencyTarget} time${habit.frequencyTarget > 1 ? 's' : ''} per ${habit.frequencyPeriod}`;

  let goalText = `${habit.name} ${frequencyText}`;

  if (habit.duration) {
    goalText += ` for ${habit.duration}`;
  }

  return goalText;
}

/**
 * Format reminders text for habit detail view
 * @param {Object} habit - Habit object
 * @returns {string} Formatted reminders text
 */
function formatRemindersText(habit) {
  if (!habit.reminders?.enabled) {
    return 'No reminders';
  }

  const dayMap = {
    'monday': 'Mon',
    'tuesday': 'Tue',
    'wednesday': 'Wed',
    'thursday': 'Thu',
    'friday': 'Fri',
    'saturday': 'Sat',
    'sunday': 'Sun'
  };

  const days = habit.reminders.days?.map(day => dayMap[day] || day).join(', ') || 'No days selected';
  const time = habit.reminders.time || 'No time set';

  return `${days} at ${time}`;
}

/**
 * Render habit detail view content
 * @param {string} habitId - Habit ID
 */
function renderHabitDetail(habitId) {
  const habit = getHabitById(habitId);
  if (!habit) return;

  const detailContent = document.getElementById('detail-content');
  const stats = getHabitStats(habitId);

  detailContent.innerHTML = `
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-value">${stats.currentStreak}</div>
        <div class="stat-label">Current Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.longestStreak}</div>
        <div class="stat-label">Longest Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.totalCompletions}</div>
        <div class="stat-label">Total Completions</div>
      </div>
    </div>

    <div class="calendar-section">
      <h3>Activity</h3>
      <div class="calendar-nav">
        <button class="btn-prev">←</button>
        <span class="calendar-month" id="calendar-month">${getMonthYear()}</span>
        <button class="btn-next">→</button>
      </div>
      <div id="calendar-view" class="calendar-grid">
        <!-- Calendar will be rendered here -->
      </div>
    </div>

    <div class="habit-info-section">
      <div class="info-item">
        <div class="info-label">Goal</div>
        <div class="info-value">${formatGoalText(habit)}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Reminders</div>
        <div class="info-value">${formatRemindersText(habit)}</div>
      </div>
    </div>

    ${habit.notes ? `
      <div class="habit-notes-section">
        <h3>Notes</h3>
        <p>${escapeHtml(habit.notes)}</p>
      </div>
    ` : ''}

    <div class="detail-footer">
      <button id="delete-habit-btn" class="btn-secondary">Delete Habit</button>
    </div>
  `;

  // Render calendar - full month view
  const monthWeeks = getMonthCalendar(habitId);
  const calendarView = document.getElementById('calendar-view');
  if (calendarView) {
    // Add day names header
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const headerHtml = '<div class="calendar-header">' +
      dayNames.map(name => `<div class="calendar-day-header">${name}</div>`).join('') +
      '</div>';

    // Generate weeks
    const weeksHtml = monthWeeks.map(week => {
      const daysHtml = week.map(day => {
        const classes = ['calendar-day'];
        if (!day.isCurrentMonth) classes.push('other-month');
        if (day.isToday) classes.push('today');
        if (day.isEditable) classes.push('editable');
        if (!day.isEditable) classes.push('disabled');
        if (day.completed) classes.push('has-completion');

        return `
          <div class="${classes.join(' ')}" data-date="${day.date}">
            <div class="day-number">${day.day}</div>
            <div class="day-indicator ${day.completed ? 'completed' : ''}"></div>
          </div>
        `;
      }).join('');

      return `<div class="calendar-week">${daysHtml}</div>`;
    }).join('');

    calendarView.innerHTML = headerHtml + '<div class="calendar-month-grid">' + weeksHtml + '</div>';

    // Add click handlers for editable dates (past 7 days only)
    const dayElements = calendarView.querySelectorAll('.calendar-day');
    dayElements.forEach((el) => {
      const dateStr = el.dataset.date;
      const isEditable = el.classList.contains('editable');

      if (isEditable) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          toggleHabitCompletion(habitId, dateStr);
          renderHabitDetail(habitId);
          renderHabits();
        });
      }
    });
  }

  // Add delete button handler
  const deleteBtn = document.getElementById('delete-habit-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      showConfirmation(
        '⚠️',
        'Delete Habit?',
        'This habit and all its data will be permanently deleted.',
        () => {
          removeHabit(habitId);
          returnToHabits();
        }
      );
    });
  }
}

// ========== HABIT MODAL ==========

/**
 * Set up habit creation/edit modal
 */
function setupHabitModal() {
  const modal = document.getElementById('habit-modal');
  const form = document.getElementById('habit-form');
  const addBtn = document.getElementById('add-habit-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const reminderToggle = document.getElementById('reminder-toggle');
  const reminderOptions = document.getElementById('reminder-options');
  const advancedToggle = document.getElementById('advanced-toggle');
  const durationToggle = document.getElementById('duration-toggle');
  const charCountSpan = document.getElementById('char-count');
  const notesTextarea = document.getElementById('habit-notes');

  // Open modal on add button
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      openHabitModal();
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeHabitModal);
  }

  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeHabitModal();
      }
    });
  }

  // Reminder toggle
  if (reminderToggle) {
    reminderToggle.addEventListener('change', () => {
      if (reminderOptions) {
        reminderOptions.classList.toggle('hidden');
      }
    });
  }

  // Collapsible sections
  if (advancedToggle) {
    advancedToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const content = advancedToggle.nextElementSibling;
      if (content) {
        content.classList.toggle('hidden');
      }
    });
  }

  if (durationToggle) {
    durationToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const content = durationToggle.nextElementSibling;
      if (content) {
        content.classList.toggle('hidden');
      }
    });
  }

  // Character count for notes
  if (notesTextarea) {
    notesTextarea.addEventListener('input', () => {
      if (charCountSpan) {
        charCountSpan.textContent = notesTextarea.value.length;
      }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitHabitForm();
    });
  }
}

/**
 * Open habit creation modal
 * @param {boolean} isEdit - Whether this is an edit operation
 */
function openHabitModal(isEdit = false) {
  const modal = document.getElementById('habit-modal');
  const form = document.getElementById('habit-form');
  const title = document.getElementById('modal-title');

  // Only reset if not editing
  if (!isEdit) {
    appState.editingHabitId = null;

    // Reset form
    if (form) {
      form.reset();
      document.getElementById('char-count').textContent = '0';
      document.getElementById('reminder-options').classList.add('hidden');
    }

    // Update title
    if (title) {
      title.textContent = 'Create Habit';
    }
  } else {
    // Update title for edit mode
    if (title) {
      title.textContent = 'Edit Habit';
    }
  }

  // Show modal
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Close habit modal
 */
function closeHabitModal() {
  const modal = document.getElementById('habit-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  appState.editingHabitId = null;
}

/**
 * Submit habit form
 */
function submitHabitForm() {
  // Clear previous errors
  clearFormErrors();

  const durationValue = document.getElementById('duration-value').value.trim();
  const durationUnit = document.getElementById('duration-unit').value.trim();
  const duration = (durationValue && durationUnit) ? `${durationValue} ${durationUnit}` : '';

  const formData = {
    name: document.getElementById('habit-name').value.trim(),
    duration: duration,
    frequencyTarget: document.getElementById('frequency-target').value,
    frequencyPeriod: document.getElementById('frequency-period').value,
    reminderEnabled: document.getElementById('reminder-toggle').checked,
    reminderTime: document.getElementById('reminder-time').value,
    reminderDays: Array.from(document.querySelectorAll('.reminder-day:checked')).map(cb => cb.value),
    notes: document.getElementById('habit-notes').value
  };

  // Validation
  if (!formData.name) {
    showFormError('name-error', 'Habit name is required');
    return;
  }

  if (!formData.frequencyTarget || formData.frequencyTarget < 1) {
    showFormError('frequency-error', 'Frequency must be at least 1');
    return;
  }

  // Create/update habit
  if (appState.editingHabitId) {
    // Update existing habit
    const updates = {
      name: formData.name,
      duration: formData.duration,
      frequencyTarget: parseInt(formData.frequencyTarget),
      frequencyPeriod: formData.frequencyPeriod,
      notes: formData.notes,
      reminders: {
        enabled: formData.reminderEnabled,
        time: formData.reminderTime,
        days: formData.reminderDays
      }
    };
    updateHabit(appState.editingHabitId, updates);
  } else {
    // Create new habit
    const newHabit = createHabitObject(formData);
    saveNewHabit(newHabit);
  }

  // Close modal and refresh
  closeHabitModal();
  appState.editingHabitId = null; // Clear editing state
  renderHabits();

  if (appState.currentHabitDetail) {
    renderHabitDetail(appState.currentHabitDetail);
  }
}

/**
 * Show form field error
 * @param {string} elementId - Error element ID
 * @param {string} message - Error message
 */
function showFormError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

/**
 * Clear all form validation errors
 */
function clearFormErrors() {
  const errorElements = document.querySelectorAll('.form-error');
  errorElements.forEach(el => {
    el.textContent = '';
  });
}

// ========== CONFIRMATION DIALOG ==========

/**
 * Set up confirmation dialog
 */
function setupConfirmationDialog() {
  const overlay = document.getElementById('confirmation-dialog');
  const cancelBtn = document.getElementById('dialog-cancel');
  const confirmBtn = document.getElementById('dialog-confirm');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      hideConfirmation();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (window.confirmCallback) {
        window.confirmCallback();
      }
      hideConfirmation();
    });
  }

  // Close on background click
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideConfirmation();
      }
    });
  }
}

/**
 * Show confirmation dialog
 * @param {string} icon - Icon emoji/text
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Function} callback - Callback when confirmed
 */
function showConfirmation(icon, title, message, callback) {
  const overlay = document.getElementById('confirmation-dialog');
  const iconEl = document.getElementById('dialog-icon');
  const titleEl = document.getElementById('dialog-title');
  const messageEl = document.getElementById('dialog-message');

  window.confirmCallback = callback;

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

/**
 * Hide confirmation dialog
 */
function hideConfirmation() {
  const overlay = document.getElementById('confirmation-dialog');
  if (overlay) {
    overlay.classList.add('hidden');
  }
  window.confirmCallback = null;
}

// ========== SETTINGS ==========

/**
 * Set up settings functionality
 */
function setupSettings() {
  const themeToggle = document.getElementById('theme-toggle');
  const exportBtn = document.getElementById('export-data-btn');
  const clearBtn = document.getElementById('clear-data-btn');

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', exportAppData);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      showConfirmation(
        '⚠️',
        'Clear All Data?',
        'This will permanently delete all your habits, progress, and settings. This action cannot be undone.',
        clearAllAppData
      );
    });
  }

  // Set up back button for detail view
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', returnToHabits);
  }

  // Set up edit button for detail view
  const editBtn = document.getElementById('edit-habit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (appState.currentHabitDetail) {
        editHabit(appState.currentHabitDetail);
      }
    });
  }
}

// ========== THEME MANAGEMENT ==========

/**
 * Load theme preference
 */
function loadTheme() {
  const settings = getSettings();
  const theme = settings.theme || 'dark';
  // Ensure theme is set on HTML element
  document.documentElement.setAttribute('data-theme', theme);
  applyTheme(theme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  applyTheme(newTheme);
  updateSettings({ theme: newTheme });
}

/**
 * Apply theme to app
 * @param {string} theme - Theme name (dark or light)
 */
function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  appState.theme = theme;

  // Update toggle button state
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.classList.toggle('active', theme === 'light');
  }
}

// ========== DATA MANAGEMENT ==========

/**
 * Export app data to JSON file
 */
function exportAppData() {
  const data = exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `gameoflife-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Clear all app data
 */
function clearAllAppData() {
  clearAllData();
  initializeStorage();
  // Just re-render, don't re-initialize (avoid duplicate event listeners)
  renderHabits();
  renderAvatarView();
  updateDateIndicator();
}

/**
 * Edit existing habit
 * @param {string} habitId - Habit ID to edit
 */
function editHabit(habitId) {
  const habit = getHabitById(habitId);
  if (!habit) return;

  appState.editingHabitId = habitId;

  // Open modal first (in edit mode)
  openHabitModal(true);

  // Populate form with habit data
  document.getElementById('habit-name').value = habit.name;
  document.getElementById('frequency-target').value = habit.frequencyTarget || 1;
  document.getElementById('frequency-period').value = habit.frequencyPeriod || 'week';

  // Handle duration parsing
  if (habit.duration) {
    const parts = habit.duration.split(' ');
    document.getElementById('duration-value').value = parts[0] || '';
    document.getElementById('duration-unit').value = parts.slice(1).join(' ') || '';
  } else {
    document.getElementById('duration-value').value = '';
    document.getElementById('duration-unit').value = '';
  }

  document.getElementById('habit-notes').value = habit.notes || '';

  // Update character count for notes
  document.getElementById('char-count').textContent = (habit.notes || '').length;

  // Set reminders
  const reminderToggle = document.getElementById('reminder-toggle');
  reminderToggle.checked = habit.reminders?.enabled || false;
  document.getElementById('reminder-options').classList.toggle('hidden', !reminderToggle.checked);
  document.getElementById('reminder-time').value = habit.reminders?.time || '';

  // Set reminder days
  document.querySelectorAll('.reminder-day').forEach(checkbox => {
    checkbox.checked = habit.reminders?.days?.includes(checkbox.value) || false;
  });
}

// ========== ERROR HANDLING ==========

/**
 * Handle app errors
 */
window.addEventListener('error', (e) => {
  console.error('App error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

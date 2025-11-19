/**
 * Habits Module
 * Game of Life Habit Tracker
 *
 * Handles all habit-related logic including:
 * - Creating and editing habits
 * - Marking completions
 * - Streak calculations
 * - Rendering habit cards and details
 */

/**
 * Create a new habit object
 * @param {Object} formData - Form data from habit creation modal
 * @returns {Object} New habit object
 */
function createHabitObject(formData) {
  const habit = {
    id: generateId(),
    name: formData.name,
    duration: formData.duration || '',
    frequency: formData.frequency || 1,
    frequencyTarget: parseInt(formData.frequencyTarget) || 1,
    frequencyPeriod: formData.frequencyPeriod || 'week',
    color: formData.color || getRandomColor(),
    reminders: {
      enabled: formData.reminderEnabled || false,
      time: formData.reminderTime || '',
      days: formData.reminderDays || []
    },
    notes: formData.notes || '',
    completions: [],
    currentStreak: 0,
    longestStreak: 0,
    createdAt: new Date().toISOString()
  };
  return habit;
}

/**
 * Get random color from habit color palette
 * @returns {string} Hex color code
 */
function getRandomColor() {
  const colors = [
    '#2196F3', // Electric Blue
    '#9C27B0', // Vibrant Purple
    '#E91E63', // Hot Pink
    '#F44336', // Bright Red
    '#FF9800', // Energetic Orange
    '#FFC107', // Sunny Yellow
    '#4CAF50', // Fresh Green
    '#009688', // Teal
    '#3F51B5', // Deep Indigo
    '#FF5722'  // Coral
  ];

  const allHabits = getAllHabits();
  const usedColors = allHabits.map(h => h.color);

  // Find first unused color
  const unusedColor = colors.find(color => !usedColors.includes(color));
  if (unusedColor) {
    return unusedColor;
  }

  // If all colors used, return random
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Save new habit to storage
 * @param {Object} habit - Habit object to save
 * @returns {boolean} Success status
 */
function saveNewHabit(habit) {
  return addHabit(habit);
}

/**
 * Mark habit as complete for today
 * @param {string} habitId - Habit ID
 * @returns {boolean} Success status
 */
function markHabitComplete(habitId) {
  const today = getCurrentDate();
  const habit = getHabitById(habitId);

  if (!habit) return false;

  // Check if already completed today
  if (habit.completions.includes(today)) {
    return false;
  }

  // Add completion
  habit.completions.push(today);

  // Update streak
  updateStreak(habit);

  // Save to storage
  return updateHabit(habitId, habit);
}

/**
 * Unmark habit completion for a date
 * @param {string} habitId - Habit ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {boolean} Success status
 */
function unmarkHabitCompletion(habitId, date) {
  const habit = getHabitById(habitId);

  if (!habit) return false;

  const index = habit.completions.indexOf(date);
  if (index > -1) {
    habit.completions.splice(index, 1);
    updateStreak(habit);
    return updateHabit(habitId, habit);
  }

  return false;
}

/**
 * Toggle habit completion for a specific date
 * @param {string} habitId - Habit ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {boolean} Success status
 */
function toggleHabitCompletion(habitId, date) {
  const habit = getHabitById(habitId);

  if (!habit) return false;

  if (habit.completions.includes(date)) {
    return unmarkHabitCompletion(habitId, date);
  } else {
    habit.completions.push(date);
    updateStreak(habit);
    return updateHabit(habitId, habit);
  }
}

/**
 * Check if habit is completed on a specific date
 * @param {string} habitId - Habit ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {boolean} Completion status
 */
function isHabitCompletedOnDate(habitId, date) {
  const habit = getHabitById(habitId);
  return habit ? habit.completions.includes(date) : false;
}

/**
 * Check if habit is completed today
 * @param {string} habitId - Habit ID
 * @returns {boolean} Completion status
 */
function isHabitCompletedToday(habitId) {
  return isHabitCompletedOnDate(habitId, getCurrentDate());
}

/**
 * Update streak for a habit
 * Based on PRD.md specifications for weekly goals
 * @param {Object} habit - Habit object to update
 */
function updateStreak(habit) {
  if (!habit || !habit.completions || habit.completions.length === 0) {
    habit.currentStreak = 0;
    habit.longestStreak = 0;
    return;
  }

  const weeks = groupCompletionsByWeek(habit.completions);
  let currentStreak = 0;
  let longestStreak = 0;

  // Iterate weeks from most recent backwards
  for (let i = weeks.length - 1; i >= 0; i--) {
    const week = weeks[i];
    const weekCount = week.completions.length;

    if (weekCount >= habit.frequencyTarget) {
      currentStreak += weekCount;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (i === weeks.length - 1) {
      // Current week hasn't met goal yet
      currentStreak = 0;
      break;
    } else {
      // Past week didn't meet goal, streak breaks
      break;
    }
  }

  habit.currentStreak = currentStreak;
  habit.longestStreak = longestStreak;
}

/**
 * Group completions by week (Monday-Sunday)
 * @param {Array} completions - Array of completion date strings
 * @returns {Array} Array of week objects with completions
 */
function groupCompletionsByWeek(completions) {
  const weeks = {};

  completions.forEach(dateStr => {
    const date = new Date(dateStr + 'T00:00:00');
    const weekNumber = getWeekNumber(date);
    const year = date.getFullYear();
    const key = `${year}-W${weekNumber}`;

    if (!weeks[key]) {
      weeks[key] = {
        year,
        week: weekNumber,
        completions: []
      };
    }

    weeks[key].completions.push(dateStr);
  });

  return Object.values(weeks).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.week - b.week;
  });
}

/**
 * Get ISO week number for a date
 * @param {Date} date - Date to get week number for
 * @returns {number} Week number (1-53)
 */
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get days of week with completion status
 * Returns the PAST 7 DAYS (including today)
 * @param {string} habitId - Habit ID
 * @param {Date} refDate - Reference date (default: today)
 * @returns {Array} Array of day objects for past 7 days
 */
function getWeekDays(habitId, refDate = new Date()) {
  const habit = getHabitById(habitId);
  if (!habit) return [];

  const days = [];
  const today = new Date(refDate);

  // Get past 7 days (including today)
  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);
    const dateStr = formatDate(currentDate);

    days.push({
      name: getDayName(currentDate),
      date: dateStr,
      completed: habit.completions.includes(dateStr),
      isToday: dateStr === getCurrentDate(),
      isDisabled: currentDate > new Date()
    });
  }

  return days;
}

/**
 * Get short day name from date
 * @param {Date} date - Date object
 * @returns {string} Short day name (Mon, Tue, etc.)
 */
function getDayName(date) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[date.getDay()];
}

/**
 * Get all days in the current month for calendar view
 * @param {string} habitId - Habit ID
 * @param {Date} referenceDate - Reference date (defaults to today)
 * @returns {Array} Array of week arrays with day objects
 */
function getMonthCalendar(habitId, referenceDate = new Date()) {
  const habit = getHabitById(habitId);
  if (!habit) return [];

  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  // Get first day of month
  const firstDay = new Date(year, month, 1);
  // Get last day of month
  const lastDay = new Date(year, month + 1, 0);

  // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
  let firstDayOfWeek = firstDay.getDay();
  // Convert to Monday = 0
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const days = [];
  const weeks = [];

  // Add padding days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(year, month - 1, day);
    const dateStr = formatDate(date);
    days.push({
      day: day,
      date: dateStr,
      isCurrentMonth: false,
      isToday: false,
      completed: false,
      isEditable: false
    });
  }

  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);
    const today = getCurrentDate();
    const isToday = dateStr === today;
    const isEditable = canEditDate(dateStr) && new Date(dateStr) <= new Date(today);

    days.push({
      day: day,
      date: dateStr,
      isCurrentMonth: true,
      isToday: isToday,
      completed: habit.completions.includes(dateStr),
      isEditable: isEditable
    });
  }

  // Add padding days from next month
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateStr = formatDate(date);
      days.push({
        day: day,
        date: dateStr,
        isCurrentMonth: false,
        isToday: false,
        completed: false,
        isEditable: false
      });
    }
  }

  // Group into weeks
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

/**
 * Get date range for habit detail calendar view
 * @param {string} habitId - Habit ID
 * @param {Date} startDate - Start date for range
 * @returns {Array} Array of dates with completion status
 */
function getDateRange(habitId, startDate) {
  const habit = getHabitById(habitId);
  if (!habit) return [];

  const dates = [];
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = formatDate(d);
    dates.push({
      date: dateStr,
      completed: habit.completions.includes(dateStr),
      day: d.getDate(),
      isToday: dateStr === getCurrentDate()
    });
  }

  return dates;
}

/**
 * Check if date can be edited (within 7 days)
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {boolean} Can be edited
 */
function canEditDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const diffTime = today - date;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

/**
 * Delete a habit
 * @param {string} habitId - Habit ID to delete
 * @returns {boolean} Success status
 */
function removeHabit(habitId) {
  return deleteHabit(habitId);
}

/**
 * Calculate total completions for a habit
 * @param {string} habitId - Habit ID
 * @returns {number} Total completions
 */
function getTotalCompletions(habitId) {
  const habit = getHabitById(habitId);
  return habit ? habit.completions.length : 0;
}

/**
 * Get completion statistics
 * @param {string} habitId - Habit ID
 * @returns {Object} Statistics object
 */
function getHabitStats(habitId) {
  const habit = getHabitById(habitId);

  if (!habit) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0
    };
  }

  return {
    currentStreak: habit.currentStreak || 0,
    longestStreak: habit.longestStreak || 0,
    totalCompletions: habit.completions.length
  };
}

/**
 * Get completion data for chart
 * @param {string} habitId - Habit ID
 * @returns {Object} Chart data object with labels and data
 */
function getChartData(habitId) {
  const habit = getHabitById(habitId);

  if (!habit) {
    return { labels: [], data: [] };
  }

  const startDate = new Date(habit.createdAt);
  const today = new Date();
  const labels = [];
  const data = [];

  // Generate all dates from creation to today
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = formatDate(d);
    labels.push(dateStr);
    data.push(habit.completions.includes(dateStr) ? 1 : 0);
  }

  return { labels, data };
}

/**
 * Handle dot click completion with animations and feedback
 * @param {string} habitId - Habit ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {HTMLElement} card - Habit card element
 */
function handleDotCompletion(habitId, date, card) {
  const habit = getHabitById(habitId);

  if (!habit) return;

  const wasCompleted = habit.completions.includes(date);

  // Toggle completion
  if (wasCompleted) {
    // Unmark completion
    unmarkHabitCompletion(habitId, date);
    renderHabits();
  } else {
    // Mark complete
    habit.completions.push(date);
    updateStreak(habit);
    updateHabit(habitId, habit);

    // Play completion feedback (vibration or sound)
    playCompletionFeedback();

    // Show darkening overlay
    showCompletionOverlay();

    // Add completion animation to card
    card.classList.add('completing');

    // Find the clicked dot and trigger animation
    const dots = card.querySelectorAll('.week-dot');
    dots.forEach(dot => {
      if (dot.dataset.date === date) {
        // Add filled class and animation
        dot.classList.add('filled');
        dot.classList.add('animating');

        // Trigger reflow to restart animation
        void dot.offsetWidth;
      }
    });

    // Update streak counter without full re-render
    const streakEl = card.querySelector('.streak-number');
    if (streakEl) {
      streakEl.textContent = habit.currentStreak;
    }

    setTimeout(() => {
      card.classList.remove('completing');
      hideCompletionOverlay();

      // Remove animation class after animation completes
      dots.forEach(dot => {
        if (dot.dataset.date === date) {
          dot.classList.remove('animating');
        }
      });
    }, 2000);
  }
}

/**
 * Show darkening overlay
 */
function showCompletionOverlay() {
  let overlay = document.getElementById('completion-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'completion-overlay';
    overlay.className = 'completion-overlay';
    document.body.appendChild(overlay);
  }
  setTimeout(() => overlay.classList.add('active'), 10);
}

/**
 * Hide darkening overlay
 */
function hideCompletionOverlay() {
  const overlay = document.getElementById('completion-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

/**
 * Play completion feedback (vibration or sound)
 */
function playCompletionFeedback() {
  // Try vibration first (works on mobile)
  if (navigator.vibrate) {
    navigator.vibrate(50); // Short haptic feedback
  }

  // Could add sound here in future
  // For now, just visual + haptic feedback
}

/**
 * Render habit card HTML
 * @param {Object} habit - Habit object
 * @returns {HTMLElement} Habit card element
 */
function createHabitCardElement(habit) {
  const card = document.createElement('div');
  card.className = 'habit-card';
  card.style.backgroundColor = habit.color;
  card.dataset.habitId = habit.id;

  const isCompletedToday = isHabitCompletedToday(habit.id);
  const completedClass = isCompletedToday ? 'completed' : '';

  const weekDays = getWeekDays(habit.id);
  // Reverse weekDays array so when row-reverse CSS is applied,
  // Sunday appears on the right (today's position)
  const weekDaysReversed = [...weekDays].reverse();

  const daysHtml = weekDaysReversed
    .map(day => {
      const filled = day.completed ? 'filled' : '';
      const svgCheck = `<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7 L6 10 L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="fill: none;"/>
      </svg>`;
      return `<div class="week-dot ${filled}" data-date="${day.date}">${svgCheck}</div>`;
    })
    .join('');

  // Format frequency for display
  const frequencyText = habit.frequencyTarget === 1 && habit.frequencyPeriod === 'day'
    ? 'Daily'
    : `${habit.frequencyTarget} time${habit.frequencyTarget > 1 ? 's' : ''} per ${habit.frequencyPeriod}`;

  card.innerHTML = `
    <div class="habit-card__header">
      <div class="habit-card__streak">
        <span class="streak-icon">⚡</span>
        <span class="streak-number">${habit.currentStreak}</span>
      </div>
      <div class="habit-card__dots">
        ${daysHtml}
      </div>
    </div>
    <div class="habit-card__body">
      <h3 class="habit-card__title">${escapeHtml(habit.name)}</h3>
      <p class="habit-card__duration">${frequencyText}</p>
    </div>
  `;

  // Add click handler for each week dot - use reversed array to match DOM order
  const dots = card.querySelectorAll('.week-dot');
  dots.forEach((dot, index) => {
    const dayData = weekDaysReversed[index];
    // Allow clicking any day (past, present, or future)
    dot.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent opening detail view
      handleDotCompletion(habit.id, dayData.date, card);
    });
  });

  // Add click handler for opening detail view (on card body)
  const cardBody = card.querySelector('.habit-card__body');
  if (cardBody) {
    cardBody.addEventListener('click', () => {
      openHabitDetail(habit.id);
    });
  }

  return card;
}

/**
 * Get past 7 days dates for header display
 * @returns {Array} Array of date numbers in ascending order
 */
function getWeekDateNumbers() {
  const dates = [];
  const today = new Date();

  // Get past 7 days (including today)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.getDate()); // Just the day number
  }

  return dates;
}

/**
 * Get day name abbreviations for the past 7 days
 * @returns {Array} Array of 2-letter day abbreviations
 */
function getWeekDayNames() {
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const days = [];
  const today = new Date();

  // Get past 7 days (including today)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(dayNames[date.getDay()]);
  }

  return days;
}

/**
 * Render all habits to the home screen
 */
function renderHabits() {
  const habits = getAllHabits();
  const container = document.getElementById('habits-list');

  if (!container) return;

  // Update header date numbers (always, even if no habits)
  updateHeaderDates();

  container.innerHTML = '';

  if (habits.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">➕</div>
        <h2 class="empty-state__title">No habits yet</h2>
        <p class="empty-state__subtitle">Tap the + button to create your first habit</p>
      </div>
    `;
    return;
  }

  habits.forEach(habit => {
    const card = createHabitCardElement(habit);
    container.appendChild(card);
  });
}

/**
 * Update header with week date numbers and day names
 */
function updateHeaderDates() {
  const dateIndicator = document.getElementById('date-indicator');
  if (!dateIndicator) return;

  const weekDates = getWeekDateNumbers();
  const weekDays = getWeekDayNames();

  const datesHtml = weekDates.map(date =>
    `<span class="header-date-number">${date}</span>`
  ).join('');

  const daysHtml = weekDays.map(day =>
    `<span class="header-day-name">${day}</span>`
  ).join('');

  dateIndicator.innerHTML = `
    <span class="header-month">${getMonthYear()}</span>
    <div class="header-dates">
      <div class="header-dates-row">${datesHtml}</div>
      <div class="header-days-row">${daysHtml}</div>
    </div>
  `;
}

/**
 * Open habit detail view
 * @param {string} habitId - Habit ID to display
 */
function openHabitDetail(habitId) {
  // This will be implemented in app.js with navigation logic
  const event = new CustomEvent('openHabitDetail', { detail: { habitId } });
  document.dispatchEvent(event);
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
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

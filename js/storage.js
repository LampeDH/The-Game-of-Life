/**
 * Storage Module
 * Game of Life Habit Tracker
 *
 * Handles all LocalStorage operations for data persistence.
 * Manages user profile, habits, and settings data.
 */

const STORAGE_KEY = 'gameOfLifeData';

/**
 * Initialize default data structure
 * Returns the data object with user, habits, and settings
 */
function initializeStorage() {
  try {
    const existingData = getData();
    if (existingData) {
      return existingData;
    }

    // Create default data structure
    const defaultData = {
      user: {
        name: 'User',
        goals: 'Build better habits and become my best self',
        createdAt: new Date().toISOString()
      },
      habits: [],
      settings: {
        theme: 'dark',
        notifications: true,
        completionSound: 'sonrie'
      }
    };

    saveData(defaultData);
    return defaultData;
  } catch (error) {
    console.error('Error initializing storage:', error);
    return null;
  }
}

/**
 * Get all data from LocalStorage
 * Returns the complete data object or null if not found
 */
function getData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from LocalStorage:', error);
    return null;
  }
}

/**
 * Save all data to LocalStorage
 * @param {Object} data - The data object to save
 */
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to LocalStorage:', error);
    return false;
  }
}

/**
 * Update user profile
 * @param {Object} updates - User object with fields to update
 */
function updateUser(updates) {
  try {
    const data = getData() || initializeStorage();
    if (data) {
      data.user = { ...data.user, ...updates };
      return saveData(data);
    }
    return false;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
}

/**
 * Get user profile
 * @returns {Object} User object
 */
function getUser() {
  try {
    const data = getData() || initializeStorage();
    return data ? data.user : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Get all habits
 * @returns {Array} Array of habit objects
 */
function getAllHabits() {
  try {
    const data = getData() || initializeStorage();
    return data ? data.habits : [];
  } catch (error) {
    console.error('Error getting habits:', error);
    return [];
  }
}

/**
 * Get single habit by ID
 * @param {string} habitId - The habit ID
 * @returns {Object|null} Habit object or null
 */
function getHabitById(habitId) {
  try {
    const habits = getAllHabits();
    return habits.find(h => h.id === habitId) || null;
  } catch (error) {
    console.error('Error getting habit:', error);
    return null;
  }
}

/**
 * Add new habit to storage
 * @param {Object} habit - Habit object to add
 * @returns {boolean} Success status
 */
function addHabit(habit) {
  try {
    const data = getData() || initializeStorage();
    if (data) {
      data.habits.push(habit);
      return saveData(data);
    }
    return false;
  } catch (error) {
    console.error('Error adding habit:', error);
    return false;
  }
}

/**
 * Update existing habit
 * @param {string} habitId - The habit ID to update
 * @param {Object} updates - Fields to update
 * @returns {boolean} Success status
 */
function updateHabit(habitId, updates) {
  try {
    const data = getData() || initializeStorage();
    if (data) {
      const habitIndex = data.habits.findIndex(h => h.id === habitId);
      if (habitIndex !== -1) {
        data.habits[habitIndex] = { ...data.habits[habitIndex], ...updates };
        return saveData(data);
      }
    }
    return false;
  } catch (error) {
    console.error('Error updating habit:', error);
    return false;
  }
}

/**
 * Delete habit from storage
 * @param {string} habitId - The habit ID to delete
 * @returns {boolean} Success status
 */
function deleteHabit(habitId) {
  try {
    const data = getData() || initializeStorage();
    if (data) {
      data.habits = data.habits.filter(h => h.id !== habitId);
      return saveData(data);
    }
    return false;
  } catch (error) {
    console.error('Error deleting habit:', error);
    return false;
  }
}

/**
 * Get app settings
 * @returns {Object} Settings object
 */
function getSettings() {
  try {
    const data = getData() || initializeStorage();
    return data ? data.settings : {};
  } catch (error) {
    console.error('Error getting settings:', error);
    return {};
  }
}

/**
 * Update app settings
 * @param {Object} updates - Settings to update
 * @returns {boolean} Success status
 */
function updateSettings(updates) {
  try {
    const data = getData() || initializeStorage();
    if (data) {
      data.settings = { ...data.settings, ...updates };
      return saveData(data);
    }
    return false;
  } catch (error) {
    console.error('Error updating settings:', error);
    return false;
  }
}

/**
 * Clear all data from storage
 * @returns {boolean} Success status
 */
function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Export all data as JSON string
 * @returns {string} JSON data string
 */
function exportData() {
  try {
    const data = getData();
    return data ? JSON.stringify(data, null, 2) : '';
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Current date string
 */
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date object to YYYY-MM-DD string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get month and year string
 * @param {Date} date - Date to format
 * @returns {string} Month year string (e.g., "November")
 */
function getMonthYear(date = new Date()) {
  const options = { month: 'long' };
  return date.toLocaleDateString('en-US', options);
}

// Initialize storage on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
});

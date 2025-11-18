/**
 * Avatar Module
 * Game of Life Habit Tracker
 *
 * Handles avatar progression and visualization:
 * - Avatar slider/carousel
 * - Progress calculation
 * - Milestone tracking
 * - Visual effects based on progress
 */

/**
 * Calculate overall progress percentage
 * Formula: (Total completions) / (Total possible completions)
 * @returns {number} Progress percentage (0-100)
 */
function calculateOverallProgress() {
  const habits = getAllHabits();

  if (habits.length === 0) {
    return 0;
  }

  let totalCompletions = 0;
  let totalPossible = 0;

  habits.forEach(habit => {
    const daysSinceCreation = getDaysSinceCreation(habit.createdAt);
    const expectedCompletions = calculateExpectedCompletions(
      habit.frequencyTarget,
      habit.frequencyPeriod,
      daysSinceCreation
    );

    totalCompletions += habit.completions.length;
    totalPossible += expectedCompletions;
  });

  if (totalPossible === 0) {
    return 0;
  }

  return (totalCompletions / totalPossible) * 100;
}

/**
 * Get days since habit creation
 * @param {string} createdAt - ISO date string
 * @returns {number} Days since creation
 */
function getDaysSinceCreation(createdAt) {
  const created = new Date(createdAt);
  const today = new Date();
  const diffTime = today - created;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Calculate expected completions based on frequency
 * @param {number} target - Target number (e.g., 3)
 * @param {string} period - Time period (e.g., "week", "day", "month")
 * @param {number} days - Number of days
 * @returns {number} Expected completions
 */
function calculateExpectedCompletions(target, period, days) {
  let periodsElapsed = 0;

  switch (period) {
    case 'day':
      periodsElapsed = days;
      break;
    case 'week':
      periodsElapsed = Math.ceil(days / 7);
      break;
    case 'month':
      periodsElapsed = Math.ceil(days / 30);
      break;
    default:
      periodsElapsed = Math.ceil(days / 7);
  }

  return target * periodsElapsed;
}

/**
 * Get progress milestone level (25%, 50%, 75%, 100%)
 * @param {number} progress - Progress percentage
 * @returns {number} Milestone number (0-4)
 */
function getProgressMilestone(progress) {
  if (progress >= 100) return 4;
  if (progress >= 75) return 3;
  if (progress >= 50) return 2;
  if (progress >= 25) return 1;
  return 0;
}

/**
 * Check if milestone has been reached
 * @param {number} progress - Progress percentage
 * @param {number} milestone - Milestone number (1-4)
 * @returns {boolean} Milestone reached
 */
function isMilestoneReached(progress, milestone) {
  const requiredProgress = milestone * 25;
  return progress >= requiredProgress;
}

/**
 * Get avatar transformation effect level
 * Based on progress percentage
 * @param {number} progress - Progress percentage
 * @returns {Object} Effect object with properties
 */
function getAvatarEffect(progress) {
  if (progress >= 100) {
    return {
      level: 4,
      glowSize: '8px',
      glowOpacity: 0.9,
      glowColor: 'rgba(80, 227, 194, 0.9)',
      borderColor: 'rgba(80, 227, 194, 0.9)',
      animation: 'shine'
    };
  }

  if (progress >= 75) {
    return {
      level: 3,
      glowSize: '6px',
      glowOpacity: 0.7,
      glowColor: 'rgba(74, 144, 226, 0.7)',
      borderColor: 'rgba(74, 144, 226, 0.5)',
      animation: 'none'
    };
  }

  if (progress >= 50) {
    return {
      level: 2,
      glowSize: '4px',
      glowOpacity: 0.5,
      glowColor: 'rgba(74, 144, 226, 0.5)',
      borderColor: 'transparent',
      animation: 'none'
    };
  }

  if (progress >= 25) {
    return {
      level: 1,
      glowSize: '2px',
      glowOpacity: 0.3,
      glowColor: 'rgba(74, 144, 226, 0.3)',
      borderColor: 'transparent',
      animation: 'none'
    };
  }

  return {
    level: 0,
    glowSize: '0px',
    glowOpacity: 0,
    glowColor: 'transparent',
    borderColor: 'transparent',
    animation: 'none'
  };
}

/**
 * Initialize avatar slider
 * Sets up swipe detection and navigation
 */
function initializeAvatarSlider() {
  const slider = document.getElementById('avatar-slider');
  if (!slider) return;

  let touchStartX = 0;
  let touchEndX = 0;
  let currentSlide = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, false);

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSliderSwipe();
  }, false);

  function handleSliderSwipe() {
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide < 1) {
        // Swipe left - next slide
        currentSlide++;
        updateSlider();
      } else if (diff < 0 && currentSlide > 0) {
        // Swipe right - previous slide
        currentSlide--;
        updateSlider();
      }
    }
  }

  function updateSlider() {
    const slides = slider.querySelectorAll('.avatar-slide');
    const dots = document.querySelectorAll('.avatar-dot');

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
}

/**
 * Render avatar view
 */
function renderAvatarView() {
  const avatarContent = document.getElementById('avatar-content');
  if (!avatarContent) return;

  const progress = calculateOverallProgress();
  const milestone = getProgressMilestone(progress);

  avatarContent.innerHTML = `
    <div class="avatar-section">
      <div class="avatar-slider" id="avatar-slider">
        <div class="avatar-slide">
          <img src="images/current-avatar.png" alt="Current Self" class="avatar-image" id="current-avatar">
        </div>
        <div class="avatar-slide">
          <img src="images/future-avatar.png" alt="Future Self" class="avatar-image">
        </div>
      </div>

      <div class="avatar-indicators">
        <div class="avatar-dot active"></div>
        <div class="avatar-dot"></div>
      </div>
    </div>

    <div class="progress-section">
      <h3 class="progress-label">Overall Progress</h3>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: ${progress}%"></div>
        <span class="progress-text">${progress.toFixed(1)}%</span>
      </div>
    </div>

    <div class="milestones-section">
      <div class="milestone-marker ${isMilestoneReached(progress, 1) ? 'reached' : ''}">
        <div class="milestone-number">25%</div>
        <div class="milestone-icon">${isMilestoneReached(progress, 1) ? '✓' : '○'}</div>
      </div>
      <div class="milestone-marker ${isMilestoneReached(progress, 2) ? 'reached' : ''}">
        <div class="milestone-number">50%</div>
        <div class="milestone-icon">${isMilestoneReached(progress, 2) ? '✓' : '○'}</div>
      </div>
      <div class="milestone-marker ${isMilestoneReached(progress, 3) ? 'reached' : ''}">
        <div class="milestone-number">75%</div>
        <div class="milestone-icon">${isMilestoneReached(progress, 3) ? '✓' : '○'}</div>
      </div>
      <div class="milestone-marker ${isMilestoneReached(progress, 4) ? 'reached' : ''}">
        <div class="milestone-number">100%</div>
        <div class="milestone-icon">${isMilestoneReached(progress, 4) ? '✓' : '○'}</div>
      </div>
    </div>

    <div class="goals-section">
      <h3 class="goals-title">Your Goals</h3>
      <p class="goals-text">${escapeHtml(getUser()?.goals || 'Set your goals to stay motivated')}</p>
    </div>
  `;

  // Update avatar image effects
  updateAvatarEffects(progress);

  // Initialize slider
  initializeAvatarSlider();
}

/**
 * Update avatar image visual effects based on progress
 * @param {number} progress - Progress percentage
 */
function updateAvatarEffects(progress) {
  const avatarImage = document.getElementById('current-avatar');
  if (!avatarImage) return;

  const effect = getAvatarEffect(progress);

  // Update box-shadow (glow effect)
  avatarImage.style.boxShadow = `0 0 ${effect.glowSize} ${effect.glowColor}`;

  // Update border if applicable
  if (effect.borderColor !== 'transparent') {
    avatarImage.style.border = `2px solid ${effect.borderColor}`;
  }

  // Update data attribute for CSS animations
  avatarImage.dataset.progress = effect.level * 25;

  // Add animation class if needed
  if (effect.animation === 'shine') {
    avatarImage.classList.add('avatar-shine');
  } else {
    avatarImage.classList.remove('avatar-shine');
  }
}

/**
 * Handle avatar view tab switch
 * Updates progress and effects when returning to avatar tab
 */
function refreshAvatarView() {
  const avatarContent = document.getElementById('avatar-content');
  if (avatarContent && avatarContent.querySelector('.avatar-slider')) {
    renderAvatarView();
  }
}

// Initialize avatar view on page load
document.addEventListener('DOMContentLoaded', () => {
  renderAvatarView();
});

# ROADMAP.md - Game of Life Habit Tracker

## Implementation Roadmap

**Project:** The Game of Life  
**Version:** 1.0 (MVP)  
**Date:** 2024-11-13  
**Total Estimated Time:** 3-4 weeks (10-15 hours/week)

---

## Overview

This roadmap breaks down the MVP into 3 main phases, with each task taking approximately 1-2 hours. Tasks are designed to be completed sequentially, with each building on the previous work.

**Development Approach:**
1. Start with Phase 1 foundation
2. Test each task in browser before moving to next
3. Commit working code after completing each task
4. Refer to DESIGN.md for visual specifications
5. Refer to PRD.md for functionality requirements

---

## Phase 1: Core Habit Tracking
**Goal:** Build the essential habit tracking functionality  
**Duration:** 1-2 weeks  
**Outcome:** Users can create habits, mark them complete, and see streaks

---

### Task 1.1: Project Setup & Structure
**Estimated Time:** 1 hour

**Deliverables:**
- Create file structure according to CLAUDE.md
- Set up HTML boilerplate with meta tags and viewport
- Create CSS variables file with color palette and spacing system
- Link all CSS and JS files
- Add favicon and app metadata

**Files to Create:**
- `/index.html`
- `/css/variables.css`
- `/css/styles.css`
- `/js/app.js`
- `/js/habits.js`
- `/js/storage.js`
- `/js/avatar.js`

**Testing:**
- Open index.html in browser
- Verify page loads with no console errors
- Check CSS variables are accessible

**Success Criteria:**
- Clean file structure
- All files linked correctly
- No 404 errors in console

---

### Task 1.2: Build Bottom Navigation Bar
**Estimated Time:** 1.5 hours

**Deliverables:**
- Create HTML structure for 3-tab navigation (Habits | Avatar | Settings)
- Style navigation bar according to DESIGN.md specs
- Implement active/inactive tab states
- Add tab switching functionality (show/hide corresponding views)
- Make navigation fixed to bottom
- Add safe area padding for iOS home indicator

**Files to Modify:**
- `/index.html` - Add nav HTML
- `/css/styles.css` - Navigation styles
- `/js/app.js` - Tab switching logic

**Testing:**
- Tap each tab
- Verify active state changes
- Check layout on different screen sizes
- Test iOS safe area on iPhone simulator/device

**Success Criteria:**
- Navigation fixed to bottom
- Tabs switch views correctly
- Active state visual feedback works
- Mobile-optimized touch targets (64px height)

---

### Task 1.3: Build Home Screen Layout & Header
**Estimated Time:** 1 hour

**Deliverables:**
- Create main habits view container
- Add page header with "Habits" title
- Add "+" button in header (top-right)
- Add date indicator ("November")
- Style according to DESIGN.md
- Implement basic scrolling for habit list area

**Files to Modify:**
- `/index.html` - Home screen structure
- `/css/styles.css` - Header and layout styles

**Testing:**
- View home screen
- Verify header layout
- Check responsive behavior
- Verify scrollable area works

**Success Criteria:**
- Clean header with title and add button
- Proper spacing and typography
- Date displays correctly
- Scrollable content area

---

### Task 1.4: Create Habit Card Component (Static)
**Estimated Time:** 1.5 hours

**Deliverables:**
- Build HTML structure for habit card
- Implement card styling with color backgrounds (use one test color)
- Add streak badge (top-left with lightning icon)
- Add week dots display (top-right, 7 circles)
- Add habit name and duration text
- Add shadows and hover states
- Make card responsive

**Files to Modify:**
- `/index.html` - Add sample habit card HTML
- `/css/styles.css` - Habit card styles

**Testing:**
- View sample card on home screen
- Verify all elements positioned correctly
- Check mobile touch target size
- Test different text lengths (name overflow)

**Success Criteria:**
- Card matches DESIGN.md specifications (96px height, 12px radius)
- All elements visible and styled correctly
- Responsive to screen width
- Touch-friendly

---

### Task 1.5: LocalStorage Setup & Data Model
**Estimated Time:** 1.5 hours

**Deliverables:**
- Implement LocalStorage wrapper functions (get, set, clear)
- Define data structure (user object, habits array)
- Create initialization function (set defaults if empty)
- Add error handling for LocalStorage operations
- Create helper functions (generateId, getCurrentDate)

**Files to Modify:**
- `/js/storage.js` - All LocalStorage operations

**Code Structure:**
```javascript
// storage.js
const STORAGE_KEY = 'gameOfLifeData';

function getData() { }
function saveData(data) { }
function initializeStorage() { }
function clearAllData() { }
```

**Testing:**
- Open DevTools → Application → LocalStorage
- Verify initial data structure is created
- Test saveData and getData functions
- Verify error handling (try in private mode)

**Success Criteria:**
- Data persists across page refreshes
- Clean error handling
- Data structure matches PRD.md schema
- Functions return expected values

---

### Task 1.6: Create Habit Modal (Structure & Styling)
**Estimated Time:** 2 hours

**Deliverables:**
- Build full-screen modal HTML structure
- Implement multi-step form layout (essential fields + collapsible advanced)
- Style all form inputs according to DESIGN.md
- Add "I want to" text input with focus state
- Add frequency selector (X times per week)
- Add duration inputs (optional)
- Add collapsible "Advanced Options" section
- Add reminder time picker and day selector
- Style CREATE button
- Add modal open/close animations

**Files to Modify:**
- `/index.html` - Modal HTML structure
- `/css/styles.css` - Modal and form styles
- `/js/app.js` - Modal open/close functions

**Testing:**
- Click "+" button to open modal
- Verify modal slides up from bottom
- Test all form inputs
- Verify collapsible section works
- Test close functionality (X button, outside click)

**Success Criteria:**
- Modal opens smoothly
- All form fields functional
- Mobile-optimized layout
- Proper keyboard handling
- Close animations work

---

### Task 1.7: Habit Creation Logic & Validation
**Estimated Time:** 2 hours

**Deliverables:**
- Implement form validation (required fields)
- Create habit object from form data
- Generate unique ID for new habit
- Assign random color from 10-color palette
- Initialize empty completions array
- Save new habit to LocalStorage
- Close modal after successful creation
- Clear form after submission
- Handle validation errors (show error messages)

**Files to Modify:**
- `/js/habits.js` - Habit creation logic
- `/js/storage.js` - Add habit save function
- `/js/app.js` - Wire up CREATE button

**Testing:**
- Create habit with all fields filled
- Try submitting empty form (should show errors)
- Verify habit saves to LocalStorage
- Create multiple habits (verify random colors)
- Check habit appears in storage

**Success Criteria:**
- Form validation works correctly
- Habit object matches data structure
- Unique IDs generated
- Colors assigned randomly
- Data persists in LocalStorage
- Modal closes after creation

---

### Task 1.8: Render Habits List Dynamically
**Estimated Time:** 1.5 hours

**Deliverables:**
- Load habits from LocalStorage on page load
- Render habit cards dynamically (loop through habits array)
- Display habit name, duration, color
- Show streak counter (0 initially)
- Show week dots (all empty initially)
- Handle empty state (no habits yet message)
- Update DOM when new habit is created

**Files to Modify:**
- `/js/habits.js` - Render functions
- `/js/app.js` - Initialize on page load

**Code Structure:**
```javascript
function renderHabits() {
  const habits = getHabitsFromStorage();
  const container = document.getElementById('habits-list');
  container.innerHTML = '';
  
  if (habits.length === 0) {
    showEmptyState();
    return;
  }
  
  habits.forEach(habit => {
    const card = createHabitCard(habit);
    container.appendChild(card);
  });
}
```

**Testing:**
- Create a habit, verify it renders
- Create multiple habits, verify all render
- Delete all habits (via DevTools), verify empty state
- Refresh page, verify habits persist

**Success Criteria:**
- Habits load on page load
- Each card displays correct data
- Empty state shows when no habits
- Performance is smooth (even with 20+ habits)

---

### Task 1.9: Implement Habit Completion Logic
**Estimated Time:** 2 hours

**Deliverables:**
- Add click handler to habit cards
- Detect completion checkbox click
- Toggle completion for current day
- Update completions array in habit object
- Update week dots visual state
- Show completion animation (checkmark fade + card bounce)
- Play sound OR trigger vibration
- Update streak counter
- Save changes to LocalStorage immediately
- Prevent multiple completions in same day

**Files to Modify:**
- `/js/habits.js` - Completion logic
- `/css/styles.css` - Completion animations

**Completion Logic:**
```javascript
function markHabitComplete(habitId) {
  const today = getCurrentDate(); // 'YYYY-MM-DD'
  const habit = getHabitById(habitId);
  
  if (!habit.completions.includes(today)) {
    habit.completions.push(today);
    updateStreak(habit);
    saveHabit(habit);
    playCompletionFeedback();
    updateUI(habitId);
  }
}
```

**Testing:**
- Click habit card
- Verify week dot fills in
- Verify checkmark animation plays
- Listen for sound (if volume on)
- Check LocalStorage updates
- Refresh page, verify completion persists
- Try completing same habit twice (should not duplicate)

**Success Criteria:**
- Completion toggles on click
- Visual feedback is immediate
- Sound/vibration works
- Data persists correctly
- Streak updates properly
- Performance is smooth

---

### Task 1.10: Streak Calculation Logic
**Estimated Time:** 2 hours

**Deliverables:**
- Implement streak calculation for "X times per week" habits
- Calculate current streak (consecutive days meeting weekly goal)
- Calculate longest streak (historical best)
- Handle week boundaries (Monday-Sunday)
- Update streak after each completion
- Display streak on habit cards
- Handle streak breaks properly

**Streak Algorithm:**
```javascript
function calculateStreak(habit) {
  // Week runs Monday-Sunday
  // Streak = consecutive days with completions
  // As long as weekly goal is met
  // If week goal not met, streak breaks
  
  const { completions, frequencyTarget } = habit;
  const weeks = groupCompletionsByWeek(completions);
  
  let currentStreak = 0;
  let longestStreak = 0;
  
  // Iterate weeks from most recent backwards
  for (let week of weeks.reverse()) {
    const weekCount = week.completions.length;
    
    if (weekCount >= frequencyTarget) {
      currentStreak += weekCount;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      // Goal not met this week, streak breaks
      break;
    }
  }
  
  return { currentStreak, longestStreak };
}
```

**Files to Modify:**
- `/js/habits.js` - Streak calculation

**Testing:**
- Create habit "3 times per week"
- Complete Mon, Wed, Fri (3/3) → Streak: 3
- Next week complete Mon, Tue, Wed, Thu (4/3) → Streak: 7
- Next week complete only Mon, Tue (2/3) → Streak: 0 (broken)
- Verify longest streak is remembered
- Test edge cases (new habit, no completions)

**Success Criteria:**
- Streak calculation matches PRD.md logic
- Current streak accurate
- Longest streak tracked correctly
- Performance is good (even with 6+ months data)
- Edge cases handled

---

### Task 1.11: Calendar View Component
**Estimated Time:** 2 hours

**Deliverables:**
- Create calendar display for habit detail view
- Show horizontal week view (like Onrise)
- Display current week by default
- Show completion dots for completed days
- Add month/week navigation arrows
- Highlight today's date
- Make dates tappable (for editing past 7 days)
- Style according to DESIGN.md

**Files to Create/Modify:**
- `/index.html` - Add calendar HTML structure
- `/css/styles.css` - Calendar styles
- `/js/habits.js` - Calendar rendering logic

**Testing:**
- View calendar on habit detail screen
- Verify current week shows
- Navigate to previous/next weeks
- Tap completed days (should show filled dot)
- Tap future days (should not be tappable)
- Verify today is highlighted

**Success Criteria:**
- Calendar displays correctly
- Navigation works smoothly
- Completion dots render accurately
- Performance is smooth
- Mobile-optimized

---

### Task 1.12: Habit Detail View Screen
**Estimated Time:** 2 hours

**Deliverables:**
- Create habit detail view (replaces home screen)
- Add back button to return to home
- Display habit name in header
- Show 3 stat cards (Current Streak, Longest Streak, Total Completions)
- Integrate calendar component (Task 1.11)
- Add edit and delete buttons at bottom
- Handle navigation (open detail view on card tap)
- Style according to DESIGN.md

**Files to Modify:**
- `/index.html` - Detail view structure
- `/css/styles.css` - Detail view styles
- `/js/app.js` - Navigation logic
- `/js/habits.js` - Detail view rendering

**Testing:**
- Tap habit card from home screen
- Verify detail view opens
- Check all stats display correctly
- Tap back button, return to home
- View multiple different habits

**Success Criteria:**
- Smooth navigation between views
- All data displays accurately
- Stats update in real-time
- Layout matches DESIGN.md
- Back button works

---

### Task 1.13: Edit Past Completions (7-day window)
**Estimated Time:** 1.5 hours

**Deliverables:**
- Enable tapping calendar dates to toggle completion
- Only allow editing past 7 days (plus today)
- Disable dates older than 7 days (gray out)
- Update completions array when toggling
- Recalculate streaks after edits
- Show visual feedback on toggle
- Save changes to LocalStorage

**Files to Modify:**
- `/js/habits.js` - Edit completion logic

**Testing:**
- Open habit detail calendar
- Tap yesterday → should toggle completion
- Tap 8 days ago → should not be tappable
- Toggle completion on/off multiple times
- Verify streak recalculates correctly
- Refresh page, verify edits persisted

**Success Criteria:**
- 7-day window enforced
- Toggle works smoothly
- Streaks recalculate accurately
- Data persists
- Visual feedback clear

---

### Task 1.14: Delete Habit Functionality
**Estimated Time:** 1 hour

**Deliverables:**
- Add delete button on habit detail view
- Show confirmation dialog ("Are you sure?")
- Implement Yes/No buttons
- Remove habit from LocalStorage on confirm
- Return to home screen after deletion
- Update habits list (remove deleted card)
- Style confirmation dialog according to DESIGN.md

**Files to Modify:**
- `/index.html` - Confirmation dialog HTML
- `/css/styles.css` - Dialog styles
- `/js/habits.js` - Delete logic
- `/js/app.js` - Dialog handling

**Testing:**
- Tap delete button
- Verify confirmation shows
- Click "No" → dialog closes, habit remains
- Click "Yes" → habit deleted, return to home
- Verify habit removed from LocalStorage
- Refresh page, verify habit still deleted

**Success Criteria:**
- Confirmation dialog appears
- Both buttons work correctly
- Habit fully removed from storage
- UI updates immediately
- No console errors

---

### Task 1.15: Edit Habit Functionality
**Estimated Time:** 1.5 hours

**Deliverables:**
- Add edit button on habit detail view
- Open creation modal pre-filled with habit data
- Allow editing all fields (name, duration, frequency, reminders)
- Update habit object on save
- Preserve habit ID and completions array
- Close modal and return to detail view
- Update UI with edited data

**Files to Modify:**
- `/js/habits.js` - Edit logic
- `/js/app.js` - Modal pre-fill logic

**Testing:**
- Open habit detail
- Click edit button
- Verify form pre-fills with current data
- Change habit name
- Save changes
- Verify habit updates everywhere
- Refresh page, verify changes persist

**Success Criteria:**
- Edit modal opens with current data
- All fields editable
- Changes save correctly
- UI updates reflect changes
- Completions array preserved

---

### Task 1.16: Theme Toggle (Dark/Light Mode)
**Estimated Time:** 1.5 hours

**Deliverables:**
- Add theme toggle in Settings tab
- Create light theme CSS variables
- Implement theme switching (data-theme attribute on html)
- Save theme preference to LocalStorage
- Load saved theme on page load
- Smooth transition between themes
- Test all components in both themes

**Files to Modify:**
- `/css/variables.css` - Light theme variables
- `/index.html` - Settings toggle HTML
- `/js/app.js` - Theme switching logic

**CSS Structure:**
```css
:root {
  --bg-primary: #0f0f0f; /* dark */
}

[data-theme="light"] {
  --bg-primary: #ffffff; /* light */
}
```

**Testing:**
- Open Settings tab
- Toggle theme switch
- Verify all colors change
- Check readability in both themes
- Refresh page, verify theme persists
- Test on all screens (home, detail, avatar)

**Success Criteria:**
- Smooth theme transitions
- All components readable in both themes
- Theme preference persists
- No flash of wrong theme on load
- Matches DESIGN.md specifications

---

### Task 1.17: Clear All Data Functionality
**Estimated Time:** 1 hour

**Deliverables:**
- Add "Clear All Data" button in Settings
- Style button in red (warning color)
- Show confirmation dialog with warning message
- Implement Yes/No buttons
- Clear all LocalStorage on confirm
- Reset app to initial state
- Show empty state on home screen

**Files to Modify:**
- `/index.html` - Settings button + dialog
- `/css/styles.css` - Warning dialog styles
- `/js/storage.js` - Clear function
- `/js/app.js` - Reset UI logic

**Testing:**
- Create several habits
- Go to Settings
- Click "Clear All Data"
- Verify scary warning shows
- Click "No" → nothing happens
- Click "Yes" → all data cleared
- Verify home screen shows empty state
- Check LocalStorage is empty

**Success Criteria:**
- Warning dialog is clear and scary
- Confirmation prevents accidental deletion
- All data removed on confirm
- UI resets properly
- No console errors

---

### Phase 1 Testing & Polish
**Estimated Time:** 2-3 hours

**Deliverables:**
- Test entire Phase 1 flow end-to-end
- Fix any bugs discovered
- Optimize performance (if needed)
- Ensure mobile responsiveness on multiple devices
- Test on iOS Safari and Android Chrome
- Verify all Phase 1 success criteria met
- Commit stable code to GitHub

**Testing Checklist:**
- [ ] Create habit → appears on home screen
- [ ] Mark complete → visual feedback + saves
- [ ] Streak calculates correctly
- [ ] Calendar shows completions
- [ ] Edit past 7 days works
- [ ] Edit habit saves changes
- [ ] Delete habit removes completely
- [ ] Theme toggle works
- [ ] Clear data resets app
- [ ] Data persists across refreshes
- [ ] No console errors
- [ ] Mobile responsive

---

## Phase 2: Avatar System
**Goal:** Implement avatar display and progression visualization  
**Duration:** 1 week  
**Outcome:** Users see their avatar transformation based on progress

---

### Task 2.1: Avatar Images Setup
**Estimated Time:** 30 minutes

**Deliverables:**
- Create `/images` folder
- Add current-avatar.png (your created image)
- Add future-avatar.png (your created image)
- Optimize images (compress to <150KB each)
- Update data structure with avatar URLs
- Initialize user object in LocalStorage with avatar paths

**Files to Create:**
- `/images/current-avatar.png`
- `/images/future-avatar.png`

**Files to Modify:**
- `/js/storage.js` - Add user object initialization

**Testing:**
- Verify images load in browser
- Check file sizes
- Open DevTools, verify user object in LocalStorage

**Success Criteria:**
- Both images present and optimized
- Images display without errors
- URLs stored correctly

---

### Task 2.2: Avatar View Layout & Structure
**Estimated Time:** 1.5 hours

**Deliverables:**
- Create Avatar tab view HTML structure
- Build swipeable slider container
- Add 2 slide elements (current avatar, future avatar)
- Add dot indicators below slider (2 dots)
- Add progress bar section below avatars
- Add milestone markers section
- Add goals text section
- Style according to DESIGN.md (400px slider height, centered)

**Files to Modify:**
- `/index.html` - Avatar view structure
- `/css/styles.css` - Avatar view styles

**Testing:**
- Navigate to Avatar tab
- Verify layout structure
- Check responsive behavior
- Verify placeholder content displays

**Success Criteria:**
- Clean layout matching DESIGN.md
- All sections visible
- Mobile-optimized spacing
- Properly centered

---

### Task 2.3: Avatar Slider Functionality
**Estimated Time:** 2 hours

**Deliverables:**
- Implement touch swipe detection (left/right)
- Animate slide transitions (smooth spring animation)
- Update dot indicators on slide change
- Load and display actual avatar images
- Add elastic bounce at edges
- Optimize for mobile performance
- Support mouse drag on desktop (optional)

**Files to Modify:**
- `/js/avatar.js` - Slider logic
- `/css/styles.css` - Transition animations

**Swipe Detection:**
```javascript
let touchStartX = 0;
let touchEndX = 0;

element.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

element.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) { // threshold
    if (diff > 0) {
      // Swipe left
      nextSlide();
    } else {
      // Swipe right
      prevSlide();
    }
  }
}
```

**Testing:**
- Swipe left on avatar → shows future avatar
- Swipe right → returns to current avatar
- Verify dots update
- Test bounce at edges
- Check smooth animations
- Test on different devices

**Success Criteria:**
- Smooth swipe gestures
- Proper slide transitions
- Dot indicators sync correctly
- No lag or jank
- Works on touch and mouse

---

### Task 2.4: Overall Progress Calculation
**Estimated Time:** 1.5 hours

**Deliverables:**
- Calculate overall progress percentage
- Formula: (Total completions) / (Total possible completions)
- Handle multiple habits with different creation dates
- Update calculation when habits are completed
- Handle edge cases (no habits, new habits)
- Display percentage accurately

**Files to Modify:**
- `/js/avatar.js` - Progress calculation logic

**Algorithm:**
```javascript
function calculateOverallProgress() {
  const habits = getAllHabits();
  
  if (habits.length === 0) return 0;
  
  let totalCompletions = 0;
  let totalPossible = 0;
  
  habits.forEach(habit => {
    const daysSinceCreation = getDaysSince(habit.createdAt);
    const expectedCompletions = calculateExpectedCompletions(
      habit.frequencyTarget,
      habit.frequencyPeriod,
      daysSinceCreation
    );
    
    totalCompletions += habit.completions.length;
    totalPossible += expectedCompletions;
  });
  
  return (totalCompletions / totalPossible) * 100;
}
```

**Testing:**
- Create habit "3 times/week", complete 2 times → ~66% for that habit
- Create second habit, verify overall percentage updates
- Complete habits, watch progress increase
- Delete habit, verify recalculation
- Edge case: Brand new habit (0/0) → should handle gracefully

**Success Criteria:**
- Accurate percentage calculation
- Updates in real-time
- Handles edge cases
- Performance is good
- Matches PRD.md formula

---

### Task 2.5: Progress Bar Display & Animation
**Estimated Time:** 1 hour

**Deliverables:**
- Render progress bar with calculated percentage
- Add fill animation (smooth gradient)
- Display percentage text (right-aligned)
- Update bar when progress changes
- Style according to DESIGN.md (12px height, gradient fill)
- Add loading animation on initial render

**Files to Modify:**
- `/js/avatar.js` - Progress bar rendering
- `/css/styles.css` - Progress bar styles

**Testing:**
- Open Avatar tab
- Verify progress bar shows correct percentage
- Complete a habit
- Return to Avatar tab, verify bar updated
- Test with 0%, 50%, 100% progress
- Check animation smoothness

**Success Criteria:**
- Bar fills accurately to percentage
- Smooth animations
- Gradient looks good
- Text is readable
- Updates reflect changes

---

### Task 2.6: Milestone Markers Display
**Estimated Time:** 1 hour

**Deliverables:**
- Create 4 milestone cards (25%, 50%, 75%, 100%)
- Show checkmark for achieved milestones
- Show empty circle for not-yet-achieved
- Style achieved vs. not-achieved states
- Update when progress crosses milestones
- Add horizontal scroll if needed on small screens

**Files to Modify:**
- `/js/avatar.js` - Milestone rendering
- `/css/styles.css` - Milestone card styles

**Testing:**
- At 0% progress → all circles empty
- Complete habits to reach 26% → first milestone shows checkmark
- Reach 51% → second milestone achieved
- Verify visual state changes
- Test horizontal scroll on narrow screens

**Success Criteria:**
- Milestones render correctly
- Achieved state clear and satisfying
- Updates happen automatically
- Mobile-friendly layout

---

### Task 2.7: Avatar Transformation Effects
**Estimated Time:** 2 hours

**Deliverables:**
- Implement CSS effects at each milestone
- 25%: Subtle glow (2px, 30% opacity)
- 50%: Stronger glow (4px, 50% opacity)
- 75%: Bright glow + border highlight (6px, 70% opacity)
- 100%: Intense glow + shine animation (8px, 90% opacity)
- Apply effects to current avatar image
- Animate effect changes smoothly
- Test performance on mobile

**Files to Modify:**
- `/css/styles.css` - Avatar effect styles
- `/js/avatar.js` - Apply effects based on progress

**CSS Effects:**
```css
.avatar-image {
  transition: box-shadow 0.5s ease;
}

.avatar-image[data-progress="25"] {
  box-shadow: 0 0 2px rgba(74, 144, 226, 0.3);
}

.avatar-image[data-progress="50"] {
  box-shadow: 0 0 4px rgba(74, 144, 226, 0.5);
}

.avatar-image[data-progress="75"] {
  box-shadow: 0 0 6px rgba(74, 144, 226, 0.7);
  border: 2px solid rgba(74, 144, 226, 0.5);
}

.avatar-image[data-progress="100"] {
  box-shadow: 0 0 8px rgba(80, 227, 194, 0.9);
  animation: shine 2s infinite;
}

@keyframes shine {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}
```

**Testing:**
- View avatar at different progress levels
- Verify glow intensity increases
- Check 100% shine animation
- Test on mobile (no performance issues)
- Verify effects look good on both avatars

**Success Criteria:**
- Effects visible and attractive
- Smooth transitions between milestones
- No performance lag
- Works on both dark/light themes
- Matches DESIGN.md specifications

---

### Task 2.8: Goals Display Section
**Estimated Time:** 45 minutes

**Deliverables:**
- Add goals text section below milestones
- Load user's goals from LocalStorage
- Display in styled container (italics, secondary color)
- Make scrollable if text is long
- Add "Edit Goals" functionality (optional for now)
- Style according to DESIGN.md

**Files to Modify:**
- `/js/avatar.js` - Goals rendering
- `/css/styles.css` - Goals section styles

**Testing:**
- Navigate to Avatar tab
- Verify goals text displays
- Test with long text (scrolling)
- Test with short text
- Verify styling matches design

**Success Criteria:**
- Goals display correctly
- Readable and well-styled
- Scrollable if needed
- Matches DESIGN.md layout

---

### Task 2.9: Avatar View Real-time Updates
**Estimated Time:** 1 hour

**Deliverables:**
- Update progress bar when returning to Avatar tab
- Recalculate progress when habits completed
- Update milestone states automatically
- Update avatar effects if milestone crossed
- Optimize calculation (don't recalculate unnecessarily)
- Add smooth transition animations

**Files to Modify:**
- `/js/avatar.js` - Update logic
- `/js/app.js` - Tab switch triggers

**Testing:**
- Open Avatar tab (note progress)
- Go to Habits tab, complete a habit
- Return to Avatar tab
- Verify progress increased
- Verify milestone updated if crossed
- Check avatar effect updated
- Test performance (should be instant)

**Success Criteria:**
- Real-time updates work
- No lag when switching tabs
- Calculations are accurate
- Smooth animations
- No unnecessary recalculations

---

### Phase 2 Testing & Polish
**Estimated Time:** 1-2 hours

**Deliverables:**
- Test entire avatar system end-to-end
- Verify slider works on all devices
- Test progress calculation accuracy
- Verify milestone logic
- Check transformation effects at all levels
- Test theme switching on Avatar tab
- Fix any bugs discovered
- Optimize avatar image loading
- Commit stable code to GitHub

**Testing Checklist:**
- [ ] Slider swipes smoothly
- [ ] Dots update correctly
- [ ] Progress bar accurate
- [ ] Milestones trigger at right percentages
- [ ] Avatar effects look good
- [ ] Goals display correctly
- [ ] Real-time updates work
- [ ] No console errors
- [ ] Mobile performance good
- [ ] Works in both themes

---

## Phase 3: Progress Visualization
**Goal:** Add graphs and detailed statistics  
**Duration:** 1 week  
**Outcome:** Users see visual progress over time with charts

---

### Task 3.1: Chart.js Integration
**Estimated Time:** 30 minutes

**Deliverables:**
- Add Chart.js library to project (CDN or local)
- Create chart container in habit detail view
- Test basic chart rendering
- Set up responsive chart configuration

**Files to Modify:**
- `/index.html` - Add Chart.js script tag
- `/index.html` - Add canvas element for chart

**CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

**Testing:**
- Open habit detail view
- Verify Chart.js loads (check console)
- Render a test chart
- Check responsive behavior

**Success Criteria:**
- Chart.js loads without errors
- Canvas element present
- Library accessible globally

---

### Task 3.2: Prepare Chart Data
**Estimated Time:** 1.5 hours

**Deliverables:**
- Create function to process completions into chart data
- Generate date labels (all dates since habit creation)
- Create data points (1 for complete, 0 for incomplete)
- Handle gaps in data (missing dates)
- Format dates for display (e.g., "Nov 7", "Nov 8")
- Optimize for performance (handle 6+ months of data)

**Files to Modify:**
- `/js/habits.js` - Chart data preparation

**Data Structure:**
```javascript
function prepareChartData(habit) {
  const startDate = new Date(habit.createdAt);
  const today = new Date();
  
  const labels = [];
  const data = [];
  
  // Generate all dates from creation to today
  for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = formatDate(d);
    labels.push(dateStr);
    data.push(habit.completions.includes(dateStr) ? 1 : 0);
  }
  
  return { labels, data };
}
```

**Testing:**
- Create habit with 2 weeks of completions
- Verify date range is correct (creation to today)
- Verify data points match completions
- Test with habits of different ages
- Check performance with old habits (6+ months)

**Success Criteria:**
- Accurate date range
- Correct data points
- Efficient processing
- Handles edge cases

---

### Task 3.3: Render Line Graph
**Estimated Time:** 2 hours

**Deliverables:**
- Configure Chart.js line chart
- Set chart colors (use habit card color)
- Configure responsive settings
- Add grid lines (subtle)
- Format axes labels
- Set chart height (200px)
- Add tooltips on hover
- Style according to DESIGN.md

**Files to Modify:**
- `/js/habits.js` - Chart rendering function
- `/css/styles.css` - Chart container styles

**Chart Configuration:**
```javascript
function renderChart(habit) {
  const { labels, data } = prepareChartData(habit);
  const ctx = document.getElementById('habit-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Completions',
        data: data,
        borderColor: habit.color,
        backgroundColor: habit.color + '20', // 20% opacity
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 1,
            callback: (value) => value === 1 ? 'Done' : 'Missed'
          }
        }
      }
    }
  });
}
```

**Testing:**
- Open habit detail view
- Verify chart renders
- Check data visualization is accurate
- Hover over points (verify tooltips)
- Resize browser (verify responsive)
- Test on mobile
- Test with different data patterns

**Success Criteria:**
- Chart renders correctly
- Colors match habit card
- Responsive on all screens
- Tooltips show correct info
- Readable and clean

---

### Task 3.4: Optimize Graph Performance
**Estimated Time:** 1 hour

**Deliverables:**
- Limit data points shown (e.g., last 90 days max)
- Add pagination for older data (optional)
- Lazy load chart (only render when detail view opens)
- Destroy chart when leaving view (prevent memory leaks)
- Optimize re-renders

**Files to Modify:**
- `/js/habits.js` - Chart lifecycle management

**Testing:**
- Create habit with 6+ months data
- Open detail view multiple times
- Check memory usage (DevTools Performance)
- Verify chart loads quickly
- Test on lower-end mobile device

**Success Criteria:**
- Chart loads in <500ms
- No memory leaks
- Smooth performance on mobile
- Handles large datasets

---

### Task 3.5: Statistics Cards Display
**Estimated Time:** 1 hour

**Deliverables:**
- Create 3 stat cards UI (already partially done in Task 1.12)
- Calculate and display Current Streak
- Calculate and display Longest Streak
- Calculate and display Total Completions
- Update cards when data changes
- Add subtle animations on value changes
- Style cards according to DESIGN.md

**Files to Modify:**
- `/js/habits.js` - Stats calculation and display

**Testing:**
- Open habit detail
- Verify all 3 stats show correct values
- Complete a habit, return to detail
- Verify stats updated
- Test with various habits (new, old, high streaks)

**Success Criteria:**
- Stats display accurately
- Update in real-time
- Clean visual design
- No calculation errors

---

### Task 3.6: Mobile Optimization & Touch Interactions
**Estimated Time:** 1 hour

**Deliverables:**
- Optimize chart for touch interactions
- Add pinch-to-zoom (optional)
- Improve tooltip visibility on mobile
- Test all views on actual mobile devices
- Fix any mobile-specific issues
- Ensure 60fps animations

**Files to Modify:**
- `/css/styles.css` - Mobile optimizations
- `/js/habits.js` - Touch event handling

**Testing:**
- Test on iPhone (Safari)
- Test on Android (Chrome)
- Verify touch targets are 44px+
- Test scrolling performance
- Test all gestures (tap, swipe, scroll)
- Check landscape orientation

**Success Criteria:**
- Smooth on actual devices
- No jank or lag
- Touch targets adequate
- Works in both orientations

---

### Phase 3 Testing & Polish
**Estimated Time:** 1-2 hours

**Deliverables:**
- Test all Phase 3 features end-to-end
- Verify charts render correctly across browsers
- Test with various data patterns
- Optimize any slow areas
- Fix bugs discovered
- Cross-browser testing
- Commit stable code to GitHub

**Testing Checklist:**
- [ ] Charts render on all browsers
- [ ] Stats calculate correctly
- [ ] Graph shows accurate data
- [ ] Mobile performance good
- [ ] No console errors
- [ ] Memory leaks fixed
- [ ] Responsive on all screens
- [ ] Works with Phase 1 & 2 features

---

## Phase 4: Final Polish & Deployment
**Goal:** Bug fixes, optimization, and launch  
**Duration:** 2-3 days  
**Outcome:** Production-ready app deployed to GitHub Pages

---

### Task 4.1: Cross-browser Testing
**Estimated Time:** 2 hours

**Deliverables:**
- Test on Chrome (desktop + mobile)
- Test on Safari (desktop + iOS)
- Test on Firefox
- Test on Edge
- Document browser-specific issues
- Fix critical bugs
- Add fallbacks for unsupported features

**Testing Matrix:**
- [ ] Chrome Desktop
- [ ] Chrome Android
- [ ] Safari Desktop
- [ ] Safari iOS
- [ ] Firefox Desktop
- [ ] Edge Desktop

**Success Criteria:**
- Works on all major browsers
- No critical bugs
- Fallbacks in place

---

### Task 4.2: Accessibility Audit
**Estimated Time:** 1.5 hours

**Deliverables:**
- Add ARIA labels to interactive elements
- Test keyboard navigation
- Verify focus indicators visible
- Test with screen reader (VoiceOver or NVDA)
- Check color contrast ratios (WCAG AA)
- Add skip links if needed
- Fix any accessibility issues

**Testing:**
- Navigate app using only keyboard
- Tab through all interactive elements
- Use screen reader to navigate
- Check focus visibility
- Test form labels

**Success Criteria:**
- Keyboard navigation works
- Screen reader friendly
- Contrast ratios pass WCAG AA
- Focus indicators visible

---

### Task 4.3: Performance Optimization
**Estimated Time:** 1.5 hours

**Deliverables:**
- Minimize CSS and JS files
- Optimize images (compress further if needed)
- Lazy load Chart.js (only when needed)
- Add service worker for offline support (optional)
- Test load times on 3G connection
- Optimize LocalStorage operations
- Fix any performance bottlenecks

**Tools:**
- Chrome DevTools Lighthouse
- Network throttling
- Performance profiler

**Testing:**
- Run Lighthouse audit
- Test on slow connection
- Measure load times
- Check runtime performance

**Success Criteria:**
- Lighthouse score >90
- Loads in <2s on 3G
- No jank or lag
- Smooth animations

---

### Task 4.4: Bug Fixes & Edge Cases
**Estimated Time:** 2 hours

**Deliverables:**
- Test all edge cases systematically
- Fix any bugs discovered
- Handle error states gracefully
- Add loading states where needed
- Improve error messages
- Test with unusual data (very old habits, 50+ habits, etc.)

**Edge Cases to Test:**
- No habits created
- 50+ habits
- Habit created 2 years ago
- Complete same habit 100+ times
- Switch themes rapidly
- Clear data and recreate
- Browser in private mode

**Success Criteria:**
- All edge cases handled
- No crashes or errors
- Graceful degradation

---

### Task 4.5: Final UI Polish
**Estimated Time:** 1.5 hours

**Deliverables:**
- Review all screens for visual consistency
- Fine-tune spacing and alignment
- Improve micro-interactions
- Add any missing animations
- Verify all colors match DESIGN.md
- Check typography consistency
- Final design review

**Testing:**
- Compare against DESIGN.md
- Check both themes
- Verify on multiple devices
- Review with fresh eyes

**Success Criteria:**
- Visually polished
- Consistent across app
- Matches design specs
- No obvious flaws

---

### Task 4.6: Documentation & README
**Estimated Time:** 1 hour

**Deliverables:**
- Write comprehensive README.md
- Add project description
- Include setup instructions
- Document features
- Add screenshots
- Credit technologies used
- Add license (MIT)

**README Structure:**
```markdown
# Game of Life - Habit Tracker

Transform your habits into your future self.

## Features
- Track unlimited habits
- Visual avatar progression
- Streak tracking
- Progress graphs
- Dark/light mode

## Technologies
- Vanilla JavaScript
- HTML5 & CSS3
- Chart.js
- LocalStorage API

## Setup
1. Clone repository
2. Open index.html in browser
3. Start tracking!

## License
MIT
```

**Success Criteria:**
- Clear, professional README
- Easy to understand
- Includes screenshots
- Proper formatting

---

### Task 4.7: GitHub Pages Deployment
**Estimated Time:** 30 minutes

**Deliverables:**
- Push all code to GitHub repository
- Enable GitHub Pages in repo settings
- Configure to deploy from main branch
- Test deployed version
- Fix any deployment issues
- Update README with live link

**Steps:**
1. Go to repo Settings
2. Navigate to Pages section
3. Select source: main branch
4. Save
5. Wait for deployment
6. Test at: `https://[username].github.io/The-Game-of-Life`

**Testing:**
- Visit deployed URL
- Verify everything works
- Test on mobile device
- Check console for errors

**Success Criteria:**
- App deployed successfully
- All features work on live site
- No broken links or resources
- Accessible publicly

---

### Task 4.8: Final Testing & Launch Checklist
**Estimated Time:** 1 hour

**Deliverables:**
- Complete final testing checklist
- Verify all MVP features implemented
- Test complete user journey
- Fix any last-minute issues
- Create release notes
- Announce completion

**Final Checklist:**
- [ ] All Phase 1 features work
- [ ] All Phase 2 features work
- [ ] All Phase 3 features work
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Accessible
- [ ] Performant
- [ ] Deployed successfully
- [ ] README complete
- [ ] No critical bugs

**Success Criteria:**
- All checklist items complete
- Ready for real-world use
- Proud of the result!

---

## Post-MVP: Future Enhancements

**Not in scope for MVP, but potential Phase 5+ features:**

### Enhancement Ideas (Prioritized)
1. **Completion Sounds** (P2)
   - Add audio feedback library
   - Multiple sound options (chimes, dings, etc.)
   - User can select preferred sound

2. **Export Data** (P2)
   - Download habits as JSON
   - Download as CSV for spreadsheet analysis
   - Email export option

3. **Habit Categories** (P2)
   - Group habits (Health, Productivity, etc.)
   - Filter by category
   - Category-based stats

4. **Advanced Time Ranges** (P2)
   - Toggle graph view: 7 days / 30 days / All time
   - Date range picker
   - Compare time periods

5. **Habit Templates** (P3)
   - Common habits pre-configured
   - Quick setup from template library
   - Community-shared templates

6. **Habit Buddy** (P3)
   - Share habit with friend
   - Mutual accountability
   - See friend's progress

7. **Achievement Badges** (P3)
   - Unlock badges at milestones
   - "7-day streak" badge
   - "30-day master" badge
   - Badge display showcase

8. **Custom Avatar Creator** (P4)
   - In-app avatar customization
   - Choose features (hair, clothes, etc.)
   - Real-time preview

9. **Cloud Sync** (P4)
   - Requires backend (Firebase, Supabase)
   - Multi-device sync
   - Account system
   - Backup to cloud

10. **Progressive Web App** (P4)
    - Add manifest.json
    - Service worker for offline
    - Install as app on phone
    - Push notifications

---

## Development Best Practices

### Before Starting Each Task:
1. Read task description fully
2. Review relevant sections in DESIGN.md and PRD.md
3. Plan approach (think before coding)
4. Identify files to modify

### During Development:
1. Write clean, commented code
2. Test in browser frequently
3. Check console for errors
4. Verify mobile responsiveness
5. Check both dark/light themes

### After Completing Each Task:
1. Test success criteria
2. Fix any bugs discovered
3. Commit to GitHub with clear message
4. Move to next task

### Git Commit Messages:
```
✅ Task 1.1: Project setup complete
✨ Task 1.5: LocalStorage implementation
🐛 Fix: Streak calculation edge case
💄 Polish: Improve button animations
📝 Docs: Update README with screenshots
```

---

## Estimated Timeline Summary

**Phase 1: Core Habit Tracking**
- 17 tasks
- ~25-30 hours
- 2 weeks (part-time)

**Phase 2: Avatar System**
- 9 tasks
- ~12-15 hours
- 1 week (part-time)

**Phase 3: Progress Visualization**
- 6 tasks
- ~8-10 hours
- 1 week (part-time)

**Phase 4: Polish & Deploy**
- 8 tasks
- ~10-12 hours
- 3 days (part-time)

**Total MVP: 40 tasks, 55-67 hours, 3-4 weeks**

---

## Success Metrics

**MVP is complete when:**
- [ ] All 40 tasks checked off
- [ ] All PRD.md requirements met
- [ ] All DESIGN.md specs implemented
- [ ] Deployed to GitHub Pages
- [ ] You use it daily for 1 week
- [ ] Zero critical bugs
- [ ] Friends/family can try it

**The ultimate success:** You built your first complete app from scratch! 🎉

---

## Appendix

### Related Documents
- CLAUDE.md - Project context and guidelines
- PRD.md - Product requirements
- DESIGN.md - UI/UX specifications

### Tools & Resources
- Browser DevTools
- GitHub Desktop (optional)
- VS Code or text editor
- Chart.js documentation
- MDN Web Docs

### Version History
- v1.0 (2024-11-13) - Initial roadmap

---

**Status:** Ready for development  
**Next Step:** Start with Task 1.1 (Project Setup)

🚀 **Let's build this!**

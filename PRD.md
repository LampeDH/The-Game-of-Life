# PRD.md - Game of Life Habit Tracker

## Product Requirements Document

**Project:** The Game of Life  
**Version:** 1.0 (MVP)  
**Date:** 2024-11-13  
**Author:** M8  
**Framework:** S.L.C. (Simple, Lovable, Complete)  

---

## 1. Overview

### What We're Building
A minimalist mobile-first habit tracking application that visualizes personal growth through avatar transformation. Users track daily habits and watch their "current self" avatar gradually transform into their "future self" avatar as they maintain streaks and build consistent routines.

### Target User
- **Primary:** Self (M8) - personal use for habit building and coding practice
- **Secondary:** Future users who want visual motivation for habit formation
- **Demographics:** Adults interested in self-improvement, visual learners, people motivated by progress visualization

### Core Problem We're Solving
Traditional habit trackers feel disconnected from real-life transformation. Users complete checkboxes but don't feel the deeper connection between daily actions and long-term identity change. Game of Life bridges this gap with visual avatar progression that represents actual personal growth.

---

## 2. Objectives

### Primary Goal
Create a functional habit tracker MVP that successfully links daily habit completion to visual avatar transformation, making the abstract concept of "becoming your future self" tangible and motivating.

### Success Metrics (How We'll Know It Works)
- [ ] App loads and works on mobile browser (primary test device)
- [ ] User can create and track at least 3 habits
- [ ] Data persists across browser sessions (LocalStorage works)
- [ ] Avatar transformation is visually noticeable at 25%, 50%, 75%, 100% completion
- [ ] Calendar view accurately shows completion history
- [ ] No critical bugs that prevent core functionality

### What Makes This Different
- **Unique avatar system** - Not just badges or points, but visual self-transformation
- **Minimalist design** - Clean, distraction-free interface focused on the essentials
- **Personal connection** - Uses YOUR actual avatars representing YOUR goals
- **No account required** - Works offline, private, simple

---

## 3. User Stories & Key Scenarios

### Epic 1: Initial Setup
**As a new user, I want to set up my profile so I can begin tracking my transformation.**

- I upload/add my current self avatar
- I upload/add my future self avatar  
- I write down my goals and aspirations
- I see both avatars displayed with 0% progress

**Acceptance Criteria:**
- Avatar images display correctly on mobile
- Goals are saved and visible
- Setup flow is intuitive (no confusion about what to do next)

---

### Epic 2: Habit Management
**As a user, I want to create and manage habits so I can track the behaviors that lead to my future self.**

#### User Story 2.1: Create New Habit
- I tap "Add Habit" or "+" button
- I enter habit name (e.g., "Meditate")
- I set duration/target (e.g., "10 minutes")
- I choose frequency (X times per week - flexible)
- Color is automatically assigned randomly from predefined palette
- I optionally set a reminder time
- Habit appears on my home screen

**Acceptance Criteria:**
- Form is easy to use on mobile
- All fields save correctly
- New habit appears immediately

#### User Story 2.2: Edit Habit
- I tap on a habit card
- I can modify name, duration, frequency, color, reminders
- Changes are saved

#### User Story 2.3: Delete Habit
- I can delete a habit from the habit detail view
- System asks "Are you sure?" with Yes/No confirmation
- Upon confirmation, habit and all its data are removed

---

### Epic 3: Daily Habit Tracking
**As a user, I want to mark habits as complete each day so I can build streaks and progress toward my future self.**

#### User Story 3.1: Mark Habit Complete
- I see today's date and all my habits on the home screen
- I tap a checkbox/circle next to each habit
- Visual feedback: checkmark animation
- Audio feedback: Satisfying sound (if device volume is on)
- Haptic feedback: Vibration (if device is in silent mode)
- The habit card shows it's completed for today
- My streak counter updates

**Acceptance Criteria:**
- Tap target is large enough for mobile (44px minimum)
- Completion is instant (no lag)
- Visual feedback is clear
- Cannot complete the same habit multiple times in one day (unless that's the design?)

#### User Story 3.2: View Completion History
- I tap on a habit card to see its detail view
- I see a calendar showing all past completions
- I see my current streak and longest streak
- I can edit completions for the past 7 days only (up to one week back)
- Cannot edit completions older than 7 days

---

### Epic 4: Avatar Progression
**As a user, I want to see my avatar transform as I complete habits so I feel motivated by visual progress.**

#### User Story 4.1: View Avatar Progress
- I navigate to Avatar/Progress view (separate tab)
- I see my current avatar displayed by default
- I can swipe right to reveal my future avatar
- Two dots indicator shows which avatar I'm viewing (current vs future)
- I see a percentage or progress bar showing overall completion
- Visual effects show the transformation in progress (glow, highlights at milestones)

#### User Story 4.2: Track Overall Progress
- Overall progress calculated as: (Total Completions) / (Total Possible Completions across all habits)
- Example: Habit 1 completed 7/10 days + Habit 2 completed 3/5 days = 10/15 = 66.7% overall
- At 25%, 50%, 75%, 100% milestones, visual effects intensify (glow, border, highlights)
- Two avatars only: Current self and Future self (no intermediate avatars for MVP)
- Default timeframe: 1 year from creation
- Visual transformation through CSS effects, not multiple avatar images

---

### Epic 5: Progress Insights
**As a user, I want to see my progress over time so I understand my patterns and stay motivated.**

#### User Story 5.1: View Individual Habit Graph
- From habit detail view, I see a line graph showing completions over time
- Graph displays all-time history (from habit creation to present)
- No time range toggles in MVP - keep it simple
- I can see trends (improving, declining, consistent)

#### User Story 5.2: View Statistics
- Display exactly 3 key metrics per habit:
  1. **Current Streak** - Days in a row meeting weekly goal
  2. **Longest Streak** - Best streak ever achieved
  3. **Total Completions** - All-time completion count
- No percentages, rates, or complex calculations
- Stats are easy to understand at a glance

**Streak Logic for "X times per week" habits:**
- Streak = consecutive days with completions, as long as weekly goal is met
- Week runs Monday-Sunday
- Streak continues if weekly goal is met (e.g., 3/3 times)
- Streak increases if goal is exceeded (e.g., 5/3 times = 5 days added to streak)
- Streak breaks only if weekly goal is not met by Sunday
- Example: Week 1 (Mon✅Wed✅Fri✅ = 3 days streak) → Week 2 (Mon✅Tue✅Wed✅Thu✅ = 7 days streak) → Week 3 (Mon✅Tue✅ only = streak broken, resets to 0)

---

## 4. Feature Requirements

### MVP Features (Phase 1-3) - MUST HAVE

#### Phase 1: Core Habit Tracking
**Priority:** P0 (Critical)

| Feature | Description | Status |
|---------|-------------|--------|
| Home Screen | Display all habits as colored cards | Required |
| Add Habit | Create new habit with name, duration, frequency (X times/week) | Required |
| Edit Habit | Modify habit details | Required |
| Delete Habit | Remove habit with confirmation | Required |
| Daily Completion | Checkbox to mark habit complete for today | Required |
| Completion Feedback | Visual + sound (or vibration in silent mode) | Required |
| Calendar View | See completion history for each habit | Required |
| Edit Past Days | Mark completions up to 7 days back | Required |
| Streak Counter | Show current streak and longest streak | Required |
| LocalStorage | All data persists across sessions | Required |
| Theme Toggle | Switch between dark/light mode (default: dark) | Required |
| Clear Data | "Clear All Data" button with Yes/No confirmation | Required |

**Technical Notes:**
- Must work offline
- No authentication needed
- Mobile-responsive design required

---

#### Phase 2: Avatar System
**Priority:** P0 (Critical - Core Differentiator)

| Feature | Description | Status |
|---------|-------------|--------|
| Avatar Setup | Place pre-created avatar images in /images folder | Required |
| Avatar Display | Slider interface: swipe between current/future avatars | Required |
| Slider Indicators | Two dots showing which avatar is displayed | Required |
| Progress Calculation | (Total completions) / (Total possible completions) | Required |
| Transformation Effect | CSS visual effects at 25%, 50%, 75%, 100% milestones | Required |
| Progress View | Dedicated screen/tab for avatar and progress | Required |

**Technical Notes:**
- Static images (PNG/JPG)
- CSS-only animations (no heavy libraries)
- Must perform well on mobile

---

#### Phase 3: Progress Visualization
**Priority:** P1 (High - Adds Value)

| Feature | Description | Status |
|---------|-------------|--------|
| Habit Detail View | Expanded view for individual habit | Required |
| Line Graph | Chart showing completion over all-time | Required |
| Statistics Display | Current streak, longest streak, total completions | Required |

**Technical Notes:**
- Use Chart.js library
- Responsive charts for mobile

---

### Future Features (Post-MVP) - NICE TO HAVE

| Feature | Priority | Description |
|---------|----------|-------------|
| Completion Sound | P2 | Audio feedback when marking complete |
| Habit Categories | P2 | Group habits (Health, Productivity, etc.) |
| Habit Buddy | P3 | Invite friend to track same habit |
| Export Data | P2 | Download habit data as JSON/CSV |
| Achievement Badges | P3 | Unlock badges at milestones |
| Custom Avatar Creator | P4 | In-app avatar creation tool |
| Theme Toggle | P0 | Dark/light mode switch (default: dark) | Required |
| Notifications | P2 | Browser notifications for reminders |
| Multi-device Sync | P4 | Requires backend/cloud storage |

---

## 5. Technical Approach

### Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** LocalStorage API (browser-based)
- **Charts:** Chart.js library
- **Hosting:** GitHub Pages
- **Version Control:** Git + GitHub

### Browser Support
- **Primary:** Mobile Chrome (Android), Mobile Safari (iOS)
- **Secondary:** Desktop Chrome, Firefox, Safari, Edge
- **Minimum:** Modern browsers with ES6 support

### Performance Requirements
- Page load: < 2 seconds on 3G connection
- Interactions: < 100ms response time
- LocalStorage operations: < 50ms

---

## 6. Design & UX Requirements

### Design Principles
1. **Simple** - Clear hierarchy, minimal clicks to complete actions
2. **Lovable** - Smooth animations, delightful micro-interactions
3. **Complete** - Every feature works properly, no half-implemented functionality

### Inspiration Source
Onrise app provides design inspiration for:
- Card-based habit layout
- Calendar visualization patterns
- Modal-based creation flows
- Clean typography and spacing

**Note:** Visual design (colors, exact styling) will be determined in DESIGN.md

### Mobile-First Requirements
- Touch targets minimum 44x44px
- Readable text (16px minimum body text)
- Works in portrait orientation primarily
- Thumb-friendly navigation placement

---

## 7. Data & Privacy

### Data Storage
- All data stored locally in browser (LocalStorage)
- No data sent to servers
- No user accounts or authentication
- Privacy by design - data never leaves device

### Data Structure
See CLAUDE.md for detailed JSON schema

### Data Retention
- Data persists until user clears browser data
- [QUESTION: Should we add a "Clear All Data" option in settings?]
- No automatic data deletion

---

## 8. Scope & Timeline

### In Scope for MVP
✅ Single-user habit tracking  
✅ Avatar transformation visualization  
✅ Calendar and graph views  
✅ LocalStorage persistence  
✅ Mobile-optimized interface  

### Out of Scope for MVP
❌ Multi-user/accounts  
❌ Cloud sync  
❌ Native mobile apps  
❌ Social features  
❌ AI-generated avatars (using pre-made avatars)  
❌ Complex animations  

### Estimated Timeline
- **Phase 1:** 1-2 weeks (Core habit tracking)
- **Phase 2:** 1 week (Avatar system)
- **Phase 3:** 1 week (Graphs and insights)
- **Total MVP:** 3-4 weeks of focused development

**Note:** Timeline assumes part-time work (10-15 hours/week)

---

## 9. Assumptions & Constraints

### Assumptions
- Users have modern smartphones with browsers
- Users understand basic habit tracking concepts
- Users can create their own avatar images externally
- Single user per browser/device is acceptable for MVP

### Constraints
- No budget for paid services
- No backend/server infrastructure
- Must work offline
- Developer is learning JavaScript while building
- Mobile device is primary development/testing platform

### Dependencies
- GitHub for hosting (free)
- Chart.js library (free, MIT license)
- Browser LocalStorage API (built-in)
- Gemini API for avatar creation (user already has access)

---

## 10. Success Criteria

### Definition of Done (MVP Complete)
- [ ] All Phase 1-3 features implemented and working
- [ ] Tested on primary mobile device (no critical bugs)
- [ ] Data persists correctly across sessions
- [ ] Avatar transformation is visually compelling
- [ ] Code is documented and clean
- [ ] Deployed to GitHub Pages
- [ ] README.md written for public repo

### User Acceptance
- I (M8) use the app daily for at least 1 week
- Habit tracking feels smoother than pen and paper
- Avatar progression feels motivating
- No frustrating bugs or UX issues

---

## Appendix

### Related Documents
- CLAUDE.md - Project context and development guidelines
- DESIGN.md - UI/UX specifications (to be created)
- ROADMAP.md - Implementation tasks (to be created)

### Version History
- v1.0 (2024-11-13) - Initial PRD with all decisions finalized

---

**Status:** Finalized - Ready for DESIGN.md

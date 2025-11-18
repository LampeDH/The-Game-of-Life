# CLAUDE.md - Game of Life Habit Tracker

## Project Overview

**Name:** The Game of Life  
**Type:** Habit tracking application with avatar progression system  
**Framework Philosophy:** S.L.C. (Simple, Lovable, Complete)  
**Stage:** MVP Development  
**Developer:** M8 (AI Automation Specialist at AIMAZE, based in Netherlands)

## Core Concept

A minimalist habit tracker where users visualize their personal growth through avatar transformation. As users maintain habit streaks, their "current self" avatar gradually transforms into their "future self" avatar - creating a direct visual link between daily actions and long-term aspirations.

## Developer Context

**Technical Background:**
- Strong knowledge: HTML, CSS, JSON, data structures
- Learning through doing: JavaScript, programming fundamentals
- Professional focus: AI automation, visual no-code platforms
- Approach: Solve problems as they arise, not afraid of new languages

**Learning Goals:**
- Master JavaScript fundamentals by building real features
- Understand browser-based data persistence (LocalStorage)
- Create production-quality UI with clean, modern design
- Build complete project from concept to deployed application

## Technology Stack

### Core Technologies (LOCKED)
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with variables, flexbox, grid
- **Vanilla JavaScript** - No frameworks for MVP
- **LocalStorage API** - Client-side data persistence
- **GitHub Pages** - Free hosting and deployment

### Libraries (Approved for specific features)
- **Chart.js** - For progress graphs (Phase 3)
- **None others initially** - Add only when absolutely necessary

### Why No Python/Backend?
- Habit tracking works perfectly client-side
- LocalStorage sufficient for single-user MVP
- Immediate browser testing (no server setup)
- Faster iteration and learning
- Free deployment with GitHub Pages

## Design Philosophy

### Visual Style (Inspired by Onrise)
- **Clean and minimalist** - Focus on usability and clarity
- **Modern aesthetic** - Contemporary design patterns
- **Flexible theming** - Support for both light and dark modes
- **Card-based layout** - Individual habit cards with visual distinction
- **Mobile-first** - Optimized for phone screens, scales to desktop

### UI Inspiration (Not Exact Copy)
Taking inspiration from Onrise app:
- Card-based habit display
- Calendar view with completion markers
- Clean typography and spacing
- Bottom navigation pattern
- Modal-based creation flows

**Note:** Colors, exact styling, and visual details to be determined during design phase. Not copying Onrise exactly.

## Avatar System

### Implementation Approach (MVP)
- **Static images** - Pre-created in Gemini AI
- **Two states:** Current self avatar + Future self avatar
- **Transformation:** CSS-based visual effects (opacity, overlay, glow)
- **Storage:** Image files in `/images` directory
- **File names:** `current-avatar.png` and `future-avatar.png`

### Why Static Images for MVP?
- Simple to implement
- Fast loading
- Works on all devices
- Maintains minimalist aesthetic
- Can upgrade to 3D/dynamic later if needed

### Avatar Progression Logic
- Calculate overall completion percentage across all habits
- Visual effects intensify as percentage increases
- At key milestones (25%, 50%, 75%, 100%), show visual upgrades
- Smooth transitions, not jarring changes

## Development Workflow

### Planning Phase (ALWAYS DO FIRST)
1. **Understand the feature** - What are we building and why?
2. **Review existing code** - What's already there?
3. **Plan approach** - How will this integrate?
4. **Identify files** - What needs to be created/modified?
5. **Only then code** - Never jump straight to implementation

### Coding Phase
- **One feature at a time** - Complete before moving to next
- **Small, testable changes** - Can verify each step works
- **Explain as you go** - Comment code for learning
- **Test in browser** - Open HTML file after each significant change

### Session Management
- **One task per session** - Clear focus and scope
- **Use /clear** - Between unrelated tasks to save tokens
- **Commit regularly** - Push working code to GitHub frequently

## Code Standards

### File Structure
```
/The-Game-of-Life
├── index.html              # Main app entry point
├── css/
│   ├── styles.css          # Main stylesheet
│   └── variables.css       # CSS custom properties (colors, fonts)
├── js/
│   ├── app.js              # Main application logic
│   ├── habits.js           # Habit management functions
│   ├── storage.js          # LocalStorage operations
│   └── avatar.js           # Avatar progression logic
├── images/
│   ├── current-avatar.png  # User's current self
│   └── future-avatar.png   # User's aspirational self
├── docs/
│   ├── CLAUDE.md           # This file
│   ├── PRD.md              # Product requirements
│   ├── DESIGN.md           # UI/UX specifications
│   └── ROADMAP.md          # Implementation plan
└── README.md               # Public project description
```

### JavaScript Conventions
- **Use ES6+ features** - const/let, arrow functions, template literals
- **Descriptive names** - `calculateStreakCount()` not `calc()`
- **Comment generously** - Explain WHY, not just WHAT
- **Error handling** - Try/catch for LocalStorage operations
- **No global pollution** - Use modules or IIFEs to encapsulate

### CSS Conventions
- **CSS Variables** - Define colors, fonts, spacing in `:root`
- **Mobile-first** - Base styles for mobile, media queries for desktop
- **BEM-like naming** - `.habit-card`, `.habit-card__title`, `.habit-card--active`
- **Flexbox/Grid** - Modern layout methods, no floats
- **Smooth transitions** - Use CSS transitions for hover/active states

### HTML Conventions
- **Semantic elements** - `<header>`, `<main>`, `<nav>`, `<section>`
- **Accessibility** - ARIA labels where needed, keyboard navigation
- **No inline styles** - All styling in CSS files
- **Data attributes** - Use `data-*` for JavaScript hooks

## Data Structure

### LocalStorage Schema
```json
{
  "user": {
    "name": "M8",
    "currentAvatarUrl": "images/current-avatar.png",
    "futureAvatarUrl": "images/future-avatar.png",
    "goals": "Get fitter, build better routines, be more productive",
    "createdAt": "2024-11-13T16:00:00Z"
  },
  "habits": [
    {
      "id": "habit-1",
      "name": "Pray",
      "duration": "1 Minute",
      "color": "#b4b4ff",
      "goal": "Pray every day",
      "frequency": "daily",
      "reminderTime": "22:30",
      "reminderDays": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      "completions": ["2024-11-07", "2024-11-08", "2024-11-10"],
      "currentStreak": 0,
      "longestStreak": 3,
      "createdAt": "2024-11-07T10:00:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
    "completionSound": "sonrie"
  }
}
```

## MVP Scope (Phase 1-3)

### Phase 1: Core Habit Tracking ✓
- Home screen with habit cards
- Add/edit/delete habits
- Daily checkbox completion
- Calendar view of completions
- Streak counter
- LocalStorage persistence

### Phase 2: Avatar Display ✓
- Avatar view page/tab
- Display current and future avatars
- Overall progress percentage
- Visual transformation effects based on completion

### Phase 3: Progress Visualization ✓
- Individual habit detail view
- Line graph showing completion over time
- Weekly/monthly views
- Statistics (completion rate, average streak, etc.)

### Future Phases (Post-MVP)
- Completion sounds/chimes
- Habit buddy feature
- Export data (JSON/CSV)
- Multiple habit categories
- Achievement badges
- Advanced avatar customization

## Communication Style

### When Explaining Code
- **Start with WHY** - Purpose of the code block
- **Show the code** - Actual implementation
- **Explain HOW** - Break down key parts
- **Test instructions** - How to verify it works

### When Encountering Issues
- **Describe the problem** - What's not working
- **Show error messages** - Exact console output
- **Propose solutions** - Multiple approaches if possible
- **Ask for guidance** - When multiple paths exist

### Language Preference
- **Primary:** English for code and technical discussion
- **Secondary:** Dutch for casual clarifications when needed
- **Style:** Direct, practical, no over-explanation

## Testing Approach

### Browser Testing
- **Primary target:** Mobile browsers (Chrome, Safari iOS)
- **Secondary target:** Desktop browsers
- **Test after each feature** - Open `index.html` in browser
- **Check console** - Look for JavaScript errors
- **Test data persistence** - Refresh page, verify data remains

### Manual Test Checklist (Per Feature)
1. Does it look correct visually?
2. Does it work on mobile screen size?
3. Does data persist after refresh?
4. Are there any console errors?
5. Does it match our design vision?

## Common Patterns

### Adding a New Feature
1. **Read relevant docs** - Check PRD, DESIGN, ROADMAP
2. **Plan the approach** - Think through implementation
3. **Update HTML** - Add necessary structure
4. **Style with CSS** - Make it look right
5. **Add JavaScript** - Implement functionality
6. **Test thoroughly** - Verify in browser
7. **Commit to GitHub** - Save working code

### Debugging Issues
1. **Check browser console** - Look for error messages
2. **Verify HTML structure** - Are elements present?
3. **Check CSS** - Are styles applied correctly?
4. **Test JavaScript** - Add `console.log()` statements
5. **Check LocalStorage** - Open DevTools → Application → LocalStorage
6. **Ask for help** - When truly stuck

## Critical Reminders

### Always Remember
- 🎯 **S.L.C. Framework** - Simple, Lovable, Complete (not complex, feature-bloated, half-finished)
- 📱 **Mobile-first** - Design and test for mobile screens primarily
- 🎨 **Design inspiration** - Take cues from Onrise but create our own identity
- 📊 **Plan before code** - Never jump straight to implementation
- 🧪 **Test frequently** - Open in browser after every change
- 💾 **Commit often** - Push working code regularly

### Never Do
- ❌ Add frameworks without discussion (React, Vue, etc.)
- ❌ Jump into coding without planning
- ❌ Create overly complex solutions
- ❌ Ignore mobile responsiveness
- ❌ Skip testing in actual browser
- ❌ Add features not in current phase scope

## Project Status

**Current Phase:** Documentation  
**Next Step:** Create PRD.md, DESIGN.md, ROADMAP.md  
**Then:** Begin Phase 1 implementation  

**Repository:** github.com/[username]/The-Game-of-Life  
**Deployment:** Will use GitHub Pages when ready

---

**Last Updated:** 2024-11-13  
**Version:** 1.0  
**Status:** Active Development

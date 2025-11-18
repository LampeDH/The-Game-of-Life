# DESIGN.md - Game of Life Habit Tracker

## UI/UX Design Specifications

**Project:** The Game of Life  
**Version:** 1.0 (MVP)  
**Date:** 2024-11-13  
**Design Philosophy:** S.L.C. - Simple, Lovable, Complete  
**Primary Platform:** Mobile-first (iOS & Android browsers)

---

## 1. Design Principles

### Core Values
1. **Simple** - Clean interface, intuitive interactions, minimal cognitive load
2. **Lovable** - Delightful micro-interactions, satisfying feedback, beautiful visuals
3. **Complete** - Every element serves a purpose, no half-baked features

### Inspiration Source
Onrise app provides design inspiration for:
- Card-based habit layout with colored backgrounds
- Clean typography and generous spacing
- Calendar visualization with completion dots
- Modal-based creation flows with multi-step progression
- Bottom navigation pattern

**Note:** We take inspiration from Onrise's structure and patterns, but create our own visual identity with different colors and styling.

---

## 2. Visual Design System

### Color Palette

#### Dark Theme (Default)
**Background Colors:**
- Primary Background: `#0f0f0f` (soft dark, not pure black)
- Secondary Background: `#1a1a1a` (cards, modals)
- Tertiary Background: `#2a2a2a` (input fields, elevated elements)

**Text Colors:**
- Primary Text: `#ffffff` (white)
- Secondary Text: `#a0a0a0` (gray for subtitles, metadata)
- Disabled Text: `#666666`

**Accent Colors:**
- Primary Accent: `#4a90e2` (blue - for buttons, links)
- Success: `#50e3c2` (teal - for completed states)
- Warning: `#f5a623` (orange - for alerts)
- Error: `#e74c3c` (red - for errors, delete actions)

#### Light Theme
**Background Colors:**
- Primary Background: `#ffffff` (white)
- Secondary Background: `#f5f5f5` (cards, modals)
- Tertiary Background: `#e8e8e8` (input fields)

**Text Colors:**
- Primary Text: `#1a1a1a` (dark gray, not pure black for readability)
- Secondary Text: `#666666` (gray)
- Disabled Text: `#a0a0a0`

**Accent Colors:**
(Same as dark theme - colors adjust for contrast)

#### Habit Card Color Palette (10 Colors)
These vibrant, saturated colors are randomly assigned to habits:

1. **Electric Blue:** `#2196F3`
2. **Vibrant Purple:** `#9C27B0`
3. **Hot Pink:** `#E91E63`
4. **Bright Red:** `#F44336`
5. **Energetic Orange:** `#FF9800`
6. **Sunny Yellow:** `#FFC107`
7. **Fresh Green:** `#4CAF50`
8. **Teal:** `#009688`
9. **Deep Indigo:** `#3F51B5`
10. **Coral:** `#FF5722`

**Usage:** When user creates a new habit, system randomly picks one of these colors that hasn't been used yet. Once all 10 are used, it cycles back and can repeat colors.

---

### Typography

**Font Family:**
- **System Font Stack:** 
  - iOS: `-apple-system, BlinkMacSystemFont, "SF Pro Display"`
  - Android: `"Roboto", "Segoe UI"`
  - Fallback: `Arial, sans-serif`

**Font Sizes:**
- **H1 (Page Title):** 32px, Bold (e.g., "Habits")
- **H2 (Section Title):** 24px, Semibold (e.g., "November")
- **H3 (Habit Name):** 20px, Bold (on habit cards)
- **Body Large:** 16px, Regular (descriptions, paragraphs)
- **Body:** 14px, Regular (metadata, secondary info)
- **Small:** 12px, Regular (timestamps, helper text)
- **Button Text:** 16px, Semibold

**Line Heights:**
- Headlines: 1.2
- Body text: 1.5
- Tight spacing (card titles): 1.3

**Font Weights:**
- Regular: 400
- Semibold: 600
- Bold: 700

---

### Spacing System

**Base Unit:** 8px (all spacing is multiples of 8)

**Scale:**
- `xs`: 4px (tight spacing)
- `sm`: 8px (compact)
- `md`: 16px (default)
- `lg`: 24px (generous)
- `xl`: 32px (section breaks)
- `2xl`: 48px (major sections)

**Component Spacing:**
- Padding inside cards: 16px
- Gap between habit cards: 12px
- Screen edge padding: 20px
- Bottom navigation height: 64px

---

### Border Radius

**Scale:**
- `sm`: 8px (small elements, buttons)
- `md`: 12px (cards, inputs)
- `lg`: 16px (modals, large cards)
- `full`: 50% (circles, pills)

**Usage:**
- Habit cards: 12px
- Buttons: 8px
- Input fields: 8px
- Modals: 16px (top corners only on mobile)
- Avatar images: 12px

---

### Shadows

**Elevation Levels:**

**Level 0 (Flat):**
- No shadow
- Usage: Background elements

**Level 1 (Subtle):**
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
```
- Usage: Habit cards (resting state)

**Level 2 (Raised):**
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
```
- Usage: Habit cards (active/pressed), navigation bar

**Level 3 (Floating):**
```css
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.20);
```
- Usage: Modals, dialogs

**Level 4 (Dramatic):**
```css
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
```
- Usage: Tooltips, elevated menus

---

## 3. Layout & Structure

### Screen Dimensions

**Design Canvas:**
- Design for: 375px × 812px (iPhone X/11/12/13 standard)
- Test on: 360px - 414px width (covers most devices)
- Max width (desktop): 480px (centered with margins)

**Safe Areas:**
- Top safe area: 44px (status bar + notch)
- Bottom safe area: 34px (home indicator on iOS)
- Side padding: 20px

---

### Navigation Structure

#### Bottom Navigation Bar

**Height:** 64px (56px bar + 8px shadow)

**3 Tabs:**

| Tab | Icon | Label | Description |
|-----|------|-------|-------------|
| 1 | List icon | Habits | Home screen - all habits |
| 2 | User/Avatar icon | Avatar | Progress view with transformation |
| 3 | Gear icon | Settings | App settings, theme toggle, clear data |

**Visual Style:**
- Background: `#1a1a1a` (dark) / `#ffffff` (light)
- Active tab: Accent color (`#4a90e2`) + bold label
- Inactive tabs: `#666666` + regular weight
- Active indicator: 3px line above active tab
- Icons: 24px × 24px

**Position:** Fixed to bottom, always visible

---

### Grid System

**12-Column Grid:**
- Gutter: 16px
- Margins: 20px

**Usage:**
- Full width: 12 columns (habit cards)
- Half width: 6 columns (stats in avatar view)
- Third width: 4 columns (calendar days)

---

## 4. Component Specifications

### 4.1 Home Screen (Habits Tab)

#### Header
- **Height:** 80px
- **Background:** Primary background color
- **Content:**
  - Title: "Habits" (H1, left-aligned)
  - Add button: "+" icon (top-right, 44×44px touch target)
  - Date indicator: "November" (H2, below title)

#### Habit Card

**Dimensions:**
- Width: Screen width - 40px (20px padding each side)
- Height: 96px (comfortable touch target)
- Border radius: 12px
- Margin bottom: 12px

**Layout:**
```
┌─────────────────────────────────────┐
│ ⚡ 3        ○ ○ ○ ○ ○ ○ ○           │  <- Top row
│                                      │
│ Pray                                 │  <- Habit name (H3)
│ 1 Minute                             │  <- Duration (Body)
│                                      │
└─────────────────────────────────────┘
```

**Elements:**
1. **Streak Badge (Top-left)**
   - Lightning bolt icon ⚡ (16px)
   - Number (14px, bold)
   - Color: White with 20% opacity background
   - Padding: 6px × 10px
   - Border radius: 12px (pill shape)

2. **Week Dots (Top-right)**
   - 7 circles representing Mon-Sun
   - Each circle: 10px diameter
   - Spacing: 6px between circles
   - Filled (white): Completed
   - Outlined (white 30% opacity): Not completed
   - Slightly larger + scale animation on completion

3. **Habit Name (Center-left)**
   - Font: H3 (20px, bold)
   - Color: White
   - Max: 1 line, ellipsis if overflow

4. **Duration (Below name)**
   - Font: Body (14px, regular)
   - Color: White with 80% opacity
   - Examples: "1 Minute", "5 minutes", "3 times/week"

**Background:**
- Solid color from the 10-color palette
- Slightly darker overlay (5% black) for depth

**States:**
- **Resting:** Level 1 shadow
- **Pressed:** Level 2 shadow + slight scale (0.98)
- **Completed (today):** Checkmark icon overlays top-right dots

**Interaction:**
- Tap anywhere on card → Opens habit detail view
- Long press → Quick actions menu (Edit | Delete)

---

### 4.2 Habit Creation Modal

**Layout:** Full-screen modal (slides up from bottom)

**Structure:** Hybrid approach
- Essential fields visible immediately
- "Advanced Options" collapsible section at bottom

#### Step 1: Essential Fields (Always Visible)

**Header:**
- Title: "Create" (H1, left)
- Close button: "×" (top-right)
- Background: Secondary background

**Form Fields:**

1. **"I want to"** (Label)
   - Large text input
   - Placeholder: "e.g., Read, Exercise, Meditate"
   - Font: H2 (24px)
   - Auto-focus on open

2. **Activity/Custom Toggle**
   - Pill buttons: "Activity" | "Read" | "Work" | "Custom"
   - Selected: Primary accent color
   - Unselected: Tertiary background
   - Optional quick categories for inspiration

3. **Frequency Selector**
   - Label: "times in"
   - Two number inputs side-by-side:
     - Left: Number of times (e.g., "3")
     - Right: Period dropdown ("week" selected by default)
   - Dropdowns: Simple picker wheels on mobile
   - Format: "3 times in 1 week"

4. **Define Smallest Unit** (Optional)
   - Collapsible section: "Define a smallest unit"
   - Two inputs:
     - Quantity: e.g., "2"
     - Unit: e.g., "Minutes"
   - Example shown: "i.e. 2 Minutes"

#### Step 2: Advanced Options (Collapsible)

**Expand/Collapse button:** "Advanced Options ▼"

When expanded:

5. **Reminders**
   - Toggle: "Remind me at" (on/off switch)
   - If on, show time picker
   - Day selector: Mon | Tue | Wed | Thu | Fri | Sat | Sun
   - Selected days highlighted in accent color

6. **Notes** (Optional)
   - Text area: "Add personal notes..."
   - Multiline input
   - Character limit: 200

**Footer:**
- "CREATE" button (full width, primary accent color)
- Disabled until "I want to" field is filled

**Validation:**
- Required: Habit name, frequency
- Optional: Duration, reminders, notes

---

### 4.3 Habit Detail View

**Layout:** Full screen (replaces home screen, back button in header)

#### Header
- Back arrow (top-left)
- Habit name (H2, center or left)
- Edit button (top-right)

#### Content Sections (Scrollable)

**Section 1: Quick Stats**
```
┌──────────────────────────────────┐
│  Current Streak    Longest Streak │
│       3 days            12 days   │
│                                   │
│     Total Completions             │
│          47 times                 │
└──────────────────────────────────┘
```
- 3 stat cards in a grid (2 on top, 1 below)
- Each card: Tertiary background, rounded corners
- Number: Large (32px, bold)
- Label: Small (12px, secondary color)

**Section 2: Activity Calendar**
- Header: "Activity" + Month selector (< November >)
- Calendar view (horizontal scrollable week view)
- Days labeled: Mo | Tu | We | Th | Fr | Sa | Su
- Date numbers: 14px
- Completion dots: 8px filled circles below dates
- Completed days: Accent color dot
- Today: Border highlight
- Can tap to toggle completion (if within 7 days)

**Section 3: Progress Graph**
- Header: "Progress"
- Line chart showing completion history
- X-axis: Dates (all-time from creation)
- Y-axis: Completions per week
- Line color: Habit card color
- Grid: Subtle gray lines
- Responsive to screen width

**Section 4: Details**
- Goal: "Pray every day" (Body)
- Duration: "1 Minute" (Body)
- Created: "Nov 7, 2024" (Small, secondary)

#### Footer Actions
- "Edit Habit" button (secondary style)
- "Delete Habit" button (text only, red color)

---

### 4.4 Avatar Progress View (Avatar Tab)

**Layout:** Vertically scrollable

#### Avatar Slider Section

**Height:** 400px

**Content:**
- **Swipeable carousel** with 2 slides
- Slide 1: Current avatar image
- Slide 2: Future avatar image

**Avatar Display:**
- Image size: 280px × 280px
- Border radius: 12px
- Centered on screen
- Drop shadow: Level 2

**Transformation Effects (at milestones):**
- 0-24%: Current avatar, no effects
- 25%: Subtle glow (2px, accent color, 30% opacity)
- 50%: Stronger glow (4px, accent color, 50% opacity)
- 75%: Bright glow (6px, accent color, 70% opacity) + border highlight
- 100%: Intense glow (8px, success color, 90% opacity) + shine animation

**Carousel Indicators (Dots):**
- 2 dots below avatar
- Position: Centered, 16px below image
- Size: 8px diameter
- Active: Accent color
- Inactive: 30% opacity
- Spacing: 12px apart

**Swipe Interaction:**
- Swipe left/right to navigate
- Smooth spring animation
- Elastic bounce at edges

#### Progress Bar Section

**Position:** Below carousel (24px gap)

**Layout:**
```
┌─────────────────────────────────┐
│ Overall Progress                 │
│ ████████████░░░░░░░░░ 66.7%     │
└─────────────────────────────────┘
```

**Elements:**
- Label: "Overall Progress" (Body, secondary color)
- Progress bar:
  - Height: 12px
  - Border radius: 6px (pill)
  - Background: Tertiary background
  - Fill: Gradient (accent color to success color)
  - Animation: Smooth fill on load
- Percentage text: Right-aligned, bold

#### Milestone Markers

**Position:** Below progress bar (16px gap)

**Layout:** 4 milestone cards in horizontal scroll

```
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│ 25% │  │ 50% │  │ 75% │  │100% │
│  ✓  │  │  ✓  │  │  ○  │  │  ○  │
└─────┘  └─────┘  └─────┘  └─────┘
```

**Each card:**
- Width: 70px
- Height: 80px
- Background: Tertiary background
- Border radius: 8px
- Percentage: Bold, top
- Icon: Checkmark (achieved) or circle (not yet)
- Achieved: Accent color
- Not achieved: Disabled color

#### Goals Section

**Position:** Below milestones (32px gap)

**Header:** "Your Goals" (H3)

**Content:**
- User's written goals (from setup)
- Font: Body
- Style: Italicized, secondary color
- Background: Tertiary background
- Padding: 16px
- Border radius: 8px
- Max height: 200px (scrollable if longer)

---

### 4.5 Settings View (Settings Tab)

**Layout:** List-style settings page

#### Header
- Title: "Settings" (H1)
- No action buttons

#### Settings List

**Section: Appearance**

1. **Theme**
   - Label: "Theme" (left)
   - Toggle switch: ☀️ Light | 🌙 Dark (right)
   - Active state: Accent color fill
   - Default: Dark mode

**Section: Data**

2. **Export Data**
   - Icon: Download
   - Label: "Export Data"
   - Chevron: →
   - Action: Downloads JSON file

3. **Clear All Data**
   - Icon: Trash (red)
   - Label: "Clear All Data" (red text)
   - Action: Shows confirmation dialog

**Section: About**

4. **Version**
   - Label: "Version"
   - Value: "1.0.0" (right-aligned, secondary color)

5. **Developer**
   - Label: "Created by M8"
   - Secondary text: "AIMAZE"

#### Clear Data Confirmation Dialog

**Modal overlay:** 40% black opacity

**Dialog box:**
- Width: 90% of screen (max 320px)
- Background: Secondary background
- Border radius: 16px
- Padding: 24px
- Center of screen

**Content:**
- Icon: ⚠️ (warning, 48px, warning color)
- Title: "Clear All Data?" (H2, bold)
- Message: "This will permanently delete all your habits, progress, and settings. This action cannot be undone." (Body)
- Buttons:
  - Cancel (secondary style, left)
  - Clear Data (error color, right)

---

## 5. Interactions & Animations

### Micro-interactions

#### Habit Completion
**Trigger:** User taps checkbox on habit card

**Animation sequence (300ms total):**
1. Checkbox fade-in with checkmark (100ms)
2. Habit card scale bounce (200ms):
   - Scale from 1.0 → 1.05 → 1.0
   - Easing: spring
3. Completion dot fills in calendar (100ms fade)
4. Streak counter updates with number count-up animation (200ms)

**Sound:** 
- If volume on: Satisfying "ding" sound (short, pleasant)
- If silent mode: Haptic feedback (medium impact)

#### Avatar Swipe
**Trigger:** User swipes left/right on avatar image

**Animation (250ms):**
- Slide transition with momentum
- Elastic bounce when reaching edge
- Dots fade/brighten instantly
- Smooth follow-through on release

#### Page Transitions
**Trigger:** Navigation between screens

**Animation (300ms):**
- Forward: Slide left
- Backward: Slide right
- Fade transition for modals (200ms)

#### Button Press
**Trigger:** User taps button

**Animation (100ms):**
- Scale: 1.0 → 0.95
- Opacity: 100% → 90%
- Release: Spring back to 1.0

---

### Loading States

**Initial Load:**
- Skeleton screens for habit cards (gray pulse animation)
- Duration: Until data loads from LocalStorage

**Graph Loading:**
- Spinner (accent color) centered in graph area
- Fade-in when data renders

**Avatar Images:**
- Placeholder: Gray box with camera icon
- Progressive load: Blur-up effect

---

### Empty States

#### No Habits Yet
**Display:** Center of home screen

**Content:**
- Icon: Large "+" in circle (gray)
- Title: "No habits yet" (H2)
- Subtitle: "Tap the + button to create your first habit"
- Visual: Simple illustration (optional)

#### No Completions in Calendar
**Display:** In habit detail calendar section

**Content:**
- Message: "No completions yet. Start building your streak!"
- Style: Secondary text, centered

---

### Error States

#### Network Error (future)
**Display:** Toast notification at top

**Content:**
- Icon: ⚠️
- Message: "Connection lost. Changes will sync when online."
- Duration: 3 seconds auto-dismiss

#### Form Validation Errors
**Display:** Below invalid field

**Content:**
- Text: Error message (red)
- Icon: ❌
- Example: "Habit name cannot be empty"

---

## 6. Responsive Design

### Breakpoints

**Mobile (Default):**
- 320px - 767px
- Single column layout
- Touch-optimized (44px minimum touch targets)

**Tablet:**
- 768px - 1024px
- 2-column grid for habit cards
- Wider max-width (600px centered)

**Desktop:**
- 1025px+
- Max-width: 480px (centered)
- Mouse hover states enabled
- Keyboard navigation

---

### Touch Targets

**Minimum size:** 44px × 44px (Apple HIG standard)

**Critical targets:**
- Checkboxes: 44px × 44px
- Navigation tabs: Full width ÷ 3, 64px height
- Buttons: Height 48px minimum
- Card tap areas: Full card (96px height)

---

## 7. Accessibility

### Color Contrast

**WCAG AA Compliance:**
- Text on background: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**High Contrast Mode:**
- Support system high contrast settings
- Increase border visibility
- Stronger shadows

---

### Screen Readers

**ARIA Labels:**
- Navigation: `<nav aria-label="Main navigation">`
- Buttons: Descriptive labels (not just icons)
- Form inputs: Proper `<label>` associations
- Status updates: `aria-live` regions for dynamic content

**Focus Management:**
- Visible focus indicators (2px accent color outline)
- Logical tab order
- Skip to content link

---

### Keyboard Navigation

**Tab order:**
1. Navigation tabs
2. Add habit button
3. Habit cards (top to bottom)
4. Form fields (logical flow)

**Shortcuts:**
- `/` - Focus search (future feature)
- `n` - New habit
- `Esc` - Close modal

---

## 8. Design Reference - Onrise Inspiration

### Screenshots Provided (For Reference)

**Image 1: Home Screen**
- Shows habit cards in vertical list
- Each card has colored background (pastel blue, peach, purple)
- Week dots displayed horizontally
- Lightning bolt streak indicator top-left
- Clean spacing between cards
- "Habits" title at top, "+" button top-right
- Bottom navigation with 4 tabs

**Image 2: Habit Detail - Reminders**
- Modal with light background (header area colored to match habit)
- Sections: Reminders, Notes, Completion chime, Habit Buddy
- Toggle switches and editable fields
- Clean typography hierarchy
- Delete button at bottom in red

**Image 3: Habit Detail - Activity**
- Calendar view showing completion history
- Month selector with arrows
- Week days labeled (Mo-Su)
- Filled circles for completed days
- Toggle between "Count" and "Streak" views
- Goal and duration displayed below
- Notes section at bottom

**Image 4: Create Habit - Step 1**
- "I want to" large header
- Pill buttons for activity categories (Activity, Read, Work)
- "times in" and "days" selector
- Minimal, focused interface
- Progress dots at bottom (3 steps)
- "NEXT" button

**Image 5: Create Habit - Step 2**
- "Define a smallest unit" header
- Two input fields (quantity and unit)
- Example text: "i.e. 2 Minutes"
- "SKIP" button option
- Clean, centered layout

**Image 6: Create Habit - Step 3**
- "Remind me at" header
- Time selector with + button
- "Same times for all days" checkbox
- Day selector (Monday, Tuesday, etc.) with multi-select
- "CREATE" button at bottom

**Key Takeaways:**
- Multi-step creation flow with clear progress
- Generous use of color for personality
- Clean, uncluttered layouts
- Thoughtful microinteractions
- Mobile-optimized touch targets
- Bottom-heavy action buttons

---

## 9. Implementation Notes

### CSS Architecture

**Approach:** CSS Variables + BEM-like naming

**Variables file (variables.css):**
```css
:root {
  /* Colors */
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #4a90e2;
  --success: #50e3c2;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  
  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  
  /* Shadows */
  --shadow-1: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-2: 0 4px 8px rgba(0, 0, 0, 0.16);
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e8e8e8;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
}
```

**Component naming:**
```css
.habit-card { }
.habit-card__title { }
.habit-card__streak { }
.habit-card--completed { }
```

---

### Animation Performance

**Use CSS transforms:**
- `transform: scale()` - not `width/height`
- `transform: translate()` - not `top/left`
- `opacity` - hardware accelerated

**Avoid:**
- Animating `box-shadow` (use pseudo-elements)
- Layout-triggering properties
- Excessive repaints

**Optimize:**
- Use `will-change` sparingly
- Debounce scroll events
- RequestAnimationFrame for JS animations

---

### Image Optimization

**Avatar images:**
- Format: WebP with JPEG fallback
- Size: 560px × 560px (2x for retina)
- Compression: 80% quality
- Max file size: 150KB each

**Icons:**
- SVG format (scalable, small file size)
- Inline critical icons (navigation)
- Sprite sheet for habit card icons

---

## 10. Design Checklist

### Before Development
- [ ] All color values defined in variables
- [ ] Typography scale documented
- [ ] Component states specified (hover, active, disabled)
- [ ] Animation timing/easing documented
- [ ] Mobile touch targets verified (44px minimum)

### During Development
- [ ] Test on actual devices (iOS + Android)
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Check text readability at minimum sizes
- [ ] Validate form inputs and errors
- [ ] Test animations on lower-end devices

### Before Launch
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Dark/light mode consistency
- [ ] Empty states and error states implemented

---

## Appendix

### Related Documents
- CLAUDE.md - Project context
- PRD.md - Product requirements
- ROADMAP.md - Implementation plan (to be created)

### Design Tools
- Browser DevTools for testing
- GitHub Pages for live preview
- Figma/Sketch (optional for mockups)

### Version History
- v1.0 (2024-11-13) - Initial design specifications

---

**Status:** Finalized - Ready for ROADMAP.md and implementation

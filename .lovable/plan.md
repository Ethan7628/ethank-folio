

## Mobile Hero Buttons - Compact Circular Design

### Problem
The three CTA buttons (View My Work, Download CV, Get In Touch) currently display with `w-full` (100% width) on mobile, stacked vertically. This creates a poor visual design with oversized buttons.

### Solution
Transform the mobile buttons into compact circular/pill-shaped buttons that all fit on a single horizontal row, while keeping the desktop design unchanged.

### Changes to `src/components/HeroSection.tsx`

**Current code (lines 122-156):**
```jsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center animate-slide-up px-4 anim-delay-600 max-w-2xl mx-auto pt-4">
  <Button ... className="rounded-full w-full sm:w-auto">
    <Play ... mr-2" />
    View My Work
  </Button>
  ...
</div>
```

**Updated design:**
1. Change container from `flex-col` to `flex-row` on mobile with `flex-wrap` for safety
2. Use `gap-2` on mobile for tighter spacing
3. Remove `w-full` from buttons - use `w-auto` or fixed widths that fit
4. Make buttons more compact on mobile with smaller padding
5. Keep text visible but shorter on mobile using responsive text

**New approach:**
```text
+------------------------------------------+
|  Container: flex flex-row gap-2 sm:gap-4 |
|                                          |
|  [View Work] [Download CV] [Get In Touch]|
|     (all compact, fitting in one row)    |
+------------------------------------------+
```

### Technical Implementation

1. **Container changes:**
   - Change from `flex-col sm:flex-row` to `flex-row flex-wrap`
   - Reduce mobile gap from `gap-3` to `gap-2`

2. **Button changes:**
   - Remove `w-full sm:w-auto` - use just `w-auto`
   - Add mobile-specific sizing: `px-3 py-2 sm:px-6 sm:py-3`
   - Use `text-xs sm:text-sm` for responsive text
   - Icons: `w-3 h-3 sm:w-4 sm:h-4` and `mr-1 sm:mr-2`

3. **Text abbreviation on mobile:**
   - "View My Work" → "Work" on mobile, full text on desktop
   - "Download CV" → "CV" on mobile, full text on desktop  
   - "Get In Touch" → "Contact" on mobile, full text on desktop

This creates three compact pill-shaped buttons that fit nicely in a horizontal row on mobile screens.


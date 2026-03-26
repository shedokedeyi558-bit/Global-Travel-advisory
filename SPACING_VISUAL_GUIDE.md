# Mobile Destinations Page - Spacing Visual Guide

## Complete Page Layout with Spacing

```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR (Fixed at top)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ STICKY HEADER (py-5)                                    │ │
│ │                                                         │ │
│ │ 🟢 DISCOVER (mb-2)                                      │ │
│ │ Destinations (text-3xl, mb-5)                           │ │
│ │                                                         │ │
│ │ [🔍 Search...] [🎛️ Filter] (gap-3)                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ CONTENT AREA (py-8, pb-28, space-y-10)                 │ │
│ │                                                         │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ FEATURED SECTION (mb-6)                             │ │ │
│ │ │                                                     │ │ │
│ │ │ ⭐ TRENDING NOW (mb-3)                              │ │ │
│ │ │ Safe Destinations (text-2xl, mb-2)                  │ │ │
│ │ │ Top-rated travel destinations (text-sm)             │ │ │
│ │ │                                                     │ │ │
│ │ │ [Card] [Card] [Card] (gap-5)                        │ │ │
│ │ │ (w-52, h-36)                                        │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ RESULTS SECTION (space-y-10)                        │ │ │
│ │ │                                                     │ │ │
│ │ │ All Destinations (text-2xl, mb-6)                   │ │ │
│ │ │ 52 destinations (text-sm, mt-2)                     │ │ │
│ │ │                                                     │ │ │
│ │ │ ┌─────────────────────────────────────────────────┐ │ │ │
│ │ │ │ DESTINATION CARD (gap-5)                        │ │ │ │
│ │ │ │                                                 │ │ │ │
│ │ │ │ [Image - h-48]                                  │ │ │ │
│ │ │ │ 🟢 Safe (top-right)                             │ │ │ │
│ │ │ │                                                 │ │ │ │
│ │ │ │ ─────────────────────────────────────────────── │ │ │ │
│ │ │ │ Japan (text-xl, mb-2)                           │ │ │ │
│ │ │ │ Safe & welcoming (text-sm, mb-4)                │ │ │ │
│ │ │ │                                                 │ │ │ │
│ │ │ │ 92 TRUST (text-3xl)                             │ │ │ │
│ │ │ │                                                 │ │ │ │
│ │ │ │ ─────────────────────────────────────────────── │ │ │ │
│ │ │ │ Safety ✓  │  Explore → (gap-3)                  │ │ │ │
│ │ │ └─────────────────────────────────────────────────┘ │ │ │
│ │ │                                                     │ │ │
│ │ │ [More cards with gap-5 between them]               │ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Spacing Breakdown by Component

### 1. Header Section
```
┌─────────────────────────────────────┐
│ py-5 (20px top & bottom)            │
│                                     │
│ 🟢 DISCOVER (mb-2)                  │
│ Destinations (text-3xl, mb-5)       │
│                                     │
│ [🔍 Search...] [🎛️ Filter]         │
│ (gap-3 = 12px between)              │
│                                     │
│ py-5 (20px bottom)                  │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Top/Bottom padding: `py-5` = 20px
- Label margin: `mb-2` = 8px
- Title margin: `mb-5` = 20px
- Search/Filter gap: `gap-3` = 12px

---

### 2. Featured Section
```
┌─────────────────────────────────────┐
│ mb-6 (24px bottom margin)           │
│                                     │
│ ⭐ TRENDING NOW (mb-3)              │
│ Safe Destinations (mb-2)            │
│ Top-rated travel destinations       │
│                                     │
│ [Card] [Card] [Card]                │
│ (gap-5 = 20px between cards)        │
│                                     │
│ pb-3 (12px bottom padding)          │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Section margin: `mb-6` = 24px
- Label margin: `mb-3` = 12px
- Title margin: `mb-2` = 8px
- Card gap: `gap-5` = 20px
- Padding bottom: `pb-3` = 12px

---

### 3. Featured Cards
```
┌──────────────────┐
│ w-52 (208px)     │
│                  │
│ [Image]          │ h-36 (144px)
│ h-36             │
│                  │
├──────────────────┤
│ p-4 (16px)       │
│                  │
│ Japan            │ text-base
│ 🟢 Safe  92       │
│                  │
│ mt-3 (12px)      │
└──────────────────┘
```

**Spacing Values:**
- Width: `w-52` = 208px
- Image height: `h-36` = 144px
- Content padding: `p-4` = 16px
- Badge padding: `px-2.5 py-1.5` = 10px × 6px
- Margin top: `mt-3` = 12px

---

### 4. Results Header
```
┌─────────────────────────────────────┐
│ All Destinations (text-2xl)         │
│ mb-6 (24px)                         │
│                                     │
│ 52 destinations (text-sm)           │
│ mt-2 (8px)                          │
│                                     │
│ [Clear] (text-sm)                   │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Title margin: `mb-6` = 24px
- Subtitle margin: `mt-2` = 8px
- Title font: `text-2xl`
- Subtitle font: `text-sm`

---

### 5. Destination Cards (Grid)
```
┌─────────────────────────────────────┐
│ gap-5 (20px between cards)          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Image - h-48]                  │ │
│ │ 🟢 Safe (top-4 right-4)         │ │
│ │                                 │ │
│ │ ─────────────────────────────── │ │
│ │ p-5 (20px padding)              │ │
│ │                                 │ │
│ │ Japan (text-xl, mb-2)           │ │
│ │ Safe & welcoming (mb-4)         │ │
│ │                                 │ │
│ │ 92 TRUST (text-3xl)             │ │
│ │                                 │ │
│ │ ─────────────────────────────── │ │
│ │ pt-4 (16px top padding)         │ │
│ │ mt-4 (16px top margin)          │ │
│ │                                 │ │
│ │ Safety ✓  │  Explore →          │ │
│ │ (gap-3 = 12px)                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [More cards...]                     │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Grid gap: `gap-5` = 20px
- Card padding: `p-5` = 20px
- Image height: `h-48` = 192px
- Title margin: `mb-2` = 8px
- Tagline margin: `mb-4` = 16px
- Stats margin: `mt-4` = 16px
- Stats padding: `pt-4` = 16px
- Stats gap: `gap-3` = 12px

---

### 6. Filter Bottom Sheet
```
┌─────────────────────────────────────┐
│ HEADER (py-5)                       │
│ Filters                         [X] │
├─────────────────────────────────────┤
│ CONTENT (py-8, space-y-10)          │
│                                     │
│ RISK LEVEL (mb-4)                   │
│ ☐ Safe (0-30) (p-4, space-y-3)      │
│ ☐ Moderate (30-60)                  │
│ ☐ Caution (60-80)                   │
│ ☐ High Risk (80+)                   │
│                                     │
│ REGION (mb-4)                       │
│ ☐ Europe (p-4, space-y-3)           │
│ ☐ Asia                              │
│ ☐ Americas                          │
│ ☐ Africa                            │
│ ☐ Oceania                           │
│                                     │
│ BUDGET (mb-4)                       │
│ ☐ Budget ($) (p-4, space-y-3)       │
│ ☐ Moderate ($$)                     │
│ ☐ Luxury ($$$)                      │
│                                     │
│ pb-28 (112px bottom padding)        │
├─────────────────────────────────────┤
│ FOOTER (py-5, gap-4)                │
│ [Reset]  [Apply]                    │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Header padding: `py-5` = 20px
- Content padding: `py-8` = 32px
- Content space: `space-y-10` = 40px
- Section margin: `mb-4` = 16px
- Filter items space: `space-y-3` = 12px
- Filter item padding: `p-4` = 16px
- Content padding bottom: `pb-28` = 112px
- Footer padding: `py-5` = 20px
- Footer gap: `gap-4` = 16px
- Button padding: `py-3.5` = 14px

---

## Content Area Spacing
```
┌─────────────────────────────────────┐
│ py-8 (32px top & bottom)            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ FEATURED SECTION                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ space-y-10 (40px between sections)  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ RESULTS SECTION                 │ │
│ │                                 │ │
│ │ [Cards with gap-5]              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ pb-28 (112px bottom)                │
└─────────────────────────────────────┘
```

**Spacing Values:**
- Top/Bottom padding: `py-8` = 32px
- Section spacing: `space-y-10` = 40px
- Bottom padding: `pb-28` = 112px

---

## Font Size Hierarchy

### Headers
- Page title: `text-3xl` = 30px
- Section title: `text-2xl` = 24px
- Card title: `text-xl` = 20px
- Label: `text-base` = 16px

### Body Text
- Subtitle: `text-sm` = 14px
- Small text: `text-xs` = 12px

### Emphasis
- Score: `text-3xl` = 30px (font-black)
- Badge: `text-sm` = 14px (font-bold)

---

## Touch Target Sizes

### Minimum Touch Target: 44px

**Current Sizes:**
- Filter items: 56px (p-4 + text-base)
- Buttons: 56px (py-3.5 + text-base)
- Cards: Full width (easy to tap)
- Search input: 48px (py-3 + text-sm)

All touch targets meet or exceed 44px minimum.

---

## Spacing Consistency

### Vertical Spacing Pattern
```
8px   (mb-2, mb-1)
12px  (mb-3, space-y-3)
16px  (mb-4, space-y-4)
20px  (mb-5, py-5)
24px  (mb-6, space-y-6)
32px  (py-8, space-y-8)
40px  (space-y-10)
```

### Horizontal Spacing Pattern
```
8px   (gap-2)
12px  (gap-3)
16px  (gap-4, p-4)
20px  (gap-5, p-5)
```

---

## Responsive Behavior

### Mobile (< 1024px)
- All spacing improvements applied
- Optimized for touch
- Better visual hierarchy

### Desktop (≥ 1024px)
- Original dashboard layout
- No changes to desktop experience

---

## Before & After Comparison

### Featured Section
**Before:** Cramped, cards close together
**After:** Spacious, cards well-separated (gap-5)

### Destination Cards
**Before:** Tight padding, small images
**After:** Generous padding (p-5), larger images (h-48)

### Filter Modal
**Before:** Dense, hard to read
**After:** Spacious, easy to use (space-y-10)

### Headers
**Before:** Small, hard to notice
**After:** Large, prominent (text-3xl, text-2xl)

---

## Summary

✓ All components have proper spacing
✓ Visual hierarchy is clear
✓ Touch targets are adequate (≥ 44px)
✓ Content is readable
✓ Page feels premium and spacious
✓ Consistent spacing throughout
✓ Better user experience

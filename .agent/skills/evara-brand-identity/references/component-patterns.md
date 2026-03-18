# Evara Component Patterns

Verified HTML/Tailwind patterns extracted from stitch prototypes. Copy these directly when building Evara UI.

---

## Table of Contents
1. [TopAppBar](#topappbar)
2. [BottomNavBar](#bottomnavbar)
3. [AI Coach Bubble](#ai-coach-bubble)
4. [Primary Button (CTA)](#primary-button-cta)
5. [Secondary Button](#secondary-button)
6. [Tertiary Button](#tertiary-button)
7. [Bento Stat Card](#bento-stat-card)
8. [Hero Workout Card](#hero-workout-card)
9. [Goal Selection Card (Asymmetric)](#goal-selection-card)
10. [Program Card (Full Image)](#program-card-full-image)
11. [Program Card (Side by Side)](#program-card-side-by-side)
12. [Progress Orb (SVG)](#progress-orb)
13. [Rest Timer (SVG Circle)](#rest-timer)
14. [Streak Display](#streak-display)
15. [Profile Hero](#profile-hero)
16. [Stats Gradient Banner](#stats-gradient-banner)
17. [Settings List](#settings-list)
18. [Before/After Comparison](#before-after-comparison)
19. [SVG Line Chart](#svg-line-chart)
20. [Achievement Card (Wide)](#achievement-card-wide)
21. [Pill Badge / Tag](#pill-badge)
22. [Onboarding Step Indicator](#onboarding-step-indicator)
23. [Progress Bar (Inline)](#progress-bar-inline)

---

## TopAppBar

Fixed, glassmorphic header with profile avatar, Evara logo, and notification icon.

```html
<header class="fixed top-0 w-full z-50 bg-[#fff8f6]/80 backdrop-blur-xl shadow-sm">
  <div class="flex justify-between items-center w-full px-6 py-4">
    <!-- Profile Avatar -->
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
        <img alt="User" class="w-full h-full object-cover" src="..." />
      </div>
    </div>
    <!-- Brand Mark -->
    <h1 class="font-headline font-extrabold tracking-tighter text-2xl text-primary">Evara</h1>
    <!-- Notification -->
    <button class="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform">
      <span class="material-symbols-outlined text-2xl">notifications</span>
    </button>
  </div>
</header>
```

**Onboarding variant** — Replace avatar with logo, add progress bar:
```html
<header class="fixed top-0 w-full z-50 bg-[#fff8f6]/80 backdrop-blur-xl flex justify-between items-center px-6 py-6">
  <span class="text-2xl font-extrabold text-primary tracking-tighter font-headline">Evara</span>
  <div class="h-1.5 w-32 bg-surface-container rounded-full overflow-hidden">
    <div class="h-full w-2/3 bg-primary rounded-full"></div>
  </div>
</header>
```

**Active Workout variant** — Close button + help:
```html
<header class="fixed top-0 w-full z-50 bg-[#fff8f6]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
  <button class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary active:scale-95 transition-transform">
    <span class="material-symbols-outlined">close</span>
  </button>
  <h1 class="font-headline font-bold text-xl tracking-tight text-primary">Evara</h1>
  <button class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary active:scale-95 transition-transform">
    <span class="material-symbols-outlined">help_outline</span>
  </button>
</header>
```

---

## BottomNavBar

Floating pill navigation with glassmorphism. Active tab is a gradient circle.

```html
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-end px-4 pb-6 z-50">
  <div class="w-full max-w-md flex justify-around items-center bg-[#fff8f6]/80 backdrop-blur-xl py-3 rounded-full shadow-[0px_-20px_40px_rgba(134,80,67,0.08)]">
    <!-- Active Tab -->
    <a class="flex flex-col items-center justify-center bg-gradient-to-br from-[#865043] to-[#f4af9e] text-white rounded-full p-3 shadow-lg scale-110 -translate-y-2 duration-200 ease-out" href="#">
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
    </a>
    <!-- Inactive Tab -->
    <a class="flex flex-col items-center justify-center text-[#d5c3bd] hover:text-[#865043] transition-colors p-3" href="#">
      <span class="material-symbols-outlined">fitness_center</span>
      <span class="font-label text-[10px] font-bold uppercase tracking-widest mt-1">Programs</span>
    </a>
    <!-- Inactive Tab -->
    <a class="flex flex-col items-center justify-center text-[#d5c3bd] hover:text-[#865043] transition-colors p-3" href="#">
      <span class="material-symbols-outlined">insert_chart</span>
      <span class="font-label text-[10px] font-bold uppercase tracking-widest mt-1">Progress</span>
    </a>
    <!-- Inactive Tab -->
    <a class="flex flex-col items-center justify-center text-[#d5c3bd] hover:text-[#865043] transition-colors p-3" href="#">
      <span class="material-symbols-outlined">person</span>
      <span class="font-label text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
    </a>
  </div>
</nav>
```

---

## AI Coach Bubble

Asymmetric chat bubble with avatar and left border accent.

```html
<section class="flex gap-4 items-start">
  <div class="flex-shrink-0 mt-2">
    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-lg">
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
    </div>
  </div>
  <div class="flex-1">
    <div class="bg-surface-container-low p-5 shadow-sm rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl border-l-4 border-primary/20">
      <p class="text-on-surface leading-relaxed font-medium">
        Good morning, Maya! Ready to crush your lower body session today?
        You're on a <span class="text-primary font-bold">5-day streak!</span>
      </p>
    </div>
  </div>
</section>
```

**Compact variant** (with label):
```html
<div class="bg-surface-container-low rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-6">
  <div class="flex gap-4 items-start">
    <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
      <span class="material-symbols-outlined text-on-primary-container">psychology</span>
    </div>
    <div>
      <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1 block">Evara Coach</span>
      <p class="text-on-surface leading-relaxed italic font-medium">"Your coaching message here."</p>
    </div>
  </div>
</div>
```

---

## Primary Button (CTA)

```html
<button class="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-[0px_20px_40px_rgba(134,80,67,0.15)] hover:opacity-90 transition-all active:scale-95">
  Start Workout
  <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
```

---

## Secondary Button

```html
<button class="w-full py-4 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-surface-variant transition-colors active:scale-[0.98]">
  View Curriculum
</button>
```

---

## Tertiary Button

```html
<button class="text-primary font-extrabold text-sm flex items-center gap-2 group">
  Start Training
  <span class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
</button>
```

**Underline variant:**
```html
<button class="text-primary font-bold text-sm underline decoration-2 underline-offset-4">View All</button>
```

---

## Bento Stat Card

```html
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-[0px_20px_40px_rgba(134,80,67,0.04)] flex flex-col items-center justify-center space-y-3">
  <span class="text-label text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Weekly Goal</span>
  <!-- Content (number, orb, icon, etc.) -->
  <span class="text-2xl font-bold text-primary">70%</span>
  <p class="text-[11px] text-on-surface-variant font-medium">4 of 6 sessions</p>
</div>
```

---

## Hero Workout Card

Full-bleed image card with gradient overlay and embedded CTA.

```html
<div class="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-xl group">
  <img alt="Workout" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="..." />
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
  <div class="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
    <div class="flex items-center gap-2 mb-2">
      <span class="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Active Program</span>
      <span class="text-white/80 text-xs font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">schedule</span> 45 mins
      </span>
    </div>
    <h2 class="text-white text-3xl font-bold font-headline tracking-tight mb-2">Day 12 – Booty Program</h2>
    <p class="text-white/80 text-sm font-body mb-8 max-w-xs">Lower body focus using resistance bands.</p>
    <button class="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-[0px_20px_40px_rgba(134,80,67,0.3)] hover:opacity-90 transition-all active:scale-95">
      Start Workout
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
    </button>
  </div>
</div>
```

---

## Goal Selection Card

Asymmetric layout — alternates image position for rhythm.

```html
<button class="group relative w-full text-left overflow-hidden bg-surface-container-lowest rounded-lg transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(134,80,67,0.08)] active:scale-[0.98]">
  <div class="flex flex-row-reverse items-stretch h-48 md:h-56">
    <!-- Image (2/5 width) -->
    <div class="w-2/5 relative">
      <img alt="Goal" class="absolute inset-0 w-full h-full object-cover" src="..." />
      <div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent"></div>
    </div>
    <!-- Content (3/5 width) -->
    <div class="w-3/5 p-8 flex flex-col justify-center">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-primary">fitness_center</span>
        <span class="font-headline font-bold text-xl tracking-tight text-on-surface">Grow Glutes</span>
      </div>
      <p class="text-on-surface-variant text-sm leading-snug">Targeted hypertrophy and strength training.</p>
      <div class="mt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Select Goal
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </div>
    </div>
  </div>
</button>
```

> **Alternate direction:** Swap `flex-row-reverse` to `flex` for the next card, and change the gradient direction from `bg-gradient-to-r` to `bg-gradient-to-l`.

---

## Program Card (Full Image)

```html
<div class="group relative overflow-hidden bg-surface-container-lowest rounded-lg shadow-[0px_20px_40px_rgba(134,80,67,0.08)]">
  <div class="relative h-[420px] w-full">
    <img alt="Program" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="..." />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div class="absolute top-6 left-6">
      <span class="bg-primary-container/90 text-on-primary-container px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest backdrop-blur-md">Active Journey</span>
    </div>
    <div class="absolute bottom-0 left-0 w-full p-8">
      <h3 class="font-headline text-3xl font-extrabold text-white mb-4 leading-tight">30 Day Booty Challenge</h3>
      <!-- Progress bar -->
      <div class="flex justify-between items-end text-white/90 mb-1">
        <span class="font-bold text-sm">Overall Progress</span>
        <span class="font-extrabold text-xl">75%</span>
      </div>
      <div class="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary-container to-white w-[75%] rounded-full shadow-[0_0_15px_rgba(244,175,158,0.5)]"></div>
      </div>
      <div class="flex gap-4 pt-4">
        <button class="flex-1 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg">Continue Session</button>
      </div>
    </div>
  </div>
</div>
```

---

## Program Card (Side by Side)

```html
<div class="flex flex-col md:flex-row bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_20px_40px_rgba(134,80,67,0.08)] min-h-[300px]">
  <div class="md:w-1/2 relative">
    <img alt="Program" class="w-full h-full object-cover" src="..." />
  </div>
  <div class="md:w-1/2 p-8 flex flex-col justify-center">
    <div class="inline-block bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">No Equipment</div>
    <h3 class="font-headline text-2xl font-bold text-on-surface mb-2">At Home Sculpt</h3>
    <p class="text-on-surface-variant text-sm mb-6">Shape and tone using just your bodyweight.</p>
    <button class="text-primary font-extrabold text-sm flex items-center gap-2 group">
      Start Training
      <span class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
    </button>
  </div>
</div>
```

---

## Progress Orb

SVG circular progress with gradient stroke.

```html
<div class="relative w-24 h-24 flex items-center justify-center">
  <svg class="w-full h-full transform -rotate-90">
    <circle class="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
    <circle cx="48" cy="48" fill="transparent" r="40" stroke="url(#gradient-primary)" stroke-dasharray="251.2" stroke-dashoffset="75" stroke-linecap="round" stroke-width="8"></circle>
    <defs>
      <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#865043"></stop>
        <stop offset="100%" stop-color="#f4af9e"></stop>
      </linearGradient>
    </defs>
  </svg>
  <div class="absolute inset-0 flex flex-col items-center justify-center">
    <span class="text-2xl font-bold text-primary">70%</span>
  </div>
</div>
```

> **Calculating stroke-dashoffset:** `dashoffset = circumference × (1 - percentage)` where circumference = `2πr` = `251.2` for r=40. For 70%: offset = 251.2 × 0.3 = 75.4.

---

## Rest Timer

```html
<div class="relative w-40 h-40 flex items-center justify-center">
  <svg class="absolute inset-0 w-full h-full transform -rotate-90">
    <circle class="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-width="6"></circle>
    <circle class="text-primary transition-all duration-1000" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="110" stroke-width="6"></circle>
  </svg>
  <div class="flex flex-col items-center">
    <span class="text-4xl font-headline font-extrabold text-on-surface">00:45</span>
    <span class="text-[10px] font-bold uppercase tracking-widest text-outline">Resting</span>
  </div>
</div>
```

---

## Streak Display

```html
<div class="flex mt-3 gap-1">
  <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
  <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
  <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
  <!-- Repeat per day in streak -->
</div>
<h3 class="text-2xl font-bold text-primary tracking-tight">5 Days</h3>
<p class="text-[11px] text-on-surface-variant font-medium mt-1">Consistency is key!</p>
```

---

## Profile Hero

```html
<section class="text-center space-y-4">
  <div class="relative inline-block">
    <div class="w-32 h-32 rounded-xl p-1 bg-gradient-to-br from-primary to-primary-container">
      <img alt="Profile" class="w-full h-full object-cover rounded-[calc(2rem-4px)]" src="..." />
    </div>
    <div class="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
      <span class="material-symbols-outlined text-sm">edit</span>
    </div>
  </div>
  <div>
    <h1 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Amara Vance</h1>
    <p class="text-secondary font-medium mt-1">Premium Member since Jan 2024</p>
  </div>
</section>
```

---

## Stats Gradient Banner

Full-width gradient card for hero stats.

```html
<div class="col-span-2 bg-gradient-to-br from-primary to-primary-container p-6 rounded-lg text-white flex justify-between items-center shadow-[0px_20px_40px_rgba(134,80,67,0.12)]">
  <div>
    <p class="font-label text-xs uppercase tracking-[0.2em] opacity-80">Current Streak</p>
    <p class="font-headline text-4xl font-extrabold mt-1">14 Days</p>
  </div>
  <div class="bg-white/20 p-4 rounded-full backdrop-blur-md">
    <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
  </div>
</div>
```

---

## Settings List

No dividers — use hover background transitions.

```html
<div class="bg-surface-container-low rounded-lg overflow-hidden">
  <button class="w-full flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary">
        <span class="material-symbols-outlined">person</span>
      </div>
      <span class="font-bold text-on-surface">Profile Settings</span>
    </div>
    <span class="material-symbols-outlined text-outline">chevron_right</span>
  </button>
  <!-- Repeat pattern for each item — NO dividers -->
</div>
```

---

## Before/After Comparison

Asymmetric grid with offset and decorative element.

```html
<div class="relative grid grid-cols-2 gap-4">
  <!-- Before -->
  <div class="relative">
    <div class="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10">
      <img alt="Before" class="w-full h-full object-cover" src="..." />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <span class="absolute bottom-4 left-4 font-label text-[10px] font-bold uppercase tracking-widest text-white/90 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Week 01</span>
    </div>
  </div>
  <!-- After (offset with mt-8) -->
  <div class="relative mt-8">
    <div class="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-highest shadow-[0px_20px_40px_rgba(134,80,67,0.08)]">
      <img alt="Current" class="w-full h-full object-cover" src="..." />
      <div class="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
      <span class="absolute bottom-4 left-4 font-label text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full shadow-lg">Today</span>
    </div>
    <!-- Decorative sparkle -->
    <div class="absolute -top-4 -right-2 bg-primary-container text-on-primary-container p-3 rounded-full shadow-lg rotate-12">
      <span class="material-symbols-outlined">auto_awesome</span>
    </div>
  </div>
</div>
```

---

## SVG Line Chart

Soft flowing chart with gradient fill area.

```html
<div class="h-32 w-full relative">
  <svg class="w-full h-full" viewBox="0 0 400 100">
    <defs>
      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#865043" stop-opacity="0.2"></stop>
        <stop offset="100%" stop-color="#865043" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <path d="M0,80 Q50,90 100,50 T200,60 T300,30 T400,10" fill="none" stroke="#865043" stroke-linecap="round" stroke-width="3"></path>
    <path d="M0,80 Q50,90 100,50 T200,60 T300,30 T400,10 V100 H0 Z" fill="url(#chartGradient)"></path>
    <circle cx="400" cy="10" fill="#f4af9e" r="6"></circle>
  </svg>
</div>
```

---

## Achievement Card (Wide)

Gradient card spanning full width with decorative circle.

```html
<div class="col-span-2 bg-gradient-to-br from-primary to-primary-container p-6 rounded-lg shadow-lg flex items-center justify-between overflow-hidden relative">
  <div class="relative z-10 text-white space-y-1">
    <h4 class="font-headline text-lg font-bold">12 Session Streak</h4>
    <p class="text-white/80 text-sm">You're in the top 5% of Evara curators.</p>
  </div>
  <div class="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
    <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
  </div>
  <!-- Decorative -->
  <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
</div>
```

---

## Pill Badge

```html
<!-- Solid -->
<span class="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Active Program</span>

<!-- Glassmorphic -->
<span class="text-white/80 text-xs font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full flex items-center gap-1">
  <span class="material-symbols-outlined text-sm">schedule</span> 45 mins
</span>

<!-- Editorial highlight -->
<span class="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">No Equipment</span>
```

---

## Onboarding Step Indicator

```html
<span class="inline-block px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest rounded-full mb-6">Step 02/05</span>
<!-- ... and at the bottom: -->
<p class="text-center mt-4 text-xs font-label uppercase tracking-[0.2em] text-outline">Step 2 of 5: Primary Focus</p>
```

---

## Progress Bar (Inline)

```html
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
  <div class="h-full bg-primary rounded-full w-[65%]"></div>
</div>
```

**With glowing variant (on dark backgrounds):**
```html
<div class="w-full h-3 bg-white/20 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-primary-container to-white w-[75%] rounded-full shadow-[0_0_15px_rgba(244,175,158,0.5)]"></div>
</div>
```

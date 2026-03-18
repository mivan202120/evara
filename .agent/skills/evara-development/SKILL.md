---
name: evara-development
description: |
  The definitive engineering standards for Evara — a premium AI-powered fitness app.
  Use when: writing any code, creating files, designing architecture, implementing features,
  setting up infrastructure, or reviewing code for the Evara project. This skill defines the
  Domain-Driven Design model, clean architecture layers, folder structure, coding conventions,
  state management patterns, and testing strategy. Apply this skill whenever creating TypeScript,
  React Native, Expo, or backend code for Evara.
  Keywords: evara, development, architecture, DDD, domain, clean architecture, TypeScript, React Native, Expo, testing.
---

# Evara — Development Standards & Architecture

> Every line of Evara code must reflect the domain language, respect architectural boundaries, and serve the mission: measurable glute transformation through AI coaching.

## Creative North Star: "Intelligent Simplicity"

The user sees a simple, beautiful experience. Behind the scenes, a sophisticated domain model powers AI-driven personalization, progressive overload, and visual progress tracking. **Simplicity in experience, sophistication in engineering.**

---

## When to Use

- Writing any Evara code (features, fixes, refactors)
- Creating new files, modules, or components
- Designing data models or API contracts
- Setting up state management or services
- Writing or reviewing tests
- Making architectural decisions

## When NOT to Use

- Visual design decisions (use `evara-brand-identity` skill instead)
- Non-Evara projects
- One-off scripts or tooling outside the app codebase

---

## Ubiquitous Language

These terms MUST be used consistently in code, comments, commits, and discussions. Never invent synonyms.

| Domain Term | Definition | Code Name |
|:------------|:-----------|:----------|
| **Program** | A structured multi-week training plan | `Program` |
| **Workout** | A single training session within a program | `Workout` |
| **Exercise** | A specific movement (e.g., Hip Thrust) | `Exercise` |
| **Set** | One execution of reps for an exercise | `ExerciseSet` |
| **Session** | A user's real-time workout execution | `WorkoutSession` |
| **Progression** | AI-driven weight/volume advancement | `ProgressionRule` |
| **Streak** | Consecutive days of completed workouts | `Streak` |
| **Coach** | The AI persona that guides and adapts | `AiCoach` |
| **Milestone** | A significant achievement (PR, streak, visual) | `Milestone` |
| **Curator** | User identity term (Evara calls users "curators") | — (UI only) |
| **Evolution** | Visual progress over time | `ProgressTimeline` |
| **Challenge** | Time-boxed retention event (e.g., 30 Day Booty) | `Challenge` |

---

## Bounded Contexts

Evara's domain is divided into 6 autonomous contexts. Each owns its models, logic, and data.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Training   │◄──►│  AI Coach   │◄──►│  Progress   │
│  (Core)     │    │  (Core)     │    │  (Core)     │
└──────┬──────┘    └──────┬──────┘    └─────────────┘
       │                  │
┌──────┴──────┐    ┌──────┴──────┐    ┌─────────────┐
│  Identity   │    │  Content    │    │Subscription │
│ (Supporting)│    │ (Supporting)│    │  (Generic)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

| Context | Type | Responsibility |
|:--------|:-----|:---------------|
| **Training** | Core | Programs, workouts, exercises, sets, session execution |
| **AI Coach** | Core | Recommendations, fatigue detection, progression rules, coaching messages |
| **Progress** | Core | Photos, measurements, strength records, milestones, streaks |
| **Identity** | Supporting | User profiles, fitness goals, onboarding, preferences |
| **Content** | Supporting | Guided programs, video lessons, challenges |
| **Subscription** | Generic | Plans, payment events, premium access control |

> Read `references/domain-model.md` for full entity definitions and context map.

---

## Folder Structure

```
src/
├── app/                          # Expo Router — file-based routing
│   ├── (tabs)/                   # Tab navigator group
│   │   ├── index.tsx             # Home Dashboard
│   │   ├── programs.tsx          # Training Programs
│   │   ├── progress.tsx          # Visual Progress
│   │   └── profile.tsx           # User Profile
│   ├── workout/
│   │   └── [id].tsx              # Active Workout Session
│   ├── onboarding/
│   │   └── [...step].tsx         # Onboarding Flow
│   └── _layout.tsx               # Root Layout
│
├── domain/                       # 🧠 DOMAIN LAYER (Pure logic, no deps)
│   ├── training/
│   │   ├── entities/             # Program, Workout, Exercise, ExerciseSet
│   │   ├── value-objects/        # MuscleGroup, Intensity, Duration
│   │   ├── aggregates/           # WorkoutSession (aggregate root)
│   │   ├── events/               # SetCompleted, WorkoutFinished
│   │   ├── repositories/         # IWorkoutRepository (interface only)
│   │   └── services/             # ProgressionCalculator
│   ├── coach/
│   │   ├── entities/             # Recommendation, FatigueAssessment
│   │   ├── value-objects/        # CoachingTone, EnergyLevel
│   │   ├── events/               # RecommendationGenerated
│   │   └── services/             # AdaptationEngine
│   ├── progress/
│   │   ├── entities/             # ProgressPhoto, StrengthRecord
│   │   ├── value-objects/        # BodyMeasurement, PersonalBest
│   │   ├── events/               # MilestoneAchieved, PersonalBestSet
│   │   └── aggregates/           # ProgressTimeline
│   ├── identity/
│   │   ├── entities/             # UserProfile, FitnessGoal
│   │   ├── value-objects/        # Streak, OnboardingState
│   │   └── events/               # GoalSelected, OnboardingCompleted
│   ├── content/
│   │   ├── entities/             # GuidedProgram, VideoLesson, Challenge
│   │   └── value-objects/        # Difficulty, EquipmentRequirement
│   └── subscription/
│       ├── entities/             # Subscription, Plan
│       ├── value-objects/        # SubscriptionTier
│       └── events/               # SubscriptionActivated, SubscriptionExpired
│
├── application/                  # 📋 APPLICATION LAYER (Use Cases)
│   ├── training/
│   │   ├── start-workout.ts      # StartWorkoutUseCase
│   │   ├── complete-set.ts       # CompleteSetUseCase
│   │   └── get-active-program.ts # GetActiveProgramQuery
│   ├── coach/
│   │   ├── get-recommendation.ts
│   │   └── assess-fatigue.ts
│   ├── progress/
│   │   ├── add-progress-photo.ts
│   │   └── get-personal-bests.ts
│   └── identity/
│       ├── complete-onboarding.ts
│       └── update-profile.ts
│
├── infrastructure/               # 🔧 INFRASTRUCTURE LAYER (External)
│   ├── api/                      # API clients (Supabase, external)
│   ├── storage/                  # AsyncStorage, SecureStore, image storage
│   ├── ai/                       # Gemini/OpenAI integration
│   ├── notifications/            # Push notification service
│   └── repositories/             # Concrete repository implementations
│
├── presentation/                 # 🎨 PRESENTATION LAYER (UI)
│   ├── components/               # Shared UI components (follows brand-identity skill)
│   │   ├── ai-coach-bubble.tsx
│   │   ├── bento-card.tsx
│   │   ├── bottom-nav.tsx
│   │   ├── hero-workout-card.tsx
│   │   ├── progress-orb.tsx
│   │   └── top-app-bar.tsx
│   ├── hooks/                    # UI hooks
│   │   ├── use-workout-session.ts
│   │   └── use-coach-message.ts
│   └── stores/                   # Zustand stores (one per bounded context)
│       ├── training-store.ts
│       ├── coach-store.ts
│       ├── progress-store.ts
│       └── identity-store.ts
│
├── shared/                       # Cross-cutting utilities
│   ├── types/                    # Shared TypeScript types
│   ├── utils/                    # Pure utility functions
│   ├── constants/                # App-wide constants
│   └── errors/                   # Custom error classes
│
└── __tests__/                    # Test root (mirrors src/ structure)
    ├── domain/
    ├── application/
    ├── infrastructure/
    └── presentation/
```

### Layer Rules

| Layer | May Depend On | Must NOT Depend On |
|:------|:-------------|:-------------------|
| **Domain** | Nothing (pure) | Application, Infrastructure, Presentation |
| **Application** | Domain | Infrastructure, Presentation |
| **Infrastructure** | Domain, Application | Presentation |
| **Presentation** | Application, Domain types | Infrastructure directly |

---

## Core Design Principles

### 1. Domain Purity
The domain layer has **zero external dependencies**. No React, no Expo, no Supabase, no Zustand. Only pure TypeScript logic, interfaces, and types.

### 2. Aggregate Boundaries
Each aggregate enforces its own invariants. Never modify entities from another aggregate directly — emit domain events instead.

### 3. Interface-First Infrastructure
Repositories and services are defined as interfaces in the domain layer, implemented in infrastructure. Swap implementations without touching domain logic.

### 4. One Store Per Context
Each bounded context gets exactly one Zustand store in `presentation/stores/`. Stores consume use cases from the application layer — never domain logic directly.

### 5. Feature Isolation
Bounded contexts don't import from each other's internals. Cross-context communication uses domain events or shared value objects in `shared/types/`.

---

## Coding Conventions

### TypeScript
- **Strict mode** always: `"strict": true` in tsconfig
- **Interfaces** for object shapes, **types** for unions/intersections
- **Readonly** by default for domain entities and value objects
- **No `any`** — use `unknown` + type guards instead
- **Exhaustive checks** with `never` in switch statements

### Naming
| Element | Convention | Example |
|:--------|:-----------|:--------|
| Files | kebab-case | `complete-set.ts` |
| Classes/Interfaces | PascalCase | `WorkoutSession`, `IWorkoutRepository` |
| Functions/Methods | camelCase | `calculateProgression()` |
| Constants | SCREAMING_SNAKE | `MAX_SETS_PER_EXERCISE` |
| React Components | PascalCase | `HeroWorkoutCard` |
| Zustand Stores | camelCase + "Store" | `trainingStore` |
| Domain Events | PastTense + PascalCase | `SetCompleted`, `WorkoutFinished` |
| Use Cases | Verb + Noun | `StartWorkoutUseCase` |
| Value Objects | Noun (immutable) | `MuscleGroup`, `Duration` |

### Exports
- **Named exports only** — no default exports (better tree-shaking, refactoring)
- **Barrel exports** (`index.ts`) per domain module for clean imports
- Re-export types separately: `export type { ... }`

### Error Handling
- Domain errors extend a base `DomainError` class
- Use `Result<T, E>` pattern for operations that can fail (no thrown exceptions in domain)
- Infrastructure errors are caught and mapped to domain errors in the application layer

---

## State Management

Zustand stores organized by bounded context.

```typescript
// presentation/stores/training-store.ts
import { create } from 'zustand';
import type { WorkoutSession, Program } from '@/domain/training';

interface TrainingState {
  activeProgram: Program | null;
  currentSession: WorkoutSession | null;
  // Actions (thin — delegate to use cases)
  startWorkout: (workoutId: string) => Promise<void>;
  completeSet: (setId: string, reps: number, weight: number) => Promise<void>;
}
```

**Rules:**
- Stores hold **presentation state** — the domain layer is the source of truth for business logic
- One store per bounded context maximum
- Actions in stores call use cases, never domain services directly
- Use `subscribeWithSelector` for performance-critical subscriptions

---

## Testing Strategy

### 1. Domain Layer (Unit Tests) → **Mandatory**
Test every entity, value object, aggregate, and domain service in isolation.
```
__tests__/domain/training/workout-session.test.ts
```

### 2. Application Layer (Integration Tests) → **Mandatory for core contexts**
Test use cases with mocked repositories.
```
__tests__/application/training/complete-set.test.ts
```

### 3. Presentation Layer (Snapshot + Interaction) → **Recommended**
Snapshot tests for component consistency, interaction tests for user flows.
```
__tests__/presentation/components/hero-workout-card.test.tsx
```

### Testing Rules
- Domain tests must run without any mocking framework — pure functions, pure tests
- Mock only at infrastructure boundaries (repositories, API clients)
- Minimum 90% coverage on domain and application layers
- Use React Native Testing Library, not Enzyme
- Name test files `*.test.ts` (not `*.spec.ts`)

---

## Do's and Don'ts

### ✅ Do
- Use the Ubiquitous Language in all code, comments, and commits
- Keep domain entities immutable — return new instances on mutation
- Emit domain events for cross-context side effects
- Use value objects for concepts with no identity (MuscleGroup, Duration, Intensity)
- Co-locate related files by bounded context, not by technical type
- Make aggregates small and focused on specific invariants
- Use dependency injection for infrastructure services

### ❌ Don't
- Import from another bounded context's internal modules
- Put business logic in React components or Zustand stores
- Use `any` type — ever
- Create "God services" that span multiple bounded contexts
- Mix infrastructure concerns (Supabase, AsyncStorage) into the domain layer
- Use default exports
- Name domain events in present tense (use past: `SetCompleted`, not `CompleteSet`)

---

## Verification

Before committing any Evara code, confirm:

- [ ] Uses Ubiquitous Language — no invented synonyms
- [ ] New entities placed in the correct bounded context
- [ ] Domain layer has zero external dependencies
- [ ] Aggregates enforce their own invariants
- [ ] Repository interfaces defined in domain, implementations in infrastructure
- [ ] No cross-context internal imports
- [ ] Zustand store calls use cases, not domain services directly
- [ ] Named exports only (no default exports)
- [ ] `strict: true` TypeScript — no `any` usage
- [ ] Domain and application tests written and passing

---

## References

- `references/domain-model.md` — Full entity definitions, aggregate boundaries, domain events catalog, context map
- `references/architecture-patterns.md` — TypeScript templates for entities, value objects, aggregates, repositories, use cases, stores
- `evara-brand-identity` skill — Visual design system (use alongside this skill)

# Evara Architecture Patterns

Copy-paste TypeScript templates for every architectural pattern used in Evara. These follow the folder structure and DDD conventions defined in the main SKILL.md.

---

## Entity Template

Entities have identity and lifecycle. Use for objects that change over time but maintain their identity.

```typescript
// domain/training/entities/workout.ts

export interface WorkoutProps {
  readonly id: string;
  readonly programId: string;
  readonly dayNumber: number;
  readonly name: string;
  readonly exercises: Exercise[];
  readonly estimatedDuration: Duration;
}

export class Workout {
  private constructor(private readonly props: WorkoutProps) {}

  static create(props: WorkoutProps): Workout {
    if (props.dayNumber < 1) {
      throw new DomainError('Day number must be >= 1');
    }
    if (props.exercises.length === 0) {
      throw new DomainError('Workout must have at least one exercise');
    }
    return new Workout(props);
  }

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get dayNumber(): number { return this.props.dayNumber; }
  get exercises(): readonly Exercise[] { return this.props.exercises; }
  get estimatedDuration(): Duration { return this.props.estimatedDuration; }

  getExerciseAt(index: number): Exercise | undefined {
    return this.props.exercises[index];
  }

  get totalSets(): number {
    return this.props.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  }
}
```

---

## Value Object Template

Value objects have no identity — they are defined entirely by their attributes. Always immutable.

```typescript
// domain/training/value-objects/weight.ts

export class Weight {
  private constructor(
    readonly value: number,
    readonly unit: 'kg' | 'lbs',
  ) {}

  static create(value: number, unit: 'kg' | 'lbs' = 'kg'): Weight {
    if (value <= 0) {
      throw new DomainError('Weight must be positive');
    }
    return new Weight(value, unit);
  }

  toKg(): number {
    return this.unit === 'kg' ? this.value : this.value * 0.453592;
  }

  toLbs(): number {
    return this.unit === 'lbs' ? this.value : this.value * 2.20462;
  }

  add(other: Weight): Weight {
    return Weight.create(this.toKg() + other.toKg(), 'kg');
  }

  equals(other: Weight): boolean {
    return Math.abs(this.toKg() - other.toKg()) < 0.01;
  }

  toString(): string {
    return `${this.value}${this.unit}`;
  }
}
```

```typescript
// domain/training/value-objects/muscle-group.ts

const VALID_GROUPS = [
  'glutes', 'hamstrings', 'quads', 'calves',
  'core', 'back', 'chest', 'shoulders', 'arms',
] as const;

export type MuscleGroupName = typeof VALID_GROUPS[number];

export class MuscleGroup {
  private constructor(readonly name: MuscleGroupName) {}

  static create(name: string): MuscleGroup {
    const normalized = name.toLowerCase().trim();
    if (!VALID_GROUPS.includes(normalized as MuscleGroupName)) {
      throw new DomainError(`Invalid muscle group: ${name}`);
    }
    return new MuscleGroup(normalized as MuscleGroupName);
  }

  equals(other: MuscleGroup): boolean {
    return this.name === other.name;
  }
}
```

---

## Aggregate Root Template

Aggregates enforce invariants and emit domain events. The root is the only entry point.

```typescript
// domain/training/aggregates/workout-session.ts

import type { DomainEvent } from '@/shared/types/domain-event';

interface CompletedSet {
  readonly exerciseId: string;
  readonly setNumber: number;
  readonly reps: number;
  readonly weight: Weight;
  readonly completedAt: Date;
}

interface WorkoutSessionProps {
  readonly id: string;
  readonly workoutId: string;
  readonly userId: string;
  readonly startedAt: Date;
  completedAt: Date | null;
  completedSets: CompletedSet[];
  currentExerciseIndex: number;
}

export class WorkoutSession {
  private events: DomainEvent[] = [];

  private constructor(private props: WorkoutSessionProps) {}

  static start(id: string, workoutId: string, userId: string): WorkoutSession {
    const session = new WorkoutSession({
      id,
      workoutId,
      userId,
      startedAt: new Date(),
      completedAt: null,
      completedSets: [],
      currentExerciseIndex: 0,
    });

    session.addEvent({
      type: 'WorkoutSessionStarted',
      payload: { sessionId: id, workoutId, userId, startedAt: session.props.startedAt },
    });

    return session;
  }

  completeSet(exerciseId: string, setNumber: number, reps: number, weight: Weight): void {
    // Invariant: reps and weight must be positive
    if (reps <= 0) throw new DomainError('Reps must be positive');
    if (weight.value <= 0) throw new DomainError('Weight must be positive');

    // Invariant: cannot complete set for wrong exercise
    // (validates against workout — simplified here)

    const completedSet: CompletedSet = {
      exerciseId,
      setNumber,
      reps,
      weight,
      completedAt: new Date(),
    };

    this.props.completedSets = [...this.props.completedSets, completedSet];

    this.addEvent({
      type: 'SetCompleted',
      payload: { sessionId: this.id, exerciseId, setNumber, reps, weight: weight.value },
    });
  }

  finish(): void {
    if (this.props.completedAt) {
      throw new DomainError('Session already completed');
    }

    this.props.completedAt = new Date();

    this.addEvent({
      type: 'WorkoutFinished',
      payload: {
        sessionId: this.id,
        totalSets: this.props.completedSets.length,
        totalVolume: this.totalVolume,
        duration: this.durationMinutes,
      },
    });
  }

  get id(): string { return this.props.id; }
  get isActive(): boolean { return this.props.completedAt === null; }

  get totalVolume(): number {
    return this.props.completedSets.reduce(
      (sum, set) => sum + set.reps * set.weight.toKg(),
      0,
    );
  }

  get durationMinutes(): number {
    const end = this.props.completedAt ?? new Date();
    return Math.round((end.getTime() - this.props.startedAt.getTime()) / 60000);
  }

  pullEvents(): DomainEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }

  private addEvent(event: DomainEvent): void {
    this.events.push(event);
  }
}
```

---

## Domain Event Types

```typescript
// shared/types/domain-event.ts

export interface DomainEvent {
  readonly type: string;
  readonly payload: Record<string, unknown>;
  readonly occurredAt?: Date;
}

// Event bus interface
export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}
```

---

## Domain Error

```typescript
// shared/errors/domain-error.ts

export class DomainError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

// Result type for operations that can fail
export type Result<T, E = DomainError> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const Result = {
  ok: <T>(value: T): Result<T, never> => ({ ok: true, value }),
  fail: <E>(error: E): Result<never, E> => ({ ok: false, error }),
};
```

---

## Repository Interface Template

Defined in domain, implemented in infrastructure.

```typescript
// domain/training/repositories/workout-repository.ts

export interface IWorkoutRepository {
  findById(id: string): Promise<Workout | null>;
  findByProgramId(programId: string): Promise<Workout[]>;
  save(workout: Workout): Promise<void>;
}

export interface ISessionRepository {
  findActiveByUserId(userId: string): Promise<WorkoutSession | null>;
  save(session: WorkoutSession): Promise<void>;
}
```

```typescript
// infrastructure/repositories/supabase-workout-repository.ts

import type { IWorkoutRepository } from '@/domain/training/repositories/workout-repository';

export class SupabaseWorkoutRepository implements IWorkoutRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findById(id: string): Promise<Workout | null> {
    const { data, error } = await this.supabase
      .from('workouts')
      .select('*, exercises(*)')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return WorkoutMapper.toDomain(data);
  }

  async findByProgramId(programId: string): Promise<Workout[]> {
    const { data } = await this.supabase
      .from('workouts')
      .select('*, exercises(*)')
      .eq('program_id', programId)
      .order('day_number');

    return (data ?? []).map(WorkoutMapper.toDomain);
  }

  async save(workout: Workout): Promise<void> {
    const raw = WorkoutMapper.toPersistence(workout);
    await this.supabase.from('workouts').upsert(raw);
  }
}
```

---

## Use Case Template

Application layer — orchestrates domain logic.

```typescript
// application/training/complete-set.ts

import type { ISessionRepository } from '@/domain/training/repositories/workout-repository';
import type { EventBus } from '@/shared/types/domain-event';
import { Weight } from '@/domain/training/value-objects/weight';
import { DomainError, Result } from '@/shared/errors/domain-error';

interface CompleteSetInput {
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weightKg: number;
}

export class CompleteSetUseCase {
  constructor(
    private readonly sessionRepo: ISessionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: CompleteSetInput): Promise<Result<void>> {
    const session = await this.sessionRepo.findActiveByUserId(input.sessionId);

    if (!session) {
      return Result.fail(new DomainError('No active session found'));
    }

    try {
      const weight = Weight.create(input.weightKg);
      session.completeSet(input.exerciseId, input.setNumber, input.reps, weight);
      await this.sessionRepo.save(session);

      // Publish domain events
      for (const event of session.pullEvents()) {
        await this.eventBus.publish(event);
      }

      return Result.ok(undefined);
    } catch (error) {
      if (error instanceof DomainError) {
        return Result.fail(error);
      }
      throw error; // Re-throw unexpected errors
    }
  }
}
```

---

## Zustand Store Template

One store per bounded context. Actions call use cases.

```typescript
// presentation/stores/training-store.ts

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Program } from '@/domain/training/entities/program';
import type { WorkoutSession } from '@/domain/training/aggregates/workout-session';

interface TrainingState {
  // State
  activeProgram: Program | null;
  currentSession: WorkoutSession | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadActiveProgram: (userId: string) => Promise<void>;
  startWorkout: (workoutId: string) => Promise<void>;
  completeSet: (exerciseId: string, setNumber: number, reps: number, weightKg: number) => Promise<void>;
  finishWorkout: () => Promise<void>;
  clearError: () => void;
}

export const useTrainingStore = create<TrainingState>()(
  subscribeWithSelector((set, get) => ({
    activeProgram: null,
    currentSession: null,
    isLoading: false,
    error: null,

    loadActiveProgram: async (userId: string) => {
      set({ isLoading: true, error: null });
      try {
        // Use case injection — injected via a provider or module
        const program = await getActiveProgramUseCase.execute(userId);
        set({ activeProgram: program.ok ? program.value : null, isLoading: false });
      } catch {
        set({ error: 'Failed to load program', isLoading: false });
      }
    },

    startWorkout: async (workoutId: string) => {
      set({ isLoading: true });
      try {
        const result = await startWorkoutUseCase.execute({ workoutId });
        if (result.ok) {
          set({ currentSession: result.value, isLoading: false });
        } else {
          set({ error: result.error.message, isLoading: false });
        }
      } catch {
        set({ error: 'Failed to start workout', isLoading: false });
      }
    },

    completeSet: async (exerciseId, setNumber, reps, weightKg) => {
      const session = get().currentSession;
      if (!session) return;

      const result = await completeSetUseCase.execute({
        sessionId: session.id,
        exerciseId,
        setNumber,
        reps,
        weightKg,
      });

      if (!result.ok) {
        set({ error: result.error.message });
      }
      // Session state is updated via store refresh
    },

    finishWorkout: async () => {
      set({ currentSession: null });
    },

    clearError: () => set({ error: null }),
  })),
);
```

---

## React Component Template

Follows brand-identity skill for visual design. Uses stores for state.

```tsx
// presentation/components/hero-workout-card.tsx

import { View, Text, Pressable, Image } from 'react-native';
import { useTrainingStore } from '@/presentation/stores/training-store';

interface HeroWorkoutCardProps {
  onStartPress: () => void;
}

export function HeroWorkoutCard({ onStartPress }: HeroWorkoutCardProps) {
  const { activeProgram, isLoading } = useTrainingStore();

  if (!activeProgram || isLoading) return null;

  const currentWorkout = activeProgram.getCurrentWorkout();

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentWorkout.coverImageUri }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.badges}>
          <PillBadge label="Active Program" variant="primary" />
          <PillBadge label={`${currentWorkout.estimatedDuration} mins`} variant="glass" />
        </View>
        <Text style={styles.title}>{currentWorkout.name}</Text>
        <Text style={styles.description}>{currentWorkout.description}</Text>
        <PrimaryButton label="Start Workout" icon="play_arrow" onPress={onStartPress} />
      </View>
    </View>
  );
}
```

---

## Custom Hook Template

Bridges presentation and application layer.

```typescript
// presentation/hooks/use-workout-session.ts

import { useCallback } from 'react';
import { useTrainingStore } from '@/presentation/stores/training-store';

export function useWorkoutSession() {
  const {
    currentSession,
    completeSet,
    finishWorkout,
    error,
    clearError,
  } = useTrainingStore();

  const handleCompleteSet = useCallback(
    (exerciseId: string, setNumber: number, reps: number, weightKg: number) => {
      completeSet(exerciseId, setNumber, reps, weightKg);
    },
    [completeSet],
  );

  return {
    session: currentSession,
    isActive: currentSession?.isActive ?? false,
    totalVolume: currentSession?.totalVolume ?? 0,
    duration: currentSession?.durationMinutes ?? 0,
    completeSet: handleCompleteSet,
    finishWorkout,
    error,
    clearError,
  };
}
```

---

## Domain Unit Test Template

```typescript
// __tests__/domain/training/workout-session.test.ts

import { WorkoutSession } from '@/domain/training/aggregates/workout-session';
import { Weight } from '@/domain/training/value-objects/weight';

describe('WorkoutSession', () => {
  it('should start a new session', () => {
    const session = WorkoutSession.start('s1', 'w1', 'u1');

    expect(session.id).toBe('s1');
    expect(session.isActive).toBe(true);
    expect(session.totalVolume).toBe(0);
  });

  it('should complete a set and track volume', () => {
    const session = WorkoutSession.start('s1', 'w1', 'u1');
    const weight = Weight.create(15);

    session.completeSet('e1', 1, 12, weight);

    expect(session.totalVolume).toBe(180); // 12 * 15
  });

  it('should emit SetCompleted event', () => {
    const session = WorkoutSession.start('s1', 'w1', 'u1');
    session.completeSet('e1', 1, 10, Weight.create(20));

    const events = session.pullEvents();
    // First event is WorkoutSessionStarted, second is SetCompleted
    expect(events).toHaveLength(2);
    expect(events[1].type).toBe('SetCompleted');
  });

  it('should reject negative reps', () => {
    const session = WorkoutSession.start('s1', 'w1', 'u1');
    expect(() => session.completeSet('e1', 1, -1, Weight.create(10))).toThrow('Reps must be positive');
  });

  it('should not allow finishing twice', () => {
    const session = WorkoutSession.start('s1', 'w1', 'u1');
    session.finish();
    expect(() => session.finish()).toThrow('Session already completed');
  });
});
```

---

## Expo Router File Convention

```
app/
├── _layout.tsx           # Root layout (providers, fonts, etc.)
├── (tabs)/
│   ├── _layout.tsx       # Tab navigator
│   ├── index.tsx         # Home → { screen: 'Home', icon: 'home' }
│   ├── programs.tsx      # Programs → { screen: 'Programs', icon: 'fitness_center' }
│   ├── progress.tsx      # Progress → { screen: 'Progress', icon: 'insert_chart' }
│   └── profile.tsx       # Profile → { screen: 'Profile', icon: 'person' }
├── workout/
│   └── [id].tsx          # Dynamic: /workout/abc123
├── onboarding/
│   └── [...step].tsx     # Catch-all: /onboarding/goals, /onboarding/profile
└── +not-found.tsx        # 404 handler
```

**Rules:**
- Route files are thin — they import a screen component from `presentation/`
- No business logic in route files
- Use `_layout.tsx` for shared providers and navigation config
- Use route groups `(groupName)` for logical navigation grouping

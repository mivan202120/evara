import { View, Text, ScrollView, Image, Pressable, Dimensions, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle, Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { useState, useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInDown,
  ZoomIn,
} from "react-native-reanimated";

// ─── Design Tokens ───────────────────────────────────────────────────────────

const COLORS = {
  primary: "#865043",
  primaryContainer: "#f4af9e",
  primaryFixed: "#ffdad2",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#734034",
  background: "#fff8f6",
  surfaceContainerLow: "#fdf1ee",
  surfaceContainer: "#f7ebe8",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#f1e6e3",
  surfaceContainerHighest: "#ebe0dd",
  onSurface: "#201a19",
  onSurfaceVariant: "#514440",
  outline: "#83746f",
  outlineVariant: "#d5c3bd",
};

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Maya",
  greeting: "Good morning",
  avatarUri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
};

const MOCK_COACH = {
  message: "Ready to crush your lower body session today? Your consistency has been incredible this week.",
  highlight: "5-day streak",
  tip: "Today's focus: progressive overload on hip thrusts. I've increased your weight by 2.5kg based on your last session.",
};

const MOCK_STATS = {
  weeklyGoal: { completed: 4, total: 6, percentage: 70 },
  streak: { days: 5, best: 12 },
  totalWorkouts: 47,
  minutesTrained: 2340,
  volumeThisWeek: "12,450 kg",
};

const MOCK_FEATURED = {
  title: "Day 12 — Booty\nSculpt Program",
  subtitle: "Lower body focus with resistance bands and progressive overload techniques.",
  duration: "45 min",
  calories: "~320 cal",
  badge: "Active Program",
  exercises: 8,
  imageUri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=1600&fit=crop",
  progress: 40,
};

const MOCK_UPCOMING = [
  { id: "1", day: "Tomorrow", name: "Upper Body Tone", duration: "35 min", icon: "fitness-center" as const, muscles: "Arms & Back" },
  { id: "2", day: "Wednesday", name: "Core & Glutes", duration: "40 min", icon: "self-improvement" as const, muscles: "Core & Glutes" },
  { id: "3", day: "Thursday", name: "Active Recovery", duration: "20 min", icon: "spa" as const, muscles: "Full Body" },
];

const MOCK_ACHIEVEMENTS = [
  { id: "1", label: "Sessions", value: "47", icon: "fitness-center" as const },
  { id: "2", label: "Hours", value: "39", icon: "schedule" as const },
  { id: "3", label: "Best Streak", value: "12", icon: "local-fire-department" as const },
  { id: "4", label: "PRs Set", value: "8", icon: "emoji-events" as const },
];

const MOCK_COMMUNITY = [
  { id: "1", name: "Sarah J.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", action: 'Finished "Glute Sculpt Express"', emoji: "🔥", time: "2h ago" },
  { id: "2", name: "Ana R.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", action: "Hit a new deadlift PR — 80kg!", emoji: "💪", time: "4h ago" },
  { id: "3", name: "Lucia V.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face", action: 'Joined "30 Day Core Challenge"', emoji: "⚡", time: "5h ago" },
];

// ─── Responsive Hook ─────────────────────────────────────────────────────────

function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isWide: width >= 1280,
    width,
  };
}

// ─── SVG Progress Orb ────────────────────────────────────────────────────────

function ProgressOrb({ percentage, size = 120, showLabel = true }: { percentage: number; size?: number; showLabel?: boolean }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  const center = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={center} cy={center} r={radius} stroke={COLORS.surfaceContainer} strokeWidth={strokeWidth} fill="transparent" />
        <Defs>
          <LinearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.primary} />
            <Stop offset="100%" stopColor={COLORS.primaryContainer} />
          </LinearGradient>
        </Defs>
        <Circle cx={center} cy={center} r={radius} stroke="url(#orbGrad)" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
      </Svg>
      {showLabel && (
        <View style={{ position: "absolute", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.primary, fontSize: size * 0.25 }}>
            {percentage}%
          </Text>
          <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: size * 0.09, marginTop: 2 }}>
            complete
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Mini Chart SVG ──────────────────────────────────────────────────────────

function MiniChart() {
  return (
    <Svg width="100%" height={60} viewBox="0 0 200 60">
      <Defs>
        <LinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.15} />
          <Stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d="M0,45 Q25,50 50,35 T100,25 T150,15 T200,8" fill="none" stroke={COLORS.primary} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M0,45 Q25,50 50,35 T100,25 T150,15 T200,8 V60 H0 Z" fill="url(#chartFill)" />
      <Circle cx={200} cy={8} r={4} fill={COLORS.primaryContainer} stroke={COLORS.primary} strokeWidth={2} />
    </Svg>
  );
}

// ─── Top App Bar ─────────────────────────────────────────────────────────────

function TopAppBar() {
  const insets = useSafeAreaInsets();
  const { isDesktop } = useResponsive();

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(100)}
      style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
        paddingTop: insets.top + 8, paddingBottom: 16,
        paddingHorizontal: isDesktop ? 40 : 24,
        backgroundColor: "rgba(255, 248, 246, 0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxWidth: 1400, alignSelf: "center", width: "100%" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, overflow: "hidden", borderWidth: 2, borderColor: COLORS.primaryFixed }}>
            <Image source={{ uri: MOCK_USER.avatarUri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
          {isDesktop && (
            <View>
              <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: 12 }}>{MOCK_USER.greeting}</Text>
              <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: 16 }}>{MOCK_USER.name}</Text>
            </View>
          )}
        </View>
        <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.primary, fontSize: 28, letterSpacing: -1.5 }}>
          Evara
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {isDesktop && (
            <Pressable style={{ padding: 10, borderRadius: 12, backgroundColor: COLORS.surfaceContainerLow }}>
              <MaterialIcons name="search" size={22} color={COLORS.primary} />
            </Pressable>
          )}
          <Pressable style={{ padding: 10, borderRadius: 12, backgroundColor: COLORS.surfaceContainerLow }}>
            <MaterialIcons name="notifications-none" size={22} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── AI Coach Bubble ─────────────────────────────────────────────────────────

function AiCoachBubble() {
  const { isDesktop } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.duration(700).delay(200)}>
      <View style={{
        flexDirection: "row", gap: 16, alignItems: "flex-start",
        ...(isDesktop && { maxWidth: "100%" }),
      }}>
        {/* Coach Avatar */}
        <View style={{
          width: 52, height: 52, borderRadius: 26,
          backgroundColor: COLORS.primary,
          alignItems: "center", justifyContent: "center",
          shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10,
        }}>
          <MaterialIcons name="auto-awesome" size={22} color="#fff" />
        </View>

        {/* Bubble */}
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: COLORS.surfaceContainerLow, padding: 20,
            borderTopLeftRadius: 4, borderTopRightRadius: 24, borderBottomRightRadius: 24, borderBottomLeftRadius: 24,
            borderLeftWidth: 4, borderLeftColor: "rgba(134, 80, 67, 0.15)",
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.primary, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                Evara Coach
              </Text>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#4CAF50" }} />
            </View>
            <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurface, fontSize: 15, lineHeight: 24 }}>
              {MOCK_COACH.message}{" "}
              <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.primary }}>
                {MOCK_COACH.highlight}! 🔥
              </Text>
            </Text>
            {isDesktop && (
              <View style={{
                marginTop: 16, padding: 14, borderRadius: 12,
                backgroundColor: "rgba(134, 80, 67, 0.05)",
                flexDirection: "row", alignItems: "center", gap: 10,
              }}>
                <MaterialIcons name="lightbulb" size={18} color={COLORS.primary} />
                <Text style={{ fontFamily: "Manrope_400Regular", color: COLORS.onSurfaceVariant, fontSize: 13, lineHeight: 20, flex: 1 }}>
                  {MOCK_COACH.tip}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, sublabel, children, delay = 0, span2 = false }: {
  label: string; value?: string; sublabel?: string; children?: React.ReactNode; delay?: number; span2?: boolean;
}) {
  const { isDesktop } = useResponsive();
  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(delay).springify()}
      style={{
        flex: span2 ? 2 : 1,
        minWidth: isDesktop ? 200 : 140,
        backgroundColor: COLORS.surfaceContainerLowest,
        padding: isDesktop ? 28 : 20,
        borderRadius: 20,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.04, shadowRadius: 24, elevation: 4,
        alignItems: children ? "center" : "flex-start",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.onSurfaceVariant, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
        {label}
      </Text>
      {children}
      {value && (
        <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.primary, fontSize: isDesktop ? 36 : 28, letterSpacing: -1 }}>
          {value}
        </Text>
      )}
      {sublabel && (
        <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: 11, marginTop: 4 }}>
          {sublabel}
        </Text>
      )}
    </Animated.View>
  );
}

// ─── Bento Stats Grid ────────────────────────────────────────────────────────

function BentoStatsGrid() {
  const { isDesktop, isWide } = useResponsive();

  return (
    <View>
      <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: isDesktop ? 22 : 18, marginBottom: 16 }}>
        Your Progress
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        {/* Weekly Goal Orb */}
        <StatCard label="Weekly Goal" sublabel={`${MOCK_STATS.weeklyGoal.completed} of ${MOCK_STATS.weeklyGoal.total} sessions`} delay={300}>
          <ProgressOrb percentage={MOCK_STATS.weeklyGoal.percentage} size={isDesktop ? 140 : 110} />
        </StatCard>

        {/* Streak */}
        <StatCard label="Current Streak" delay={400}>
          <View style={{ flexDirection: "row", gap: 2, marginBottom: 8 }}>
            {Array.from({ length: MOCK_STATS.streak.days }).map((_, i) => (
              <MaterialIcons key={i} name="local-fire-department" size={20} color={COLORS.primary} />
            ))}
          </View>
          <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.primary, fontSize: isDesktop ? 36 : 28, letterSpacing: -1 }}>
            {MOCK_STATS.streak.days} Days
          </Text>
          <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: 11, marginTop: 4 }}>
            Best: {MOCK_STATS.streak.best} days
          </Text>
        </StatCard>

        {/* Volume Chart - only on desktop */}
        {isDesktop && (
          <StatCard label="Weekly Volume" value={MOCK_STATS.volumeThisWeek} sublabel="Total weight lifted" delay={500}>
            <View style={{ width: "100%", marginBottom: 8 }}>
              <MiniChart />
            </View>
          </StatCard>
        )}
      </View>
    </View>
  );
}

// ─── Hero Workout Card ───────────────────────────────────────────────────────

function HeroWorkoutCard() {
  const { isDesktop, isMobile } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.duration(800).delay(500)}>
      <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: isDesktop ? 22 : 18, marginBottom: 16 }}>
        Today's Workout
      </Text>
      <View style={{
        flexDirection: isDesktop ? "row" : "column",
        borderRadius: 24, overflow: "hidden",
        backgroundColor: COLORS.surfaceContainerLowest,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.12, shadowRadius: 32, elevation: 16,
      }}>
        {/* Image */}
        <View style={{
          width: isDesktop ? "45%" : "100%",
          aspectRatio: isDesktop ? 3 / 4 : 16 / 10,
          position: "relative",
        }}>
          <Image source={{ uri: MOCK_FEATURED.imageUri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          {/* Gradient overlay */}
          <View style={{
            position: "absolute", inset: 0,
            ...(isDesktop
              ? { background: "linear-gradient(to right, transparent 50%, rgba(255,248,246,1) 100%)" }
              : { background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }),
          }} />

          {/* Mobile overlay text */}
          {!isDesktop && (
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
                <View style={{ backgroundColor: COLORS.primaryContainer, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 }}>
                  <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.onPrimaryContainer, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                    {MOCK_FEATURED.badge}
                  </Text>
                </View>
              </View>
              <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: "#fff", fontSize: 28, letterSpacing: -0.5, lineHeight: 34 }}>
                {MOCK_FEATURED.title}
              </Text>
            </View>
          )}
        </View>

        {/* Content panel */}
        <View style={{
          flex: isDesktop ? 1 : undefined,
          padding: isDesktop ? 40 : 24,
          justifyContent: "center",
        }}>
          {isDesktop && (
            <>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
                <View style={{ backgroundColor: COLORS.primaryContainer, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 }}>
                  <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.onPrimaryContainer, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                    {MOCK_FEATURED.badge}
                  </Text>
                </View>
                <View style={{ backgroundColor: COLORS.primaryFixed, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 }}>
                  <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.primary, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                    Day 12 of 30
                  </Text>
                </View>
              </View>
              <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.onSurface, fontSize: 34, letterSpacing: -1, lineHeight: 42, marginBottom: 12 }}>
                {MOCK_FEATURED.title}
              </Text>
            </>
          )}

          <Text style={{ fontFamily: "Manrope_400Regular", color: COLORS.onSurfaceVariant, fontSize: 14, lineHeight: 22, marginBottom: 24, maxWidth: 400 }}>
            {MOCK_FEATURED.subtitle}
          </Text>

          {/* Meta chips */}
          <View style={{ flexDirection: "row", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { icon: "schedule" as const, text: MOCK_FEATURED.duration },
              { icon: "whatshot" as const, text: MOCK_FEATURED.calories },
              { icon: "format-list-numbered" as const, text: `${MOCK_FEATURED.exercises} exercises` },
            ].map((chip, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <MaterialIcons name={chip.icon} size={16} color={COLORS.primary} />
                <Text style={{ fontFamily: "Manrope_600SemiBold", color: COLORS.onSurfaceVariant, fontSize: 13 }}>{chip.text}</Text>
              </View>
            ))}
          </View>

          {/* Progress bar */}
          <View style={{ marginBottom: 28 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ fontFamily: "Manrope_600SemiBold", color: COLORS.onSurface, fontSize: 13 }}>Program Progress</Text>
              <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.primary, fontSize: 13 }}>{MOCK_FEATURED.progress}%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: COLORS.surfaceContainer, borderRadius: 999, overflow: "hidden" }}>
              <View style={{
                height: "100%", width: `${MOCK_FEATURED.progress}%`, borderRadius: 999,
                backgroundColor: COLORS.primary,
                shadowColor: COLORS.primaryContainer, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8,
              }} />
            </View>
          </View>

          {/* CTA */}
          <Pressable style={{
            height: 56, borderRadius: 16,
            backgroundColor: COLORS.primary,
            flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
            shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 12,
            maxWidth: isDesktop ? 320 : "100%",
          }}>
            <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: "#fff", fontSize: 17 }}>
              Start Workout
            </Text>
            <MaterialIcons name="play-arrow" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Upcoming Workouts ───────────────────────────────────────────────────────

function UpcomingWorkouts() {
  const { isDesktop } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.duration(700).delay(600)}>
      <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: isDesktop ? 22 : 18, marginBottom: 16 }}>
        Coming Up
      </Text>
      <View style={{ gap: 12 }}>
        {MOCK_UPCOMING.map((item, i) => (
          <Animated.View key={item.id} entering={FadeInDown.duration(500).delay(700 + i * 100)}>
            <Pressable style={{
              flexDirection: "row", alignItems: "center", gap: 16,
              backgroundColor: COLORS.surfaceContainerLowest,
              padding: isDesktop ? 20 : 16, borderRadius: 16,
              shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2,
            }}>
              <View style={{
                width: 52, height: 52, borderRadius: 16,
                backgroundColor: COLORS.primaryFixed,
                alignItems: "center", justifyContent: "center",
              }}>
                <MaterialIcons name={item.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "Manrope_600SemiBold", color: COLORS.onSurfaceVariant, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
                  {item.day} · {item.muscles}
                </Text>
                <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: 16, marginTop: 2 }}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <MaterialIcons name="schedule" size={14} color={COLORS.outlineVariant} />
                <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: 12 }}>{item.duration}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={COLORS.outlineVariant} />
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── Achievement Stats Row ───────────────────────────────────────────────────

function AchievementRow() {
  const { isDesktop } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.duration(700).delay(700)}>
      <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: isDesktop ? 22 : 18, marginBottom: 16 }}>
        All-Time Stats
      </Text>
      <View style={{
        borderRadius: 20, overflow: "hidden",
        backgroundColor: COLORS.primary,
        padding: isDesktop ? 32 : 24,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 10,
        position: "relative",
      }}>
        {/* Decorative circles */}
        <View style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.08)" }} />
        <View style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.05)" }} />

        <View style={{ flexDirection: "row", justifyContent: "space-around", position: "relative", zIndex: 1 }}>
          {MOCK_ACHIEVEMENTS.map((stat, i) => (
            <Animated.View key={stat.id} entering={ZoomIn.duration(500).delay(800 + i * 100)} style={{ alignItems: "center" }}>
              <View style={{
                width: isDesktop ? 56 : 44, height: isDesktop ? 56 : 44, borderRadius: isDesktop ? 16 : 12,
                backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", marginBottom: 12,
              }}>
                <MaterialIcons name={stat.icon} size={isDesktop ? 24 : 20} color="rgba(255,255,255,0.9)" />
              </View>
              <Text style={{ fontFamily: "PlusJakartaSans_800ExtraBold", color: "#fff", fontSize: isDesktop ? 28 : 22 }}>
                {stat.value}
              </Text>
              <Text style={{ fontFamily: "Manrope_500Medium", color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4 }}>
                {stat.label}
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Community Activity ──────────────────────────────────────────────────────

function CommunityActivity() {
  const { isDesktop } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.duration(700).delay(800)}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontFamily: "PlusJakartaSans_700Bold", color: COLORS.onSurface, fontSize: isDesktop ? 22 : 18 }}>
          Community
        </Text>
        <Pressable>
          <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.primary, fontSize: 13 }}>See All</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingRight: 16 }}>
        {MOCK_COMMUNITY.map((item, i) => (
          <Animated.View key={item.id} entering={FadeInRight.duration(600).delay(900 + i * 120)}>
            <View style={{
              width: isDesktop ? 280 : 240, padding: 20, borderRadius: 20,
              backgroundColor: COLORS.surfaceContainerLowest,
              shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2,
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, overflow: "hidden", borderWidth: 2, borderColor: COLORS.primaryFixed }}>
                  <Image source={{ uri: item.avatar }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.onSurface, fontSize: 13 }}>{item.name}</Text>
                  <Text style={{ fontFamily: "Manrope_400Regular", color: COLORS.outlineVariant, fontSize: 11 }}>{item.time}</Text>
                </View>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </View>
              <Text style={{ fontFamily: "Manrope_500Medium", color: COLORS.onSurfaceVariant, fontSize: 13, lineHeight: 20 }}>
                {item.action}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

// ─── Bottom Nav Bar ──────────────────────────────────────────────────────────

function BottomNavBar() {
  const insets = useSafeAreaInsets();
  const { isDesktop } = useResponsive();

  const tabs = [
    { name: "Home", icon: "home" as const, active: true },
    { name: "Programs", icon: "fitness-center" as const, active: false },
    { name: "Progress", icon: "insert-chart" as const, active: false },
    { name: "Profile", icon: "person" as const, active: false },
  ];

  // On desktop, show sidebar-style nav at the bottom (still floating pill)
  return (
    <Animated.View
      entering={SlideInDown.duration(700).delay(400)}
      style={{
        position: "absolute", bottom: isDesktop ? 24 : Math.max(insets.bottom, 16),
        left: isDesktop ? "50%" : 16, right: isDesktop ? undefined : 16,
        ...(isDesktop && { transform: [{ translateX: -220 }], width: 440 }),
        zIndex: 50,
      }}
    >
      <View style={{
        flexDirection: "row", justifyContent: "space-around", alignItems: "center",
        backgroundColor: "rgba(255, 248, 246, 0.88)",
        backdropFilter: "blur(20px)",
        paddingVertical: 12, borderRadius: 999,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 20,
      }}>
        {tabs.map((tab) => (
          <Pressable key={tab.name} style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 16, paddingVertical: 6 }}>
            {tab.active ? (
              <View style={{
                backgroundColor: COLORS.primary, borderRadius: 999, padding: 12,
                shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
                transform: [{ scale: 1.1 }, { translateY: -4 }],
              }}>
                <MaterialIcons name={tab.icon} size={22} color="#fff" />
              </View>
            ) : (
              <View style={{ alignItems: "center", padding: 8 }}>
                <MaterialIcons name={tab.icon} size={22} color={COLORS.outlineVariant} />
                <Text style={{ fontFamily: "Manrope_700Bold", color: COLORS.outlineVariant, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>
                  {tab.name}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isDesktop, isWide } = useResponsive();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <TopAppBar />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 80,
          paddingBottom: 140,
          paddingHorizontal: isDesktop ? 40 : 24,
          gap: isDesktop ? 40 : 28,
          maxWidth: 1400,
          alignSelf: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial greeting - desktop only */}
        {isDesktop && (
          <Animated.View entering={FadeInDown.duration(700).delay(100)}>
            <Text style={{
              fontFamily: "PlusJakartaSans_800ExtraBold", color: COLORS.onSurface,
              fontSize: isWide ? 48 : 38, letterSpacing: -2, lineHeight: isWide ? 54 : 44,
              maxWidth: 600,
            }}>
              Let's build your{"\n"}
              <Text style={{ color: COLORS.primary }}>best self</Text> today.
            </Text>
          </Animated.View>
        )}

        <AiCoachBubble />

        {/* Desktop: 2-column layout for stats + workout */}
        {isDesktop ? (
          <View style={{ flexDirection: "row", gap: 32 }}>
            {/* Left column */}
            <View style={{ flex: 3, gap: 40 }}>
              <HeroWorkoutCard />
              <UpcomingWorkouts />
            </View>
            {/* Right column */}
            <View style={{ flex: 2, gap: 32 }}>
              <BentoStatsGrid />
              <AchievementRow />
              <CommunityActivity />
            </View>
          </View>
        ) : (
          <>
            <BentoStatsGrid />
            <HeroWorkoutCard />
            <UpcomingWorkouts />
            <AchievementRow />
            <CommunityActivity />
          </>
        )}
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

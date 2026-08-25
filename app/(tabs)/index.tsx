import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../src/lib/theme";
import { useDataMago } from "../../src/lib/store";

export default function HomeScreen() {
  const kits = useDataMago((s) => s.kits);

  return (
    <View style={styles.root}>
      <Text style={styles.kicker}>DATA · MAGO</Text>
      <Text style={styles.title}>Visual kits,{"\n"}in your pocket.</Text>
      <Text style={styles.body}>
        Capture a look, turn it into a paste-ready AI style kit, and sell packs on
        Gumroad or PromptBase. Built for mobile-first creators.
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{kits.length}</Text>
          <Text style={styles.statLabel}>Kits</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>$9–29</Text>
          <Text style={styles.statLabel}>List range</Text>
        </View>
      </View>

      <Link href="/(tabs)/create" asChild>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Create a style kit</Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/kits" asChild>
        <Pressable style={styles.secondary}>
          <Text style={styles.secondaryText}>Open kit library</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
    justifyContent: "center",
  },
  kicker: {
    color: colors.primary,
    letterSpacing: 3,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 42,
    marginBottom: spacing.md,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.md,
  },
  statValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 12,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  ctaText: {
    color: "#1a100c",
    fontWeight: "700",
    fontSize: 16,
  },
  secondary: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.text,
    fontWeight: "600",
  },
});

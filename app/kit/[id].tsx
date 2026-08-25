import { useLocalSearchParams, router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Share,
} from "react-native";
import { colors, spacing } from "../../src/lib/theme";
import { useDataMago } from "../../src/lib/store";
import { gumroadListing } from "../../src/lib/kit";

export default function KitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const kit = useDataMago((s) => s.kits.find((k) => k.id === id));
  const removeKit = useDataMago((s) => s.removeKit);

  if (!kit) {
    return (
      <View style={styles.root}>
        <Text style={styles.missing}>Kit not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.primary }}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const listing = gumroadListing(kit);

  async function copyPrompt() {
    try {
      // Fallback Share if clipboard module missing in some builds
      await Share.share({ message: kit!.stylePrompt });
    } catch {
      Alert.alert("Prompt", kit!.stylePrompt);
    }
  }

  async function shareListing() {
    await Share.share({
      message: listing,
      title: kit!.title,
    });
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 48 }}
    >
      <Text style={styles.title}>{kit.title}</Text>
      <Text style={styles.price}>Suggested · ${kit.priceHintUsd}</Text>

      <Text style={styles.label}>Style prompt</Text>
      <View style={styles.box}>
        <Text style={styles.mono}>{kit.stylePrompt}</Text>
      </View>

      <Text style={styles.label}>Negative prompt</Text>
      <View style={styles.box}>
        <Text style={styles.mono}>{kit.negativePrompt}</Text>
      </View>

      <Pressable style={styles.cta} onPress={copyPrompt}>
        <Text style={styles.ctaText}>Share / copy prompt</Text>
      </Pressable>

      <Pressable style={styles.secondary} onPress={shareListing}>
        <Text style={styles.secondaryText}>Share Gumroad listing copy</Text>
      </Pressable>

      <Pressable
        style={styles.danger}
        onPress={() => {
          removeKit(kit.id);
          router.back();
        }}
      >
        <Text style={styles.dangerText}>Delete kit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  missing: { color: colors.text, marginBottom: 12 },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  price: { color: colors.primary, marginBottom: spacing.lg, fontWeight: "600" },
  label: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: spacing.md,
  },
  box: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  mono: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "monospace",
  },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: "#1a100c", fontWeight: "700", fontSize: 16 },
  secondary: {
    marginTop: spacing.sm,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: { color: colors.text, fontWeight: "600" },
  danger: {
    marginTop: spacing.lg,
    alignItems: "center",
    padding: 12,
  },
  dangerText: { color: "#ff6b6b" },
});

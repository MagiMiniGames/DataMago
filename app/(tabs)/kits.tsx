import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../src/lib/theme";
import { useDataMago } from "../../src/lib/store";

export default function KitsScreen() {
  const kits = useDataMago((s) => s.kits);

  if (kits.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No kits yet</Text>
        <Text style={styles.emptyBody}>
          Create your first style kit from the Create tab.
        </Text>
        <Link href="/(tabs)/create" asChild>
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Create kit</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg, gap: 12 }}
      data={kits}
      keyExtractor={(k) => k.id}
      renderItem={({ item }) => (
        <Link href={`/kit/${item.id}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta} numberOfLines={2}>
              {item.stylePrompt}
            </Text>
            <Text style={styles.price}>${item.priceHintUsd} suggested</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyBody: {
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  ctaText: { color: "#1a100c", fontWeight: "700" },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.md,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  price: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
  },
});

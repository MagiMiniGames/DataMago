import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing } from "../../src/lib/theme";
import { useDataMago } from "../../src/lib/store";

const MOODS = [
  "vivid, happy, warm light",
  "golden hour, soft glow",
  "editorial, clean contrast",
  "tropical, saturated, playful",
  "cinematic, dramatic depth",
];

export default function CreateScreen() {
  const addKit = useDataMago((s) => s.addKit);
  const [title, setTitle] = useState("");
  const [objects, setObjects] = useState("");
  const [style, setStyle] = useState("");
  const [mood, setMood] = useState(MOODS[0]);

  function onCreate() {
    const objList = objects
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const kit = addKit({
      title: title || undefined,
      objects: objList.length ? objList : undefined,
      style: style || undefined,
      mood,
    });

    Alert.alert("Kit ready", kit.title, [
      { text: "View", onPress: () => router.push(`/kit/${kit.id}`) },
      { text: "OK" },
    ]);

    setTitle("");
    setObjects("");
    setStyle("");
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 48 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>New style kit</Text>
      <Text style={styles.hint}>
        Describe the look. DataMago builds a paste-ready prompt + listing copy.
      </Text>

      <Text style={styles.label}>Title (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Tropical Beach Editorial Style Kit"
        placeholderTextColor={colors.muted}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Subjects / objects</Text>
      <TextInput
        style={styles.input}
        placeholder="hibiscus, turquoise water, mountains"
        placeholderTextColor={colors.muted}
        value={objects}
        onChangeText={setObjects}
      />

      <Text style={styles.label}>Style notes (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="editorial photography, shallow depth"
        placeholderTextColor={colors.muted}
        value={style}
        onChangeText={setStyle}
      />

      <Text style={styles.label}>Mood</Text>
      <View style={styles.chips}>
        {MOODS.map((m) => (
          <Pressable
            key={m}
            onPress={() => setMood(m)}
            style={[styles.chip, mood === m && styles.chipOn]}
          >
            <Text style={[styles.chipText, mood === m && styles.chipTextOn]}>
              {m.split(",")[0]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.cta} onPress={onCreate}>
        <Text style={styles.ctaText}>Build kit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  hint: {
    color: colors.muted,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    color: colors.text,
    fontSize: 16,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipOn: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  chipText: { color: colors.muted, fontSize: 13 },
  chipTextOn: { color: colors.primary, fontWeight: "600" },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: {
    color: "#1a100c",
    fontWeight: "700",
    fontSize: 16,
  },
});

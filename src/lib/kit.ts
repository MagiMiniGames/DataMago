/** Build a sellable AI style kit from simple visual tags (mobile-side). */

export type KitDraft = {
  id: string;
  title: string;
  stylePrompt: string;
  negativePrompt: string;
  objects: string[];
  mood: string;
  priceHintUsd: number;
  createdAt: number;
};

export function buildKit(input: {
  objects?: string[];
  mood?: string;
  style?: string;
  title?: string;
}): KitDraft {
  const objects = input.objects?.filter(Boolean) ?? ["hero subject"];
  const mood = input.mood?.trim() || "vivid, uplifting, warm light";
  const style =
    input.style?.trim() ||
    "cinematic editorial photography, rich color, commercial-ready";

  const stylePrompt = [
    objects.join(", "),
    style,
    mood,
    "high detail, soft volumetric light, cheerful energy, balanced composition",
  ]
    .filter(Boolean)
    .join(", ");

  const title =
    input.title?.trim() ||
    `${objects.slice(0, 2).join(" · ") || "Editorial"} Style Kit`;

  return {
    id: `kit_${Date.now()}`,
    title,
    stylePrompt,
    negativePrompt:
      "blurry, low resolution, distorted, watermark, text overlay, dull colors, nsfw",
    objects,
    mood,
    priceHintUsd: 14,
    createdAt: Date.now(),
  };
}

export function gumroadListing(kit: KitDraft): string {
  return `${kit.title}

Turn this look into new images in seconds.

What you get
• Ready-to-paste style prompt (Midjourney · Flux · Grok Imagine · SD)
• Negative prompt for cleaner results
• Mobile-built DataMago kit

Mood: ${kit.mood}
Subjects: ${kit.objects.join(", ")}

Suggested price: $${kit.priceHintUsd}

How to use
1. Copy the style prompt
2. Paste into your image model
3. Generate and adapt the subject as needed

— DataMago`;
}

import { create } from "zustand";
import { buildKit, type KitDraft } from "./kit";

type State = {
  kits: KitDraft[];
  addKit: (partial: {
    objects?: string[];
    mood?: string;
    style?: string;
    title?: string;
  }) => KitDraft;
  removeKit: (id: string) => void;
};

export const useDataMago = create<State>((set, get) => ({
  kits: [],
  addKit: (partial) => {
    const kit = buildKit(partial);
    set({ kits: [kit, ...get().kits] });
    return kit;
  },
  removeKit: (id) => set({ kits: get().kits.filter((k) => k.id !== id) }),
}));

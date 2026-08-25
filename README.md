# DataMago

Mobile app for building **AI style kits** from visual looks — paste-ready prompts + Gumroad listing copy.

Stack: **Expo (React Native)** · TypeScript · Zustand · Expo Router

## Features

- **Home** — product overview + kit count  
- **Create** — title, subjects, style notes, mood chips → builds a kit  
- **Kits** — library of saved style packs  
- **Kit detail** — style prompt, negatives, share listing copy for Gumroad / PromptBase  

Naming tip for packs: `[Mood / Place] + [Subject] + Style Kit`  
e.g. *Tropical Beach Editorial Style Kit*

## Run locally

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android).

## Project layout

```
app/                 # Expo Router screens
  (tabs)/            # Home · Create · Kits
  kit/[id].tsx       # Kit detail + share
src/lib/
  kit.ts             # Prompt + Gumroad copy builder
  store.ts           # Zustand kit library
  theme.ts           # Dark coral theme
```

## GitHub

Repo target: `MagiMiniGames/datamago`

If the repo is empty, push with:

```bash
git init
git add .
git commit -m "Initial DataMago mobile app (Expo)"
git branch -M main
git remote add origin https://github.com/MagiMiniGames/datamago.git
git push -u origin main
```

## Roadmap ideas

- Photo picker → auto-suggest subjects/mood  
- ZIP export (prompt + README) for Gumroad upload  
- Link to Visual Equity Protocol (VEP) live scans  
- Persist kits with AsyncStorage  

## License

MIT · MagiMiniGames / Tukilifeparadise

# **App Name**: Nexus Chronicles

## Core Features:

- Game Center: Game Center: Displays player stats (health, energy, hunger), currency (Nexus Kristali), and quick access to save and menu options.
- Character Profile: Character Profile: Shows detailed character attributes (strength, intelligence, spirit, HP, origin) and metadata (age, gender, orientation, style, backstory).
- Inventory Management: Inventory Management: Displays a grid-based inventory with item icons and details (type, value, description, nutrition). Allows using or dropping items.
- World Map: World Map: Interactive map displaying locations, factions, and real-time currency conversions based on region modifiers.
- Quest Log: Quest Log: Displays active quests with descriptions, moral choices, and potential outcomes.
- Database Integration: Database Integration: Stores player progress (xp, current_quest, last_saved) in MySQL table `nc_player_progress`.
- WordPress Plugin: WordPress Plugin: Registers shortcodes `[nexus_game]` and `[nexus_compendium]` for embedding the game and lore compendium.
- AJAX Handling: AJAX Handling: Uses AJAX handlers to load character data, quests, and world state from the WordPress backend.

## Style Guidelines:

- Primary color: Deep, vibrant teal (#008080) to evoke a sense of futuristic exploration and mystery.
- Secondary color: Dark charcoal gray (#333333) for backgrounds to provide contrast and readability.
- Accent color: Electric lime green (#32CD32) for highlighting interactive elements and important information.
- Headline font: 'Orbitron' (sans-serif) for a futuristic and tech-inspired aesthetic.
- Body font: 'Roboto' (sans-serif) for clean readability and a modern feel.
- Use glowing, neon-style icons for inventory items, stats, and map locations.
- Divide the screen into distinct panels for stats, inventory, map, and quest log, ensuring a clear and organized presentation.
- Subtle animations for item selection, stat changes, and currency transactions to provide visual feedback.
'use server';
/**
 * @fileOverview An AI flow to analyze the entire project codebase and generate a comprehensive report.
 *
 * - analyzeProject - Takes the concatenated content of all project files and returns a detailed analysis.
 * - ProjectAnalysisInput - The input type for the analyzeProject function.
 * - ProjectAnalysisOutput - The return type for the analyzeProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectAnalysisInputSchema = z.object({
  fileContents: z.string().describe('A single string containing the full content of all relevant project files, concatenated together.'),
});
export type ProjectAnalysisInput = z.infer<typeof ProjectAnalysisInputSchema>;

const ProjectAnalysisOutputSchema = z.object({
  analysisReport: z.string().describe('A detailed, well-structured markdown report analyzing the entire project.'),
});
export type ProjectAnalysisOutput = z.infer<typeof ProjectAnalysisOutputSchema>;

export async function analyzeProject(input: ProjectAnalysisInput): Promise<ProjectAnalysisOutput> {
  return projectAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectAnalysisPrompt',
  input: {schema: ProjectAnalysisInputSchema},
  output: {schema: ProjectAnalysisOutputSchema},
  prompt: `You are an expert software architect and senior game designer. Your task is to conduct a deep and comprehensive analysis of the provided source code for a Next.js-based RPG called "Nexus Chronicles".

Your analysis must be thorough, insightful, and structured. Break it down into the following sections:

**1. High-Level Architecture Overview:**
   - Describe the overall structure of the Next.js application (App Router, Server/Client components).
   - Explain the role of the key directories: \`/app\`, \`/components\`, \`/lib\`, \`/stores\`, \`/ai\`, \`/data\`.
   - Discuss the integration of Genkit for AI features.

**2. State Management (Zustand - \`useCharacterStore.ts\`):**
   - Detail how player state (character profile, inventory, quests) is managed.
   - Explain the actions available in the store (e.g., \`createCharacter\`, \`updateCharacterStats\`, \`addQuest\`).
   - Discuss the use of \`persist\` middleware for saving game data to localStorage.

**3. Core Gameplay Mechanics (\`character-calculations.ts\`):**
   - Provide a deep dive into the stat calculation system. Explain the concept of "Base Attributes" vs. "Calculated Stats".
   - Detail at least three key calculations, explaining both the "WHY" (the design philosophy) and the "HOW" (the formula). For example, analyze 'Effective Strength', 'Analysis Paralysis', and 'Crit Chance'.
   - Explain the curse system and its impact on gameplay.

**4. UI and Component Library (ShadCN & Custom Components):**
   - Describe the role of ShadCN UI components in the project.
   - Highlight key custom components like \`StatInternals\`, \`MissionControl\`, and \`Inventory\` and explain their function.
   - Discuss the styling approach using Tailwind CSS and CSS variables in \`globals.css\`.

**5. Narrative and Lore Implementation:**
   - Analyze how the game's story and world-building are presented to the player (e.g., \`/explore-the-story\`, \`tutorial\`, \`MissionControl\`).
   - Discuss the structure of the quest system and how narrative choices are handled.

**6. AI Integration (Genkit Flows):**
   - Explain the purpose of the existing AI flows (\`summarize-reference-flow.ts\`, \`project-analysis-flow.ts\`).
   - Describe how they are triggered and what value they provide to the developer/player.

**7. Potential Areas for Expansion & Improvement:**
   - Based on your analysis, suggest 3-5 concrete, actionable ideas for new features or improvements. These could be new game mechanics, UI enhancements, or deeper AI integrations. Be creative and specific.

Here is the entire codebase content:
---
{{{fileContents}}}
---`,
});

const projectAnalysisFlow = ai.defineFlow(
  {
    name: 'projectAnalysisFlow',
    inputSchema: ProjectAnalysisInputSchema,
    outputSchema: ProjectAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

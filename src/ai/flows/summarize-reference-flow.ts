'use server';
/**
 * @fileOverview An AI flow to analyze a game design document and provide insights.
 *
 * - summarizeReference - A function that takes markdown content and returns a detailed summary and development tips.
 * - SummarizeReferenceInput - The input type for the summarizeReference function.
 * - SummarizeReferenceOutput - The return type for the summarizeReference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReferenceInputSchema = z.object({
  documentContent: z.string().describe('The full content of the game design markdown file.'),
});
export type SummarizeReferenceInput = z.infer<typeof SummarizeReferenceInputSchema>;

const SummarizeReferenceOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the document's key themes and systems."),
  tips: z.array(z.string()).describe('A list of actionable development tips, potential expansions, or areas to clarify based on the document.'),
});
export type SummarizeReferenceOutput = z.infer<typeof SummarizeReferenceOutputSchema>;

export async function summarizeReference(input: SummarizeReferenceInput): Promise<SummarizeReferenceOutput> {
  return summarizeReferenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReferencePrompt',
  input: {schema: SummarizeReferenceInputSchema},
  output: {schema: SummarizeReferenceOutputSchema},
  prompt: `You are a senior game design consultant. Your task is to analyze the provided game design document and provide a high-level summary and actionable development tips.

Focus on the core mechanics, narrative structure, and progression systems. Identify potential strengths, weaknesses, and areas for expansion or clarification.

Your output should be structured to help a developer prioritize their next steps.

Game Design Document Content:
---
{{{documentContent}}}
---`,
});

const summarizeReferenceFlow = ai.defineFlow(
  {
    name: 'summarizeReferenceFlow',
    inputSchema: SummarizeReferenceInputSchema,
    outputSchema: SummarizeReferenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

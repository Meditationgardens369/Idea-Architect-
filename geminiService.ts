
import { GoogleGenAI, Type } from "@google/genai";
import { ArchitectOutput } from "./types";

const SYSTEM_INSTRUCTION = `
You are a world-class "High-Achiever Knowledge Architect" and "Action-to-Execution Systems Designer."
Your goal is to turn a transcript into a clean, visual, interactive execution guide.

RULES:
- Do NOT rewrite ideas into new meaning. Preserve original intent.
- Remove filler words and repetition.
- Separate "Ideas" from "Commitments" from "Random Brainstorm."
- Identify "high leverage" actions.
- Use the provided JSON schema strictly.
- ALWAYS return the full structure even if some arrays are empty.

The user will provide a transcript. Output a single JSON object matching the ArchitectOutput interface.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.OBJECT,
      properties: {
        direction: { type: Type.STRING },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        risks: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["direction", "opportunities", "risks"]
    },
    themeMap: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        nodes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              notes: { type: Type.STRING },
              nodes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING } } } }
            },
            required: ["title"]
          }
        }
      },
      required: ["title", "nodes"]
    },
    roadmap: {
      type: Type.OBJECT,
      properties: {
        columns: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    why: { type: Type.STRING },
                    dod: { type: Type.STRING },
                    effort: { type: Type.STRING },
                    dependencies: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["title", "why", "dod", "effort"]
                }
              }
            },
            required: ["name", "tasks"]
          }
        }
      },
      required: ["columns"]
    },
    decisionBoard: {
      type: Type.OBJECT,
      properties: {
        keep: { type: Type.ARRAY, items: { type: Type.STRING } },
        kill: { type: Type.ARRAY, items: { type: Type.STRING } },
        park: { type: Type.ARRAY, items: { type: Type.STRING } },
        research: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["keep", "kill", "park", "research"]
    },
    projectModules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          goal: { type: Type.STRING },
          audience: { type: Type.STRING },
          assets: { type: Type.ARRAY, items: { type: Type.STRING } },
          metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
          firstTest: { type: Type.STRING }
        },
        required: ["name", "goal"]
      }
    },
    automations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          trigger: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          output: { type: Type.STRING },
          tools: { type: Type.ARRAY, items: { type: Type.STRING } },
          mvp: { type: Type.STRING }
        },
        required: ["name", "trigger", "steps"]
      }
    },
    content: {
      type: Type.OBJECT,
      properties: {
        hooks: { type: Type.ARRAY, items: { type: Type.STRING } },
        shortScripts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              outline: { type: Type.STRING }
            },
            required: ["title", "outline"]
          }
        },
        longOutlines: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              structure: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "structure"]
          }
        }
      },
      required: ["hooks", "shortScripts", "longOutlines"]
    },
    openLoops: { type: Type.ARRAY, items: { type: Type.STRING } },
    theOneMove: {
      type: Type.OBJECT,
      properties: {
        action: { type: Type.STRING },
        reason: { type: Type.STRING }
      },
      required: ["action", "reason"]
    }
  },
  required: [
    "executiveSummary", 
    "themeMap", 
    "roadmap", 
    "decisionBoard", 
    "projectModules", 
    "automations", 
    "content", 
    "openLoops", 
    "theOneMove"
  ]
};

function cleanJsonResponse(text: string): string {
  // Sometimes models wrap JSON in markdown blocks even if asked not to
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) return match[1].trim();
  return text.trim();
}

export async function processTranscript(transcript: string): Promise<ArchitectOutput> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: `---TRANSCRIPT START---\n${transcript}\n---TRANSCRIPT END---` }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      thinkingConfig: { thinkingBudget: 4000 } // Allocate some thinking tokens for complex architectural decisions
    },
  });

  const rawText = response.text;
  if (!rawText) throw new Error("Empty response from Gemini");
  
  const cleanedJson = cleanJsonResponse(rawText);
  try {
    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error("JSON Parse Error. Raw content:", rawText);
    throw new Error("The AI returned invalid data. Try a shorter transcript or check your prompt.");
  }
}

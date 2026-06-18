import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json();

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 512,
      messages: [{
        role: "user",
        content: `Analyze these dog food ingredients and identify the main protein sources:

INGREDIENTS: ${ingredients}

Respond ONLY with a raw JSON object. No markdown, no backticks:
{
  "detectedProteins": ["chicken", "fish", "beef", "turkey", "lamb", "pork", "salmon"]
}

Only include proteins that are actually present. Use lowercase. Only use these values: chicken, fish, beef, turkey, lamb, pork, salmon`
      }]
    });

    const text = (response.content[0] as { type: string; text: string }).text;
    const clean = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
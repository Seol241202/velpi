import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json();

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: `You are a dog nutrition expert. Analyze these dog food ingredients:

INGREDIENTS: ${ingredients}

Respond ONLY with a raw JSON object. No markdown, no backticks:
{
  "overall": "Good/Average/Poor",
  "score": 1,
  "goodIngredients": ["list", "of", "good", "ingredients"],
  "badIngredients": ["list", "of", "concerning", "ingredients"],
  "allergens": ["common", "allergens", "present"],
  "protein": "estimated protein quality description",
  "summary": "2-3 sentence summary"
}`
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
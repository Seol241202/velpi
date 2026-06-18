import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { petType, petAge, petGender, petBreed, budget } = await req.json();

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a pet insurance expert. Recommend the best pet insurance plan for this pet:
- Pet Type: ${petType}
- Age: ${petAge}
- Gender: ${petGender}
- Breed: ${petBreed}
- Budget preference: ${budget || "flexible"}

From these options: Lemonade, Fetch, ASPCA, Embrace, Pumpkin, Pets Best, Healthy Paws, FIGO

Respond ONLY with a raw JSON object. No markdown, no backticks:
{
  "top_pick": "provider name",
  "top_pick_reason": "2-3 sentence explanation",
  "estimated_monthly": "$XX-XX/mo",
  "recommended_coverage": "what coverage type to get",
  "runners_up": ["provider2", "provider3"],
  "watch_out": "one thing to be careful about for this breed/age",
  "url": "provider website url"
}`,
        },
      ],
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
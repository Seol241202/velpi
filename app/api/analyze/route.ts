import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType } = await req.json();

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `You are a veterinary health assistant. Analyze this pet stool image and provide a JSON response with these fields:
- color: string (e.g. "brown", "black", "red", "yellow")
- consistency: string (e.g. "firm", "soft", "liquid", "hard")
- concerns: string[] (list any visible issues)
- recommendation: "monitor" | "see_vet_soon" | "emergency"
- summary: string (2-3 sentence friendly explanation)

Respond ONLY with a raw JSON object. No markdown, no backticks, no explanation.`,
            },
          ],
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
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
              text: `Analyze this pet photo and return ONLY a JSON object with these fields:
{
  "petType": "dog" or "cat",
  "dominantColor": "hex color of the pet's fur (e.g. #8B4513)",
  "accentColor": "complementary background hex color that would look nice with this pet"
}
Respond with raw JSON only, no markdown.`,
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
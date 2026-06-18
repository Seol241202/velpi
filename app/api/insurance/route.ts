import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { petType, petAge, petGender, petBreed, reimbursement, deductible, annualLimit, addons } = await req.json();

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1500,
      messages: [{
        role: "user",
        content: `You are a pet insurance expert. Give estimated monthly quotes for this pet across all major providers.

Pet: ${petType}, ${petAge}, ${petGender}, ${petBreed}
Coverage: ${reimbursement} reimbursement, ${deductible} deductible, ${annualLimit} annual limit
Add-ons: ${addons}

Providers to quote: FIGO, Lemonade, Fetch, ASPCA, Embrace, Pets Best, Healthy Paws

Respond ONLY with a raw JSON object. No markdown, no backticks:
{
  "top_pick": "provider name",
  "top_pick_reason": "2-3 sentence explanation",
  "estimated_monthly": "$XX-XX/mo",
  "watch_out": "one thing to be careful about",
  "runners_up": ["provider2", "provider3"],
  "all_providers": [
    { "name": "FIGO", "estimated_monthly": "$XX/mo", "note": "one sentence about this provider for this pet" },
    { "name": "Lemonade", "estimated_monthly": "$XX/mo", "note": "..." },
    { "name": "Fetch", "estimated_monthly": "$XX/mo", "note": "..." },
    { "name": "ASPCA", "estimated_monthly": "$XX/mo", "note": "..." },
    { "name": "Embrace", "estimated_monthly": "$XX/mo", "note": "..." },
    { "name": "Pets Best", "estimated_monthly": "$XX/mo", "note": "..." },
    { "name": "Healthy Paws", "estimated_monthly": "$XX/mo", "note": "..." }
  ]
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
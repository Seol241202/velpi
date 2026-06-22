import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType, question } = await req.json();

    const content: any[] = [];

    // 이미지가 있으면 추가
    if (imageBase64 && mediaType) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: mediaType,
          data: imageBase64,
        },
      });
    }

    // 질문 텍스트 구성
    const promptText = question
      ? `You are a friendly and knowledgeable veterinary AI assistant for the Velpi app. 
Answer the following question about pet health in a clear, caring, and practical way.
If the question is about a symptom or concern, explain possible causes and when to see a vet.
Always respond in the same language as the question.
${imageBase64 ? "Also analyze the provided image if relevant to the question." : ""}

Question: ${question}`
      : `You are a veterinary health assistant. Analyze this pet image and describe what you see.
Provide practical health insights and recommendations.
Respond in a friendly, clear way. If it's a stool image, analyze color,
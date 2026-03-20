// Trigger Next.js Turbopack reload
import { streamText } from 'ai'
import { groq } from '@ai-sdk/groq'

const systemPrompt = `You are an expert startup mentor and business analyst. Your role is to provide comprehensive, constructive feedback on startup ideas.

When analyzing a startup idea, structure your response as follows:

**Idea Summary**: Briefly restate the startup idea to ensure understanding.

**Market Potential**: Assess the market size, growth opportunities, and demand for this solution.

**Target Users**: Identify the primary and secondary target audiences. Who benefits most from this idea?

**Problem Solved**: Clearly articulate the core problem your idea solves and why it matters.

**Solution Approach**: How does your startup uniquely solve this problem? What's the differentiator?

**Revenue Model**: Suggest 2-3 viable monetization strategies and discuss their pros/cons.

**Competitive Landscape**: Identify existing competitors and how your idea stands out.

**Key Challenges**: List the main obstacles you'll face and potential solutions.

**Go-to-Market Strategy**: Suggest an initial strategy to acquire your first customers.

**Next Steps**: Recommend 3-5 concrete actions to validate and develop this idea further.

Be encouraging but honest. Provide actionable insights. Ask clarifying questions if needed. Keep responses focused and well-structured.`

export async function POST(request: Request) {
  try {
    const { messages, userMessage } = await request.json()
    console.log('[v0] API Route Called - User Message:', userMessage.substring(0, 50))

    console.log('[v0] Building conversation history with', messages.length, 'previous messages')

    // Build conversation history
    const conversationHistory = [
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: userMessage,
      },
    ]

    console.log('[v0] Calling Groq API')

    // Using the Groq provider (you will need a GROQ_API_KEY in your .env.local file)
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: conversationHistory,
      maxTokens: 1500,
    })

    console.log('[v0] Stream initiated, returning response')

    // Return the streaming response using the plain text stream expected by the frontend
    return (result as any).toTextStreamResponse()
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] API Error Message:', errorMsg)
    console.error('[v0] Full Error Object:', error)
    return Response.json(
      { error: `Server error: ${errorMsg}` },
      { status: 500 }
    )
  }
}

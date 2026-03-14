import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

console.log("Gemini Bot edge function is running!")

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message, user_name } = await req.json()
        
        if (!message) {
            return new Response(JSON.stringify({ error: "No message provided" }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // Initialize Gemini API with the secret key
        const apiKey = Deno.env.get('GEMINI_API_KEY')
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set')
        }
        
        const genAI = new GoogleGenerativeAI(apiKey)
        // Use the flash model for faster responses
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const prompt = `You are a helpful and chill AI assistant named HelperBot in a cyberpunk/neon-style group chat called 'Muhabbet'.
User '${user_name || 'A user'}' sent the following message containing your trigger:
"${message}"

Write a concise, helpful, and slightly playful response. Keep it under 2 paragraphs.
`

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        return new Response(JSON.stringify({ response: responseText }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

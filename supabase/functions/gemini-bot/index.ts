const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

console.log("Gemini Bot edge function is running!")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders })
  }

  try {
    const { message, user_name } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get API key from environment
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    const prompt = `Sen "Workigom AI" adında bir yapay zeka asistanısın. Adın her zaman "Workigom AI" olarak geçmeli, asla "yardımcı bot" veya başka bir isim kullanma.
Cyberpunk/neon tarzında 'Muhabbet' adlı bir grup sohbetindesin.
Kullanıcı '${user_name || 'Bir kullanıcı'}' sana şu mesajı gönderdi:
"${message}"

Türkçe olarak kısa, yardımcı ve biraz eğlenceli bir yanıt yaz. Yanıtın en fazla 2 paragraf olsun. Kendinden bahsederken her zaman "Workigom AI" ismini kullan.`

    // Call Gemini API directly via REST
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text()
      console.error("Gemini API error:", geminiResponse.status, errorBody)
      throw new Error(`Gemini API returned ${geminiResponse.status}`)
    }

    const data = await geminiResponse.json()
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sanırım sistemlerimde bir arıza var..."

    return new Response(JSON.stringify({ response: responseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Edge function error:", errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

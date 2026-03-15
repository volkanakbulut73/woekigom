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
      console.error("GEMINI_API_KEY is not set in environment")
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not set" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log("API Key found, length:", apiKey.length)

    const prompt = `Sen "Workigom AI" adında bir yapay zeka asistanısın. Adın her zaman "Workigom AI" olarak geçmeli, asla "yardımcı bot" veya başka bir isim kullanma.
Cyberpunk/neon tarzında 'Muhabbet' adlı bir grup sohbetindesin.
Kullanıcı '${user_name || 'Bir kullanıcı'}' sana şu mesajı gönderdi:
"${message}"

Türkçe olarak kısa, yardımcı ve biraz eğlenceli bir yanıt yaz. Yanıtın en fazla 2 paragraf olsun. Kendinden bahsederken her zaman "Workigom AI" ismini kullan.`

    // gemini-2.5-flash: 2026 güncel model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    
    console.log("Calling Gemini API...")

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    const responseBody = await geminiResponse.text()
    console.log("Gemini API status:", geminiResponse.status)
    console.log("Gemini API response:", responseBody.substring(0, 500))

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", geminiResponse.status, responseBody)
      return new Response(JSON.stringify({ 
        error: `Gemini API error: ${geminiResponse.status}`,
        detail: responseBody 
      }), {
        status: 200, // Return 200 so we can see the error in the client
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = JSON.parse(responseBody)
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
      status: 200, // Return 200 so we can see the error in the client
    })
  }
})

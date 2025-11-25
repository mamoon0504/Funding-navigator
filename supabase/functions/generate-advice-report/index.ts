import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchCriteria } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the prompt based on search criteria
    const criteriaText = Object.entries(searchCriteria)
      .filter(([key, value]) => value && key !== 'showAdviceReport')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const systemPrompt = `Je bent een ervaren investerings- en startup adviseur. Genereer een uitgebreid adviesrapport op basis van de gegeven zoekcriteria. Het rapport moet professioneel zijn en de volgende secties bevatten:

1. Samenvatting van de zoekcriteria
2. Marktanalyse voor deze criteria
3. Aanbevelingen voor investeerders
4. Risico's en kansen
5. Volgende stappen

Schrijf het rapport in het Nederlands en maak het concreet en actionable.`;

    const userPrompt = `Genereer een adviesrapport voor een investeerder met de volgende criteria: ${criteriaText}`;

    console.log('Generating advice report with criteria:', criteriaText);

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI gateway error:', response.status, error);
      throw new Error('Failed to generate advice report');
    }

    const data = await response.json();
    const report = data.choices[0].message.content;

    console.log('Successfully generated advice report');

    return new Response(
      JSON.stringify({ report }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in generate-advice-report function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { scores, primaryPersonality } = body

  if (!scores || !primaryPersonality) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await supabase.from('quiz_results').insert({
    primary_personality: primaryPersonality,
    score_bold: scores.bold,
    score_zen: scores.zen,
    score_artisan: scores.artisan,
    score_sweet: scores.sweet,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET request to fetch all activities from the Supabase activity table

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching activities' },
      { status: 500 }
    );
  }
} 
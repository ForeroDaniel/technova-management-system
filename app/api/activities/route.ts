/**
 * Activities API Route
 * 
 * This file handles API requests related to activities in the application.
 * It provides endpoints for interacting with the activities data in the Supabase database.
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * GET /api/activities
 * 
 * Fetches all activities from the Supabase activity table.
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Activity[] }
 * - On error: { error: string } with appropriate status code
 */
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
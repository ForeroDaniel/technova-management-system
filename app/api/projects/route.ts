/**
 * Projects API Route
 * 
 * This file handles API requests related to projects in the application.
 * It provides endpoints for interacting with the projects data in the Supabase database.
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * GET /api/projects
 * 
 * Fetches all projects from the Supabase project table.
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Project[] }
 * - On error: { error: string } with appropriate status code
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('project')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching projects' },
      { status: 500 }
    );
  }
} 
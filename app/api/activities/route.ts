/**
 * Activities API Route
 * 
 * This file handles API requests related to activities in the application.
 * It provides endpoints for interacting with the activities data in the Supabase database.
 * The route now includes related data from employees and projects tables.
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * GET /api/activities
 * 
 * Fetches all activities from the Supabase activity table with related employee and project names.
 * Uses Supabase's nested selection to join with related tables:
 * - Joins with employees table using employee_id
 * - Joins with projects table using project_id
 * 
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Activity[] } with employee and project names
 * - On error: { error: string } with appropriate status code
 */
export async function GET() {
  try {
    // Fetch activities with related data using Supabase's nested selections
    // The 'employee' and 'project' aliases correspond to the foreign key relationships
    const { data, error } = await supabase
      .from('activity')
      .select(`
        *,
        employee:employee_id(name),
        project:project_id(name)
      `);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the nested data structure into a flat structure
    // This makes it easier to work with in the frontend components
    const transformedData = data.map(activity => ({
      ...activity,
      employee_name: activity.employee?.name,  // Extract employee name from nested object
      project_name: activity.project?.name     // Extract project name from nested object
    }));

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching activities' },
      { status: 500 }
    );
  }
} 
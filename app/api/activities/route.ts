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
 * Fetches all activities with related employee and project data.
 * Fetches all activities from the Supabase activity table with related employee and project names.
 * Uses Supabase's nested selection to join with related tables:
 * - Joins with employees table using employee_id
 * - Joins with projects table using project_id
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Activity[] }
 * - On error: { error: string } with appropriate status code
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select(`
        *,
        empleado:empleado_id(nombre),
        proyecto:proyecto_id(nombre)
      `);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the nested data to include employee and project names
    const transformedData = data.map(activity => ({
      ...activity,
      empleado_nombre: activity.empleado?.nombre,
      proyecto_nombre: activity.proyecto?.nombre
    }));

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching activities' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/activities
 * 
 * Creates a new activity in the database.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('activity')
      .insert([{
        descripción: body.descripción,
        tipo: body.tipo,
        minutos: body.minutos,
        empleado_id: body.empleado_id,
        proyecto_id: body.proyecto_id,
        fecha: body.fecha
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating activity' },
      { status: 500 }
    );
  }
} 
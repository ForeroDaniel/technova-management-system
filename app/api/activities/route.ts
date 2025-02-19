/**
 * Activities API Routes
 * 
 * Handles CRUD operations for activities:
 * - GET: Fetch all activities with related data
 * - POST: Create new activity
 * 
 * Features:
 * - Supabase integration
 * - Error handling
 * - Data transformation
 * - Type safety
 * - Input validation
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * GET /api/activities
 * 
 * Fetches all activities with related employee and project data.
 * Transforms the response to include employee and project names.
 */
export async function GET() {
  try {
    // Fetch activities with related data
    const { data, error } = await supabase
      .from('activity')
      .select(`
        *,
        empleado:empleado_id(nombre),
        proyecto:proyecto_id(nombre)
      `);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform the nested data to include employee and project names
    const transformedData = data.map(activity => ({
      ...activity,
      empleado_nombre: activity.empleado?.nombre,
      proyecto_nombre: activity.proyecto?.nombre
    }));

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al obtener actividades' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/activities
 * 
 * Creates a new activity in the database.
 * Validates required fields and returns the created activity.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['descripcion', 'tipo', 'minutos', 'empleado_id', 'proyecto_id', 'fecha'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new activity
    const { data, error } = await supabase
      .from('activity')
      .insert([{
        descripcion: body.descripcion,
        tipo: body.tipo,
        minutos: body.minutos,
        empleado_id: body.empleado_id,
        proyecto_id: body.proyecto_id,
        fecha: body.fecha
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al crear actividad' },
      { status: 500 }
    );
  }
} 
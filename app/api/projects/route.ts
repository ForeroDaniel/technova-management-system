/**
 * Projects API Routes
 * 
 * Handles CRUD operations for projects:
 * - GET: Fetch all projects
 * - POST: Create new project
 * 
 * Features:
 * - Supabase integration
 * - Error handling
 * - Input validation
 * - Type safety
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/api/supabase';

/**
 * GET /api/projects
 * 
 * Fetches all projects from the database.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('project')
      .select('*');

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
      { error: 'Error al obtener proyectos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * 
 * Creates a new project in the database.
 * Validates required fields and returns the created project.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['nombre', 'compania', 'presupuesto', 'fecha_inicio', 'fecha_fin'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('project')
      .insert([{
        nombre: body.nombre,
        compania: body.compania,
        presupuesto: body.presupuesto,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin
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
      { error: 'Error al crear proyecto' },
      { status: 500 }
    );
  }
} 
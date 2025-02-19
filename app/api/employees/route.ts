/**
 * Employees API Routes
 * 
 * Handles CRUD operations for employees:
 * - GET: Fetch all employees
 * - POST: Create new employee
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
 * GET /api/employees
 * 
 * Fetches all employees from the database.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('employee')
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
      { error: 'Error al obtener empleados' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/employees
 * 
 * Creates a new employee in the database.
 * Validates required fields and returns the created employee.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['nombre', 'correo_electronico', 'equipo', 'costo_por_hora'];
    const missingFields = requiredFields.filter(field => body[field] === undefined);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('employee')
      .insert([{
        nombre: body.nombre,
        correo_electronico: body.correo_electronico,
        equipo: body.equipo,
        costo_por_hora: body.costo_por_hora
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
      { error: 'Error al crear empleado' },
      { status: 500 }
    );
  }
} 
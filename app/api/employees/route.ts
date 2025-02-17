/**
 * Employees API Route
 * 
 * This file handles API requests related to employees in the application.
 * It provides endpoints for interacting with the employees data in the Supabase database.
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * GET /api/employees
 * 
 * Fetches all employees from the Supabase employee table.
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Employee[] }
 * - On error: { error: string } with appropriate status code
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('employee')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching employees' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/employees
 * 
 * Creates a new employee in the Supabase employee table.
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { data: Employee }
 * - On error: { error: string } with appropriate status code
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating employee' },
      { status: 500 }
    );
  }
} 
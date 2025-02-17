/**
 * Dynamic route handler for individual employee operations
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employeeParams = await params;
    const { id } = employeeParams;

    if (!id) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate the request body
    if (!body.nombre || !body.correo_electronico || !body.equipo || body.costo_por_hora === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('employee')
      .update({
        nombre: body.nombre,
        correo_electronico: body.correo_electronico,
        equipo: body.equipo,
        costo_por_hora: body.costo_por_hora
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error updating employee' },
      { status: 500 }
    );
  }
} 
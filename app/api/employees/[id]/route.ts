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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employeeParams = await params;
    const { id } = employeeParams;

    if (!id) {
      return NextResponse.json(
        { error: 'Se requiere el ID del empleado' },
        { status: 400 }
      );
    }

    // First, check if there are any activities associated with this employee
    const { data: activities, error: fetchError } = await supabase
      .from('activity')
      .select('id')
      .eq('empleado_id', id);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // If there are associated activities, delete them first
    if (activities && activities.length > 0) {
      const { error: deleteActivitiesError } = await supabase
        .from('activity')
        .delete()
        .eq('empleado_id', id);

      if (deleteActivitiesError) {
        return NextResponse.json({ 
          error: `Error al eliminar las actividades asociadas: ${deleteActivitiesError.message}` 
        }, { status: 500 });
      }
    }

    // Now delete the employee
    const { error: deleteEmployeeError } = await supabase
      .from('employee')
      .delete()
      .eq('id', id);

    if (deleteEmployeeError) {
      return NextResponse.json({ 
        error: `Error al eliminar el empleado: ${deleteEmployeeError.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el empleado y sus actividades asociadas' },
      { status: 500 }
    );
  }
} 
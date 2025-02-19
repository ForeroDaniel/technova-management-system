/**
 * Employee API Routes - Single Employee Operations
 * 
 * Handles CRUD operations for individual employees:
 * - PUT: Update existing employee
 * - DELETE: Remove employee and associated activities
 * 
 * Features:
 * - Supabase integration
 * - Error handling
 * - Input validation
 * - Cascading deletes
 * - Type safety
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * PUT /api/employees/[id]
 * 
 * Updates an existing employee's information.
 * Validates required fields and returns the updated employee.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Se requiere el ID del empleado' },
        { status: 400 }
      );
    }

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
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar empleado' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/employees/[id]
 * 
 * Removes an employee and their associated activities.
 * Performs cascading delete operation.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Se requiere el ID del empleado' },
        { status: 400 }
      );
    }

    // Check for associated activities
    const { data: activities, error: fetchError } = await supabase
      .from('activity')
      .select('id')
      .eq('empleado_id', id);

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Delete associated activities if they exist
    if (activities && activities.length > 0) {
      const { error: deleteActivitiesError } = await supabase
        .from('activity')
        .delete()
        .eq('empleado_id', id);

      if (deleteActivitiesError) {
        console.error('Supabase delete activities error:', deleteActivitiesError);
        return NextResponse.json({ 
          error: `Error al eliminar las actividades asociadas: ${deleteActivitiesError.message}` 
        }, { status: 500 });
      }
    }

    // Delete the employee
    const { error: deleteEmployeeError } = await supabase
      .from('employee')
      .delete()
      .eq('id', id);

    if (deleteEmployeeError) {
      console.error('Supabase delete employee error:', deleteEmployeeError);
      return NextResponse.json({ 
        error: `Error al eliminar el empleado: ${deleteEmployeeError.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Empleado y actividades asociadas eliminados correctamente'
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el empleado y sus actividades asociadas' },
      { status: 500 }
    );
  }
} 
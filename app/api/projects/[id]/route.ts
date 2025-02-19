/**
 * Project API Routes - Single Project Operations
 * 
 * Handles CRUD operations for individual projects:
 * - PUT: Update existing project
 * - DELETE: Remove project and associated activities
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
 * PUT /api/projects/[id]
 * 
 * Updates an existing project's information.
 * Validates required fields and returns the updated project.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Se requiere el ID del proyecto' },
        { status: 400 }
      );
    }

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
      .update({
        nombre: body.nombre,
        compania: body.compania,
        presupuesto: body.presupuesto,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin
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

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar proyecto' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * 
 * Removes a project and its associated activities.
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
        { error: 'Se requiere el ID del proyecto' },
        { status: 400 }
      );
    }

    // Check for associated activities
    const { data: activities, error: fetchError } = await supabase
      .from('activity')
      .select('id')
      .eq('proyecto_id', id);

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
        .eq('proyecto_id', id);

      if (deleteActivitiesError) {
        console.error('Supabase delete activities error:', deleteActivitiesError);
        return NextResponse.json({ 
          error: `Error al eliminar las actividades asociadas: ${deleteActivitiesError.message}` 
        }, { status: 500 });
      }
    }

    // Delete the project
    const { error: deleteProjectError } = await supabase
      .from('project')
      .delete()
      .eq('id', id);

    if (deleteProjectError) {
      console.error('Supabase delete project error:', deleteProjectError);
      return NextResponse.json({ 
        error: `Error al eliminar el proyecto: ${deleteProjectError.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Proyecto y actividades asociadas eliminados correctamente'
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el proyecto y sus actividades asociadas' },
      { status: 500 }
    );
  }
} 
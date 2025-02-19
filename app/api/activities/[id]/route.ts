/**
 * Activities API Routes - Single Activity Operations
 * 
 * Handles CRUD operations for individual activities:
 * - PUT: Update existing activity
 * - DELETE: Remove activity
 * 
 * Features:
 * - Supabase integration
 * - Error handling
 * - Data transformation
 * - Type safety
 * - Input validation
 * - Related data fetching
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

/**
 * PUT /api/activities/[id]
 * 
 * Updates an existing activity and returns the updated data
 * with related employee and project information.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

    // First update the activity
    const { data: updatedActivity, error: updateError } = await supabase
      .from('activity')
      .update({
        descripcion: body.descripcion,
        tipo: body.tipo,
        minutos: body.minutos,
        empleado_id: body.empleado_id,
        proyecto_id: body.proyecto_id,
        fecha: body.fecha
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // Then fetch the updated activity with related data
    const { data: activityWithRelations, error: fetchError } = await supabase
      .from('activity')
      .select(`
        *,
        empleado:empleado_id(nombre),
        proyecto:proyecto_id(nombre)
      `)
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Transform the data to include employee and project names
    const transformedData = {
      ...activityWithRelations,
      empleado_nombre: activityWithRelations.empleado?.nombre,
      proyecto_nombre: activityWithRelations.proyecto?.nombre
    };

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar actividad' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/activities/[id]
 * 
 * Removes an activity from the database.
 * Returns success status on completion.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { error } = await supabase
      .from('activity')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Actividad eliminada correctamente'
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar actividad' },
      { status: 500 }
    );
  }
} 
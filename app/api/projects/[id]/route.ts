/**
 * Dynamic route handler for individual project operations
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectParams = await params;
    const { id } = projectParams;
    const body = await request.json();
    
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectParams = await params;
    const { id } = projectParams;

    // First, check if there are any activities associated with this project
    const { data: activities, error: fetchError } = await supabase
      .from('activity')
      .select('id')
      .eq('proyecto_id', id);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // If there are associated activities, delete them first
    if (activities && activities.length > 0) {
      const { error: deleteActivitiesError } = await supabase
        .from('activity')
        .delete()
        .eq('proyecto_id', id);

      if (deleteActivitiesError) {
        return NextResponse.json({ 
          error: `Error al eliminar las actividades asociadas: ${deleteActivitiesError.message}` 
        }, { status: 500 });
      }
    }

    // Now delete the project
    const { error: deleteProjectError } = await supabase
      .from('project')
      .delete()
      .eq('id', id);

    if (deleteProjectError) {
      return NextResponse.json({ 
        error: `Error al eliminar el proyecto: ${deleteProjectError.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el proyecto y sus actividades asociadas' },
      { status: 500 }
    );
  }
} 
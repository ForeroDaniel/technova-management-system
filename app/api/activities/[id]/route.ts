/**
 * Dynamic route handler for individual activity operations
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const activityParams = await params;
    const { id } = activityParams;
    const body = await request.json();
    
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
      return NextResponse.json({ error: updateError.message }, { status: 500 });
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
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Transform the data to include employee and project names
    const transformedData = {
      ...activityWithRelations,
      empleado_nombre: activityWithRelations.empleado?.nombre,
      proyecto_nombre: activityWithRelations.proyecto?.nombre
    };

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating activity' },
      { status: 500 }
    );
  }
} 
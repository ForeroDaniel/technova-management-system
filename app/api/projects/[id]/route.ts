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
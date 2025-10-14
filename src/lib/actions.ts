// src/lib/actions.ts
'use server';

import { z } from 'zod';
import prisma from './prisma';
import { revalidatePath } from 'next/cache';

const UserSchema = z.object({
  nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  apellido: z.string().optional(),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
});

export async function crearUsuario(formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    // Aquí podrías devolver los errores para mostrarlos en el formulario
    console.error(validatedFields.error.flatten().fieldErrors);
    // Por ahora, solo lanzaremos un error simple
    throw new Error('Datos de usuario inválidos.');
  }

  try {
    await prisma.user.create({
      data: validatedFields.data,
    });
    revalidatePath('/prisma'); // Actualiza la caché de la página
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('No se pudo crear el usuario.');
  }
}

export async function eliminarUsuario(id: number) {
  if (!id) {
    throw new Error('Se requiere un ID para eliminar el usuario.');
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath('/prisma'); // Actualiza la caché de la página
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw new Error('No se pudo eliminar el usuario.');
  }
}

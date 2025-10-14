// src/components/UserForm.tsx
'use client';

import { crearUsuario } from '@/src/lib/actions';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function UserForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      await crearUsuario(formData);
      toast.success('Usuario creado con éxito!');
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ocurrió un error desconocido.');
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
      <div className="flex flex-col gap-4">
        <input type="text" name="nombre" placeholder="Nombre" required className="input input-bordered w-full max-w-xs" />
        <input type="text" name="apellido" placeholder="Apellido" className="input input-bordered w-full max-w-xs" />
        <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-primary max-w-xs">
          Crear
        </button>
      </div>
    </form>
  );
}

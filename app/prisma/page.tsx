import prisma from "@/src/services/prisma";
import { crearUsuario, eliminarUsuario } from "@/src/actionsServer/ActionsServers";

interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const results = await prisma.user.findMany();
    return results;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export default async function PrismaPage() {
  const usuarios = await obtenerUsuarios();
  return (
    <div>
      <h1>Prisma</h1>
      <form action={crearUsuario}>
        <input type="text" required placeholder="Ingrese su nombre..." name="nombre" />
        <input type="text" required placeholder="Ingrese su apellido..." name="apellido" />
        <input type="email" required placeholder="Ingrese su email..." name="email" />
        <button type="submit">Crear usuario</button>
      </form>
      <div>
        {usuarios?.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          usuarios?.map((item) => (
            <div key={item.id}>
              <p> ID: {item.id}. Nombre: {item.nombre} {item.apellido}</p>
              <p>{item.email}</p>
            </div>
          ))
        )}
      </div>
      <h1>Eliminación de usuario por id</h1>
      <form action={eliminarUsuario}>
        <input type="number" required placeholder="Ingrese el id del usuario..." name="id" />
        <button type="submit">Eliminar usuario</button>
      </form>
    </div>
  );
}

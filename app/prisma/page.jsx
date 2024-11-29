import prisma from "@/src/services/prisma";
import { crearUsuario } from "@/src/actionsServer/ActionsServers";
import { eliminarUsuario } from "@/src/actionsServer/ActionsServers";

async function obtenerUsuarios() {
    try {
        const results = await prisma.user.findMany();
        return results;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

export default async function PrismaPage() {
    let usuarios = await obtenerUsuarios();

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
                    usuarios?.map((item, index) => (
                        <div key={index}>
                            <p> ID: {item.id}. Nombre: {item.nombre} {item.apellido}</p>
                            <p>{item.email}</p>
                        </div>
                    ))
                )}
            </div>

          <h1> Eliminacion de usuario por id </h1>

          <form action={eliminarUsuario}>
             <input type="number" required placeholder="Ingrese el id del usuario..." name="id"  />
             <button type="submit">Eliminar usuario</button>
          </form>

        </div>
    );
}

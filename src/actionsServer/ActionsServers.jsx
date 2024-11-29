import prisma from "@/src/services/prisma";

export async function crearUsuario(formData) {
    "use server"; 

    try {
        const nombre = formData.get("nombre");
        const apellido = formData.get("apellido");
        const email = formData.get("email");

        await prisma.user.create({
            data: { nombre, apellido, email },
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}

export async function eliminarUsuario(formData) {
      "use server";
      const id = formData.get("id");

      try {
         await prisma.user.delete({
          where: { id: Number(id) },
        })
      } catch (error) {
        console.log(error);
      }
}
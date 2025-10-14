import prisma from "@/src/services/prisma";

export async function crearUsuario(formData: FormData) {
  "use server";
  try {
    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const email = formData.get("email") as string;
    await prisma.user.create({
      data: { nombre, apellido, email },
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
}

export async function eliminarUsuario(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.log(error);
  }
}

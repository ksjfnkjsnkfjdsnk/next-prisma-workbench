"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const Prueba = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const results = await axios.get("/api/usuarios");

                if (results.status === 200) {
                    setUsuarios(results.data.result)
                    console.log(results.data.result)
                }

            } catch (error) {
                console.log(error)
            }
        }

        obtenerUsuarios()
    }, [])

    return (
        <div>
            <h1>Prueba</h1>

           {usuarios.map((item, index) => (
            <div key={index}>
           <p> Nombre de usuario: {item.nombre} {item.apellido}. </p>
           <p> Email: {item.correo}. </p>
            </div>
           ))}

        </div>
    );
}

export default Prueba;
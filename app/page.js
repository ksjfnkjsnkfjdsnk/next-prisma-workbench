"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {

  // useEffect(() => {
  //   const obtenerUsuarios = async () => {
  //     try {
  //       const results = await axios.get("/api/usuarios");

  //       if(results.status === 200){
  //         console.log(results.data)
  //       }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   obtenerUsuarios()
  // }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
package com.example.motordevapp.models;

import com.google.firebase.database.PropertyName;

public class Estacion {
    @PropertyName("IdEstacion")
    private String idEstacion;
    @PropertyName("Nombre")
    private String nombre;

    public String getIdEstacion() {
        return idEstacion;
    }

    public void setIdEstacion(String idEstacion) {
        this.idEstacion = idEstacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

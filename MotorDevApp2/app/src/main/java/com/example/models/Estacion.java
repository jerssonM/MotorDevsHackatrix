package com.example.models;

import com.google.firebase.database.PropertyName;
import com.google.gson.annotations.SerializedName;

public class Estacion {
    @SerializedName(value = "Valor", alternate = {"idEstacion"})
    @PropertyName("IdEstacion")
    private int idEstacion;
    @SerializedName(value = "Llave", alternate = {"nombre"})
    @PropertyName("Nombre")
    private String nombre;

    public int getIdEstacion() {
        return idEstacion;
    }

    public void setIdEstacion(int idEstacion) {
        this.idEstacion = idEstacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

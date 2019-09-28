package com.example.data.ticket;

import com.example.models.Estacion;
import com.example.utils.ConstantesFirebase;
import com.example.utils.RxFirebaseHelper;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.Query;

import java.util.List;

import io.reactivex.Observable;

public class ticketFirebase {

    private RxFirebaseHelper firebaseHelper = new RxFirebaseHelper();
    private DatabaseReference referencia = firebaseHelper.obtenerReferencia();

    public Observable<List<Estacion>> obtenerEstaciones() {
        Query query = referencia.child(ConstantesFirebase.Estacion);
        return firebaseHelper.consultaListaTiempoRealUnicaVez(query, Estacion.class);
    }
}

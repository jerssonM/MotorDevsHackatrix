package com.example.motordevapp.data.ticket;

import com.example.motordevapp.utils.RxFirebaseHelper;
import com.google.firebase.database.DatabaseReference;

public class ticketFirebase {

    private RxFirebaseHelper firebaseHelper = new RxFirebaseHelper();
    private DatabaseReference referencia = firebaseHelper.obtenerReferencia();
}

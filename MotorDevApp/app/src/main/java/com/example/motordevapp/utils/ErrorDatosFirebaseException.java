package com.example.motordevapp.utils;

import com.google.firebase.database.DatabaseError;

import io.reactivex.annotations.NonNull;

public class ErrorDatosFirebaseException extends Exception {
    protected DatabaseError error;

    public ErrorDatosFirebaseException(@NonNull DatabaseError error) {
        this.error = error;
    }

    public DatabaseError getError() {
        return error;
    }

    @Override
    public String toString() {
        return "ErrorDatosFirebaseException{" +
                "error=" + error +
                '}';
    }
}

package com.example.utils;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import io.reactivex.Observable;
import io.reactivex.ObservableEmitter;
import io.reactivex.ObservableOnSubscribe;
import io.reactivex.annotations.NonNull;

public class RxFirebaseHelper {

    public RxFirebaseHelper() {
    }

    public DatabaseReference obtenerReferencia() {
        return FirebaseDatabase.getInstance().getReference();
    }

    public <T> Observable<T> consultaUnicaVez(final Query query, final Class<T> clase, final boolean filtrado) {
        return Observable.create(new ObservableOnSubscribe<T>() {
            @Override
            public void subscribe(final ObservableEmitter<T> emisor) {
                query.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                        T value = null;
                        if (filtrado)
                            if (dataSnapshot.getChildrenCount() > 0)
                                value = dataSnapshot.getChildren().iterator().next().getValue(clase);
                            else
                                value = dataSnapshot.getValue(clase); //null si no hay datos

                        if (value != null) {
                            if (!emisor.isDisposed()) {
                                emisor.onNext(value);
                            }
                        } else {
                            if (!emisor.isDisposed()) {
                                try {
                                    emisor.onNext(clase.newInstance());
                                } catch (IllegalAccessException e) {
                                    e.printStackTrace();
                                } catch (InstantiationException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<List<T>> consultaListaUnicaVez(final Query query, final Class<T> clase) {
        return Observable.create(new ObservableOnSubscribe<List<T>>() {
            @Override
            public void subscribe(final ObservableEmitter<List<T>> emisor) {
                query.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        List<T> listaEntidades = new LinkedList<>();
                        if (!emisor.isDisposed()) {
                            for (DataSnapshot entidad : dataSnapshot.getChildren()) {
                                T value = entidad.getValue(clase);
                                listaEntidades.add(value);
                            }
                        }
                        if (!emisor.isDisposed()) {
                            emisor.onNext(listaEntidades);
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<T> consultaTiempoReal(final Query query, final Class<T> clase, final boolean filtrado) {
        return Observable.create(new ObservableOnSubscribe<T>() {
            @Override
            public void subscribe(final ObservableEmitter<T> emisor) {
                query.addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        if (emisor.isDisposed()) {
                            emisor.onComplete();
                            query.removeEventListener(this);
                        }
                        T value;
                        if (filtrado)
                            value = dataSnapshot.getChildren().iterator().next().getValue(clase);
                        else
                            value = dataSnapshot.getValue(clase);

                        if (value != null) {
                            if (!emisor.isDisposed()) {
                                emisor.onNext(value);
                            }
                        } else {
                            if (!emisor.isDisposed()) {
                                try {
                                    emisor.onNext(clase.newInstance());
                                } catch (IllegalAccessException e) {
                                    e.printStackTrace();
                                } catch (InstantiationException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        query.removeEventListener(this);
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<List<T>> consultaListaTiempoReal(final Query query, final Class<T> clase) {
        return Observable.create(new ObservableOnSubscribe<List<T>>() {
            @Override
            public void subscribe(final ObservableEmitter<List<T>> emisor) {
                query.addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        List<T> listaEntidades = new LinkedList<>();
                        if (emisor.isDisposed()) {
                            emisor.onComplete();
                            query.removeEventListener(this);
                        } else {
                            for (DataSnapshot entidad : dataSnapshot.getChildren()) {
                                T value = entidad.getValue(clase);
                                listaEntidades.add(value);
                            }
                        }

                        if (!emisor.isDisposed()) {
                            emisor.onNext(listaEntidades);
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        query.removeEventListener(this);
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<T> consultaTiempoRealUnicaVez(final Query query, final Class<T> clase, final boolean filtrado) {
        return Observable.create(new ObservableOnSubscribe<T>() {
            @Override
            public void subscribe(final ObservableEmitter<T> emisor) {
                query.addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        if (emisor.isDisposed()) {
                            emisor.onComplete();
                            query.removeEventListener(this);
                        }
                        T value;
                        if (filtrado)
                            value = dataSnapshot.getChildren().iterator().next().getValue(clase);
                        else
                            value = dataSnapshot.getValue(clase);

                        if (value != null) {
                            if (!emisor.isDisposed()) {
                                emisor.onNext(value);
                                emisor.onComplete();
                                query.removeEventListener(this);
                            }
                        } else {
                            if (!emisor.isDisposed()) {
                                try {
                                    emisor.onNext(clase.newInstance());
                                    emisor.onComplete();
                                    query.removeEventListener(this);
                                } catch (IllegalAccessException e) {
                                    e.printStackTrace();
                                } catch (InstantiationException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        query.removeEventListener(this);
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<List<T>> consultaListaTiempoRealUnicaVez(final Query query, final Class<T> clase) {
        return Observable.create(new ObservableOnSubscribe<List<T>>() {
            @Override
            public void subscribe(final ObservableEmitter<List<T>> emisor) {
                query.addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        List<T> listaEntidades = new LinkedList<>();
                        if (emisor.isDisposed()) {
                            emisor.onComplete();
                            query.removeEventListener(this);
                        } else {
                            for (DataSnapshot entidad : dataSnapshot.getChildren()) {
                                T value = entidad.getValue(clase);
                                listaEntidades.add(value);
                            }
                        }

                        if (!emisor.isDisposed()) {
                            emisor.onNext(listaEntidades);
                            emisor.onComplete();
                            query.removeEventListener(this);
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        query.removeEventListener(this);
                        if (!emisor.isDisposed()) {
                            emisor.onError(new ErrorDatosFirebaseException(error));
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<T> getObservable(final Task<T> task) {
        return Observable.create(new ObservableOnSubscribe<T>() {
            @Override
            public void subscribe(final ObservableEmitter<T> emitter) throws Exception {
                task.addOnSuccessListener(new OnSuccessListener<T>() {
                    @Override
                    public void onSuccess(T result) {
                        if (!emitter.isDisposed()) {
                            emitter.onNext(result);
                        }
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        if (!emitter.isDisposed()) {
                            emitter.onError(e);
                        }
                    }
                });
            }
        });
    }

    public <T> Observable<Object> getObservable(final Task<T> task,
                                                final Object objectToReturn) {
        return Observable.create(new ObservableOnSubscribe<Object>() {
            @Override
            public void subscribe(final ObservableEmitter<Object> emitter) throws Exception {
                task.addOnSuccessListener(new OnSuccessListener<Object>() {
                    @Override
                    public void onSuccess(Object result) {
                        if (!emitter.isDisposed()) {
                            if ((result instanceof Void || result == null)
                                    && objectToReturn != null) {
                                emitter.onNext(objectToReturn);
                            } else {
                                emitter.onNext(result);
                            }
                        }
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        if (!emitter.isDisposed()) {
                            emitter.onError(e);
                        }
                    }
                });
            }
        });
    }

    public Observable<Void> actualizarPropiedades(final Query query, final HashMap<String, Object> mapPropiedades) {
        return Observable.create(new ObservableOnSubscribe<Void>() {
            @Override
            public void subscribe(ObservableEmitter<Void> e) throws Exception {
                query.getRef().updateChildren(mapPropiedades);
                e.onComplete();
            }
        });
    }
}

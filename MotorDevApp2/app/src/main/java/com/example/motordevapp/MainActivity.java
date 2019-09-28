package com.example.motordevapp;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Spinner;

import com.example.data.ticket.ticketFirebase;
import com.example.models.Estacion;
import com.example.models.Origen;
import com.example.utils.RxFirebaseHelper;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.infotrack.artefactos.utilitarios.base.Adaptadores.SpinnerGenericoAdaptador;

import java.util.LinkedList;
import java.util.List;

import butterknife.BindView;
import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.observers.DisposableObserver;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {
    Spinner spinnerEstacionOrigen;
    Spinner spinnerEstacionDestino;
    SpinnerGenericoAdaptador<Estacion> adaptadorOrigen;
    SpinnerGenericoAdaptador<Estacion> adaptadorDestino;

    List<Estacion> listaEstaciones = new LinkedList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        ui();
        consultarListaEstaciones();

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    private void ui() {
        spinnerEstacionDestino = findViewById(R.id.spinner_estacion_destino);
        spinnerEstacionOrigen = findViewById(R.id.spinner_estacion_origen);
        adaptadorOrigen = new SpinnerGenericoAdaptador<>(this, listaEstaciones, Estacion.class, "Seleccione una estación");
        spinnerEstacionOrigen.setAdapter(adaptadorOrigen);

        adaptadorDestino = new SpinnerGenericoAdaptador<>(this, listaEstaciones, Estacion.class, "Seleccione una estación");
        spinnerEstacionDestino.setAdapter(adaptadorDestino);
    }

    private void consultarListaEstaciones() {
        final CompositeDisposable contenedorDesechable = new CompositeDisposable();
        Observable<List<Estacion>> observable = new ticketFirebase()
                .obtenerEstaciones()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread());
        DisposableObserver observador = observable.subscribeWith(receptor);
        contenedorDesechable.add(observador);
    }

    DisposableObserver<List<Estacion>> receptor = new DisposableObserver<List<Estacion>>() {
        @Override
        public void onNext(List<Estacion> estacion) {
            listaEstaciones.clear();
            listaEstaciones.addAll(estacion);
            adaptadorOrigen.actualizarDatos(listaEstaciones);
            adaptadorDestino.actualizarDatos(listaEstaciones);
        }

        @Override
        public void onError(Throwable e) {

        }

        @Override
        public void onComplete() {

        }
    };

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void plnificar(View view) {
        Estacion estacionOrigen = listaEstaciones.get(spinnerEstacionOrigen.getSelectedItemPosition());
        Estacion estacionDestino = listaEstaciones.get(spinnerEstacionDestino.getSelectedItemPosition());

        DatabaseReference referencia = FirebaseDatabase.getInstance().getReference();

        Origen origen = new Origen();
        origen.setIdUsuario(1);
        referencia.child("Origen")
                .child(Integer.toString(estacionOrigen.getIdEstacion()))
                .push()
                .setValue(origen);

        referencia.child("Destino")
                .child(Integer.toString(estacionDestino.getIdEstacion()))
                .push()
                .setValue(origen);
    }
}

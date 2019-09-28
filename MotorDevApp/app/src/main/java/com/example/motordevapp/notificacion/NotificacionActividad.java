package com.example.motordevapp.notificacion;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import com.example.motordevapp.R;

public class NotificacionActividad extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notificacion);
        notificarAvisoNuevo(12);
    }

    private void notificarAvisoNuevo(int idAviso) {
//        Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
//        long[] pattern = {0, 300, 300, 300};
//        v.vibrate(pattern, -1);
//
//        mediaPlayer = MediaPlayer.create(this, R.raw.notificacion_aviso);
//        mediaPlayer.start();
//
//        alert.setTitle("Alerta");
//        alert.setMessage("El aviso " + idAviso + " se agrego a la agenda");
//        alert.show();
        try {

            Intent intent = new Intent(this, NotificacionActividad.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent,
                    PendingIntent.FLAG_ONE_SHOT);

            Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                    .setSmallIcon(R.drawable.ic_stat_directions_subway)
                    .setContentTitle("Nuevo Aviso!!")
                    .setContentText("El aviso " + idAviso + " se agrego a la agenda")
                    .setAutoCancel(true)
                    .setSound(soundUri)
                    .setContentIntent(pendingIntent);

            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.notify(idAviso, notificationBuilder.build());
        } catch (Exception ex) {

        }
    }
}

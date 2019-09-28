import firebase from "firebase/app";
import "firebase/database";
import { Subscription } from "./observerManager";
import { Observable, Observer } from "rxjs";

export default class FirebaseService {
    public app: firebase.app.App;
    public db: firebase.database.Database;

    constructor(config: Object, name: string) {
        this.app = firebase.initializeApp(config, name);
        this.db = this.app.database();
    }

    public get<T>(path: string): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
            const ref = this.db.ref(path);
            ref.on("value", snapshot => {
                const values: any = [];
                if (snapshot) {
                    snapshot.forEach(child => {
                        values.push(child.val());
                    });
                    observer.next(values);
                } else observer.error("Error!");
            });
            return () => {
                ref.off();
            };
        });
    }

    public getOnce<T>(path: string): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
          const ref = this.db.ref(path);
          ref.once('value', (snapshot) => {
            const values: any = [];
            debugger
            if (snapshot) {
                snapshot.forEach(child => {
                    values.push(child.val());
                });
                observer.next(values);
            } else observer.error("Error!");
          });
          return () => {
            ref.off();
          };
        });
      }

    public getKeys<T>(path: string): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
            const ref = this.db.ref(path);
            ref.on("value", snapshot => {
                if (snapshot) {
                    observer.next(Object.keys(snapshot.val()) as any);
                } else observer.error("Error!");
            });
            return () => {
                ref.off();
            };
        });
    }

    public Add<T>(path: string, value: any): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
            const ref = this.db.ref(path);
            ref.set(value, error => {
                if (error) observer.error(error);
                else observer.complete();
                ref.off();
            });
        });
    }

    public AddWithPush<T>(path: string, value: any): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
            const ref = this.db.ref(path);
            const newKey = ref.push().key;
            this.db.ref(`${path}/${newKey}`).set(value, error => {
                if (error) observer.error(error);
                else observer.complete();
                ref.off();
            });
        });
    }

    public Delete<T>(path: string): Subscription<T> {
        return Observable.create((observer: Observer<T>) => {
          const ref = this.db.ref(path);
          ref.remove((error) => {
            if (error) observer.error(error);
            else observer.complete();
            ref.off();
          });
        });
      }
}

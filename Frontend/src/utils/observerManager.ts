import { NextObserver,  Subscribable, Unsubscribable } from 'rxjs';

export type Manager<T> = NextObserver<T>;
export type Subscription<T> = Subscribable<T> & Unsubscribable;

export default class ManejadorObservador {
  private container: Unsubscribable[];
  constructor() {
    this.container = [];
  }

  public liberateContainer() {
    this.container.forEach((subscription) => {
        subscription.unsubscribe();
    });
    this.container = [];
  }

  protected manageObserver<T>(func: () => Subscription<T>, manager: Manager<T>): Unsubscribable {
    const subscription = func().subscribe(manager);
    this.container.push(subscription);
    return subscription;
  }
}

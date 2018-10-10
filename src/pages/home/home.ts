import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasksRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
  debugger
    //this.items = db.list('dbprueba').valueChanges();
    this.tasksRef = db.list('dbposts');
    this.items = this.tasksRef.snapshotChanges().pipe(
          map((e:Response)=> {
            debugger
            return e.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          })
        );
    console.log(this.items);
  }

}

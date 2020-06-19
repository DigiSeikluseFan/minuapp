import { Component } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public database: SQLiteObject;
  row_data: any = [];
  name: string = "";
  update: string = "";

  constructor(public platform: Platform, public sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
    // this.sqlite.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
    //   this.database = db;
    //   this.createTables();
    // }, (error) => {
    //   console.log("ERROR: ", error);
    // });
  }

  createDB() {
    this.sqlite.create({
      name: 'test',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      alert('Test Database Created!');
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  createTable() {
    this.database.executeSql(`CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY, Name varchar(255))`, []).then(() => {
      alert('Table Created!');
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  insertRow() {
    if (!this.name.length) {
      alert("Enter Name");
      return;
    }

    this.database.executeSql(`INSERT INTO names (Name) VALUES ('${this.name}')`, []).then(() => {
      alert('Row Inserted!');
      this.getDB();
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  getDB() {
    this.database.executeSql(`SELECT * FROM names `, []).then((res) => {
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.row_data.push(res.rows.item(i));
        }
      }
    });
    console.log(this.row_data);
  }
// Nime kustutab siin
  deleteRow(id) {
    this.database.executeSql(`DELETE FROM names WHERE id = ?`, [id]).then(() => {
      alert('Name Deleted!');
      this.getDB();
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }
// Nime uuendab siin
  updateName(update) {
    this.database.executeSql(`UPDATE names SET Name = ('${this.update}') WHERE id = ?`, [update]).then(() => {
      alert('Name Updated!');
      this.getDB();
    }).catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }
}

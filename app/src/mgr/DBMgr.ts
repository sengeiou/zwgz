import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';

export class DBMgr {
    private _db: any;
    private win: any = window;
    private static Instance: DBMgr = null;
    type = 0;

    Init(http: HTTP, sqlite: SQLite) {
        if (this.win.sqlitePlugin) {
            //alert(1);
            this.type = 0;
            sqlite.create({
                name: 'appdata3.db',
                location: 'default'
            }).then((db) => {
                this._db = db;
                //this.execSql("CREATE TABLE  IF NOT EXISTS  RECORD (`sdate` date,`sleeptime` varchar, `ispee` varchar"
                //    + ",`peetime` varchar,`peeml` varchar,`wakeuptime` varchar,`wakeupml` varchar,`operation` varchar,`memo` text,`toilettime` varchar);");
            });
        } else {
            this.type = 1;
            //alert(2);
            this._db = this.win.openDatabase("appdata3.db", '1.0', 'database', 5 * 1024 * 1024);
            //this.execSql("CREATE TABLE  IF NOT EXISTS  RECORD (`sdate` date,`sleeptime` varchar, `ispee` varchar"
            //    + ",`peetime` varchar,`peeml` varchar,`wakeuptime` varchar,`wakeupml` varchar,`operation` varchar,`memo` text,`toilettime` varchar);");
        }

    }

    private constructor() {

    }
    public static GetInstance() {
        if (DBMgr.Instance == null) {
            DBMgr.Instance = new DBMgr();
        }
        return DBMgr.Instance;
    }

    execSql(sql: string, params = []): Promise<any> {

        console.log({ sql, params });

        return new Promise((resolve, reject) => {
            try {
                //alert(this._db);
                this._db.transaction((tx) => {
                    //alert(3);
                    tx.executeSql(sql, params,
                        (tx, res) => {
                            if (this.type == 0) {
                                var rows = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    try {
                                        var c = [];
                                        var item = res.rows.item(i);
                                        rows.push(item);
                                    }
                                    catch (e) {
                                        //alert(e);
                                    }
                                }
                                //alert(JSON.stringify(rows));
                                res.rows = rows;
                            }
                            resolve({ tx: tx, res: res })
                        },
                        (tx, err) => { console.log(err); reject({ tx: tx, err: err }) });
                },
                    (err) => { console.log(err); reject({ err: err }) });
            } catch (err) {
                console.log(err);
                //alert(err);

                reject({ err: err });
            }
        });
    }

}
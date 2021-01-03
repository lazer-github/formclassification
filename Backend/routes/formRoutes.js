var express = require("express")
var app = express();

function routes(db) {
    const formRouter = express.Router();
    formRouter.route('/forms')
        .get((req, res) => {
            var sql = "select * from Form"
            var params = []
            db.all(sql, params, (err, rows) => {
                if (err) {
                    return res.status(400).json({ "error": err.message });
                }
                return res.status(200).json(rows);
            });
        })
        .post((req, res) => {
            var errors = []
            if (!req.body.name) {
                errors.push("No name specified");
            }
            if (!req.body.extract_text) {
                errors.push("No extract_text specified");
            }
            if (!req.body.process_time) {
                errors.push("No processing time specified");
            }
            if (!req.body.start_date) {
                errors.push("No processing time specified");
            }
            if (!req.body.start_date) {
                errors.push("No processing time specified");
            }
            if (errors.length) {
                return res.status(400).json({ "error": errors.join(",") });
            }
            var data = {
                jobid : req.body.jobid,
                name: req.body.name
                // ,extract_text: req.body.extract_text,
                // process_time: req.body.process_time,
                // start_date : req.body.start_date,
                // form_type : (req.body?.form_type)? req.body.form_type : ''
                //,EXTRACT_TEXT,PROCESS_TIME,START_DATE,FORM_TYPE
            }
            var sql = "INSERT INTO FORM(JOBID,NAME) VALUES(?,?)";
            var params = [data.jobid, data.name]
            db.run(sql, params, function (err, result) {
                if (err) {
                    return res.status(400).json({ "error": err.message });
                }
                return res.status(201).json({
                    data,
                    "id": this.lastID
                });
            });
        });

    formRouter.route("/forms/:id")
        .get((req, res) => {
            var sql = "select * from Form where id = ?"
            var params = [req.params.id]
            db.get(sql, params, (err, row) => {
                if (err) {
                    return res.status(400).json({ "error": err.message });
                }
                return res.status(200).json(row);
            });
        })
        .patch((req, res) => {
            var sql = "UPDATE FORM SET EXTRACT_TEXT = ?,PROCESS_TIME = ?, START_DATE = ? ,FORM_TYPE = ?  WHERE ID= ?"
            const data = [req.body.extract_text, req.body.process_time,req.body.start_date, 
                req.body.form_type, req.params.id];
            db.run(sql, data,function(err,result){
                if(err)
                return res.status(400).json({message : err.message});

                return res.status(200).json({message : 'Record updated sucessfully'});
            });
        });
    return formRouter;
}

module.exports = routes;
var express = require("express")
var app = express();

function routes(db) {
    const formRouter = express.Router();
    formRouter.route('/forms')
        .get((req, res) => {
            var sql = "select jobID,id,name,extract_text extractText,process_time processTime,form_type formType,complexity from Form"
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
                errors.push("Filename is not specified");
            }
            if (!req.body.jobid) {
                errors.push("JobId is not specified");
            }
            if (errors.length) {
                return res.status(400).json({ "error": errors.join(", ") });
            }
            var data = {
                jobid : req.body.jobid,
                name: req.body.name
            }
            var sql = "INSERT INTO FORM(JOBID,NAME,EXTRACT_TEXT) VALUES(?,?,'')";
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
            var sql = "select jobID,id,name,extract_text extractText,start_date startDate,process_time processTime,form_type formType,complexity from Form where id = ?"
            var params = [req.params.id]
            db.get(sql, params, (err, row) => {
                if (err) {
                    return res.status(400).json({ "error": err.message });
                }
                return res.status(200).json(row);
            });
        })
        .patch((req, res) => {
            console.log(req.body.start_date)
            var sql = "UPDATE FORM SET EXTRACT_TEXT = ?,PROCESS_TIME = ?, START_DATE = ? ,FORM_TYPE = ?, COMPLEXITY = ?  WHERE ID= ?"
            const data = [req.body.extract_text, req.body.process_time,req.body.start_date, 
                req.body.form_type,req.params.complexity ,req.params.id];
            db.run(sql, data,function(err,result){
                if(err)
                return res.status(400).json({message : err.message});

                return res.status(200).json({message : 'Record updated sucessfully'});
            });
        });
    return formRouter;
}

module.exports = routes;
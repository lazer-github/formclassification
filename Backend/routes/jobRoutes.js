const { query } = require("express");
var express = require("express")
var app = express();

function routes(db) {
    const jobrouter = express.Router();
    jobrouter.route('/jobs')
        .get((req, res) => {            
            let query = 'select jobid,path,filescount,status,startdate,enddate from Job';
            if(req.query?.status != null)
             query += ' where status = upper(?)'
            db.all(query, [req.query?.status], (err, rows) => {
                if (err) return res.status(400).json({ 'message': err.message });
                return res.status(200).json(rows);
            });
        })
        .post((req, res) => {
            if (req.body.path == null || req.body.count == null)
                return res.status(400).json({ message: 'Invalid arguments' });
            db.run('INSERT INTO JOB(PATH,FILESCOUNT) VALUES(?,?)', [req.body?.path, req.body?.count], function (err, result) {
                if (err) return res.status(400).json({ "message": err.message });
                return res.status(201).json({ "id": this.lastID });
            });
        })
        .delete((req, res) => {
            db.run('DELETE FROM JOB WHERE JobID > 3', [], function (err, result) {
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: 'All reecords deleted' });

            });
        });
    jobrouter.route('/jobs/:id')
        .get((req, res) => {
            db.all('select jobid,path,filescount,status,startdate,enddate from Job where jobid = ?', [req.params.id], (err, rows) => {
                if (err) return res.status(400).json({ 'message': err.message });
                return res.status(200).json(rows);
            })
        })
        .patch((req, res) => {
            //socket.io to send update to connected clients.          
            const sql = (req.body.status == 'COMPLETED') ? 'UPDATE JOB SET status = ?,ENDDATE = CURRENT_TIMESTAMP  where jobid = ?'
                : 'UPDATE JOB SET status = ? where jobid = ?'
            db.run(sql, [req.body.status, req.params.id], function (err, result) {
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: 'Record updated!.' });
            });
        })
        .delete((req, res) => {
            db.run('DELETE FROM JOB WHERE JobID = ?', [req.params.id], function (err, result) {
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: 'Record deleted' });
            })

        });
    jobrouter.route('/jobs/:id/forms')
        .get((req, res) => {
            db.all('select id,name,extract_text extractText,process_time processTime,form_type formType from Form WHERE jobid = ?', [req.params.id], (err, rows) => {
                if (err) return res.status(400).json({ 'message': err.message });
                return res.status(200).json(rows);
            })
        });
    return jobrouter;
}
module.exports = routes;
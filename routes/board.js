var express = require('express');  
var router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const pool = mysql.createPool({
  connectionLimit : 10, 
  host            : 'localhost',
  user            : 'root',
  password        : 'noo1128148',
  database        : 'irving',
  dateStrings     : 'date' 
});
 
/*게시판으로 이동*/
router.get('/notice', function(req, res, next) {

  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM notice;', function(err, results){
      res.render('notice', { results: results });
      
      conn.release();
    });
  });
});

/*게시판글 등록*/
router.get('/create', function(req, res, next) {

  pool.getConnection(function(err, conn){
    conn.query(`SELECT * FROM notice WHERE NAME='${req.session.ID}';`, function(err, results){
      res.render('create', { results: results });
      
      conn.release();
    });
  });
});


/*게시판글 등록2*/
router.post('/create2', function(req, res, next) {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title);
  console.log(content);
  pool.getConnection(function(err, conn){
    conn.query(`INSERT INTO notice (title, content, name) VALUES ('${title}','${content}','${req.session.ID}');`, function(err, results){
      res.redirect('/board/notice');
      
      conn.release();
    });
  });
});

/*게시판글 삭제*/
router.get('/node', function(req, res, next) {
  if(req.query.name != req.session.ID){
    res.render('error');
  } else{
      pool.getConnection(function(err, conn){
        conn.query(`DELETE FROM notice WHERE id='${req.query.id}';`, function(err, results){
          res.redirect('/board/notice');
          
          conn.release();
        });
      });
  };
});


// 자신의 글을 수정할때 사용하는 라우터

router.get('/update', function(req, res, next) {
  const title = req.query.title;
  const content = req.query.content;
  if(req.query.name != req.session.ID){
    res.render('error');
  } else {
    pool.getConnection(function(err, conn){
      conn.query(`SELECT FROM notice WHERE id ='${req.query.id}';`,function(err, results){
        res.render('update',{ user: req.session.ID, results: results , reqid: req.query.id , title : title, content : content});
   
        conn.release();
      });
    });
  };

  
 });
 
 // 자신의 글을 수정할때 사용하는 라우터
 
 router.post('/ud', function(req, res, next) {
  const reqid = req.body.reqid;
  const title = req.body.title;
  const description = req.body.description;
  pool.getConnection(function(err, conn){
    conn.query(`UPDATE notice SET title = '${title}', content = '${description}' WHERE id ='${reqid}';`,function(err, results){
      res.redirect('/board/notice');
 
 
 
      conn.release();
    });
  });
 });

module.exports = router;

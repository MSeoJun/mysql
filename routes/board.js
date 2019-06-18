var express = require('express');  
var router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../config/dbconfig');
 
/*게시판으로 이동*/
router.get('/notice', function(req, res, next) {

  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM notice;', function(err, results){
      res.render('notice/notice', { results: results });
      
      conn.release();
    });
  });
});

/*게시판글 등록으로 이동*/
router.get('/create', function(req, res, next) {

  pool.getConnection(function(err, conn){
    conn.query(`SELECT * FROM notice WHERE NAME='${req.session.ID}';`, function(err, results){
      res.render('notice/create', { results: results });
      
      conn.release();
    });
  });
});


/*게시판글 등록처리*/
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
    res.render('notice/error');
  } else{
      pool.getConnection(function(err, conn){
        conn.query(`DELETE FROM notice WHERE id='${req.query.id}';`, function(err, results){
          res.redirect('/board/notice');
          
          conn.release();
        });
      });
  };
});


// 게시글 수정하는 페이지로 이동

router.get('/update', function(req, res, next) {
  console.log('/board/update');
  const title = req.query.title;
  const content = req.query.content;
  console.log(req.query.name);

  // console.log(req.query.id);
  
  if(req.query.name != req.session.ID){
    res.render('notice/error');
  } else {
    pool.getConnection(function(err, conn){
      conn.query(`SELECT * FROM notice WHERE id ='${req.query.id}';`,function(err, results){
        // console.log(err);
        // console.log(results);
        // res.render('update', { results : results });
        res.render('notice/update',{ user: req.session.ID, results: results , reqid: req.query.id , title : title, content : content});
        
        conn.release();
      });
    });
  };

  
 });
 
 // 게시글 수정처리
 
 router.post('/ud', function(req, res, next) {
  const reqid = req.body.reqid;
  const title = req.body.title;
  const content = req.body.content;
  pool.getConnection(function(err, conn){
    conn.query(`UPDATE notice SET title = '${title}', content = '${content}' WHERE id ='${reqid}';`,function(err, results){
      res.redirect('/board/notice');
 
 
 
      conn.release();
    });
  });
 });

/*게시판글 등록으로 이동*/
router.get('/tkd', function(req, res, next) {
  res.render('notice/detail');
  return;
  console.log('111');
    pool.getConnection(function(err, conn){
      conn.query(`SELECT * FROM notice WHERE id='${req.query.id}';`, function(err, results){
        res.render('notice/detail', { results: results });
        
        conn.release();
      });
    });
  });

module.exports = router;

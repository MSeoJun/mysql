var express = require('express');  
var router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../config/dbconfig');

/*회원정보 페이지로*/
router.get('/index', function(req, res, next) {

  pool.getConnection(function(err, conn){ 
    conn.query('SELECT * FROM user;', function(err, results){
      res.render('index', { results: results });
      
      conn.release();
    });
  });
});

/*로그인 페이지*/
router.get('/', function(req, res, next) {
  
  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM user;', function(err, results){
      if (req.session.ID && req.session.PW ) {
        res.render('index', { results : results });
      } else {
        res.render('lgcheck', {  });
      }
      
      
      conn.release();
    });
  });
});

/*로그아웃하기*/
router.get('/logout', function(req, res, next) {
  
  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM user;', function(err, results){
      if (req.session.ID && req.session.PW ) {
        res.render('logout', { results : results });
        req.session.destroy();
      } else {
        res.send('로그아웃 할 정보가 없습니다.');
      }
      conn.release();
    });
  });
});

/*회원탈퇴*/
router.get('/delete', function(req, res, next) {
  
  pool.getConnection(function(err, conn){
    if(err) {throw err;
    }
    conn.query(`DELETE FROM user WHERE num = '${req.query.num}'`, function(err, results){
      conn.release();
      req.session.destroy();
      res.redirect('/');
    });
  });
});

/*회원가입 페이지로 이동*/
router.get('/register', function(req, res, next) {

  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM user;', function(err, results){
      res.render('sign_up', { results: results });
      
      conn.release();
    });
  });
});

// 회원가입에서 적은 정보를 저장
router.post('/sign_up', function(req, res, next) {
  const name = req.body.name;
  const age = req.body.age;
  const birth = req.body.birth;
  const hobby = req.body.hobby;
  const phone = req.body.phone;
  const email = req.body.email;
  const pw = req.body.pw;

  pool.getConnection(function(err, conn){
    conn.query(`SELECT * FROM user WHERE email = '${email}'`,function(err, result){
      if(result.length > 0) {
        res.render('sign_up');
      } else {
        conn.query(`INSERT INTO user(name, age, birth, hobby, phone, email, pw)VALUES('${name}', '${age}', '${birth}', '${hobby}', '${phone}', '${email}', MD5('${pw}'));`,function(err, result){
          // conn.query(`SELECT * FROM player WHERE name = '${name}' AND age = '${age}' AND birth = '${birth}' AND hobby = '${hobby}' AND phone = '${phone}' AND email = '${email}' AND pw = MD5('${pw}');`,function(err, result){
          res.render('lgcheck');
        });
      }
    });
  });
});


/*아이디 비밀번호 체크*/
router.post('/Login', function(req, res, next) {
  const id = req.body.id;
  const pw = req.body.pw;
  req.session.ID = req.body.id;
  req.session.PW = req.body.pw;
  
  pool.getConnection(function(err, conn){
    conn.query(`SELECT * FROM user WHERE email = '${id}' AND pw = MD5('${pw}');`, function(err, results){
      
      if(results.length > 0) {
        res.render('lgc', { results: results , id: id, pw: pw});
      } else {
        res.render('lgcheck');
      }
      
      conn.release();
    });
  });
});

module.exports = router;  
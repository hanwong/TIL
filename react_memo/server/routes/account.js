import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/signup', (req, res) => {

  // 유저이름 문자 확인
  let usernameRegex = /^[a-z0-9]+$/;

  if(!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  // 패스워드 길이 확인
  if(req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // 아이디 중복 확인
  Account.findOne({ username: req.body.username }, (err, exists) => {
    if(err) throw err;
    if(exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    // 계정 생성
    let account = new Account({
      username: req.body.username,
      password: req.body.password
    });

    // 비밀번호 암호화
    account.password = account.generateHash(account.password);

    // 데이터베이스에 저장
    account.save( err => {
      if(err) throw err;
      return res.json({ success: true });
    });

  });

});

router.post('/signin', (req, res) => {

  if( typeof req.body.password !== "string" ) {
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }

  Account.findOne({ username: req.body.username }, (err, account ) => {
    if(err) throw err;

    // 계정 유무 확인
    if(!account) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // 비밀번호 유효성 검사
    if(!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // 세션 변동
    let session = req.session;
    session.loginInfo = {
      _id: account._id,
      username: account.username
    };

    // 성공
    return res.json({ success: true });

  });

});

router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }
  res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {

  req.session.destroy(err => { if(err) throw err; });
  return res.json({ success: true });

});

router.get('/search/:username', (req, res) => {
    var re = new RegExp('^' + req.params.username);
    Account.find({username: {$regex: re}}, {_id: false, username: true})
    .limit(5)
    .sort({username: 1})
    .exec((err, accounts) => {
        if(err) throw err;
        res.json(accounts);
    });
});

router.get('/search', (req, res) => {
    res.json([]);
});

export default router;

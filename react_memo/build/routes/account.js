'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', function (req, res) {

  // 유저이름 문자 확인
  var usernameRegex = /^[a-z0-9]+$/;

  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  // 패스워드 길이 확인
  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // 아이디 중복 확인
  _account2.default.findOne({ username: req.body.username }, function (err, exists) {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    // 계정 생성
    var account = new _account2.default({
      username: req.body.username,
      password: req.body.password
    });

    // 비밀번호 암호화
    account.password = account.generateHash(account.password);

    // 데이터베이스에 저장
    account.save(function (err) {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

router.post('/signin', function (req, res) {

  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }

  _account2.default.findOne({ username: req.body.username }, function (err, account) {
    if (err) throw err;

    // 계정 유무 확인
    if (!account) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // 비밀번호 유효성 검사
    if (!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // 세션 변동
    var session = req.session;
    session.loginInfo = {
      _id: account._id,
      username: account.username
    };

    // 성공
    return res.json({ success: true });
  });
});

router.get('/getinfo', function (req, res) {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }
  res.json({ info: req.session.loginInfo });
});

router.post('/logout', function (req, res) {

  req.session.destroy(function (err) {
    if (err) throw err;
  });
  return res.json({ success: true });
});

router.get('/search/:username', function (req, res) {
  var re = new RegExp('^' + req.params.username);
  _account2.default.find({ username: { $regex: re } }, { _id: false, username: true }).limit(5).sort({ username: 1 }).exec(function (err, accounts) {
    if (err) throw err;
    res.json(accounts);
  });
});

router.get('/search', function (req, res) {
  res.json([]);
});

exports.default = router;
import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';
 
const router = express.Router();
 
// WRITE MEMO
router.post('/', (req, res) => {
  // 로그인 상태 확인
  if(typeof req.session.loginInfo === 'undefiend') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }

  // 컨텐츠 유효성 검사
  if(typeof req.body.contents === 'string') {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }  

  if(req.body.contents === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  // 메모 생성
  let memo = new Memo({
    writer: req.session.loginInfo.username,
    contents: req.body.contents
  });

  // 데이터베이스에 저장
  memo.save( err => {
    if(err) throw err;
    return res.json({ success: true });
  });

});
 
// MODIFY MEMO
router.put('/:id', (req, res) => {
  // 메모 아이디 유효성 검사
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  // 컨텐츠 유효성 검사 
  if(typeof req.body.contents === 'string') {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }  

  if(req.body.contents === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  // 로그인 상태 확인
  if(typeof req.session.loginInfo === 'undefiend') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 3
    });
  }

  // 메모 찾기
  Memo.findById(req.params.id, (err, memo) => {
    if(err) throw err;

    // 메모 유무 검사
    if(!memo) {
      return res.status(404).json({
          error: "NO RESOURCE",
          code: 4
      });
    }

    // 작성자 검사
    if(memo.writer != req.session.loginInfo.username) {
      return res.status(403).json({
          error: "PERMISSION FAILURE",
          code: 5
      });
    }

    // 수정 
    memo.contents = req.body.contents;
    memo.date.edited = new Date();
    memo.is_edited = true;

    // 데이터베이스 저장
    memo.save((err, memo) => {
      if(err) throw err;
      return res.json({
          success: true,
          memo
      });
    });
      
  });

});
 
// DELETE MEMO
router.delete('/:id', (req, res) => {

  // 메모 아이디 유효성 검사
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  // 로그인 상태 검사
  if( typeof req.session.loginInfo === 'undefiend' ) {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 2
    });
  }

  // 메모 탐색 및 작성자 확인
  Memo.findById(req.params.id, (err, memo) => {
    if(err) throw err;

    if(!memo) {
      return res.status(404).json({
        error: "NO RESOURCE",
        code: 3
      });
    }

    if(memo.writer != req.session.loginInfo.username){
      return res.status(403).json({
        error: "PERMISSION FAILURE",
        code: 4
      });
    }

    // 메모 삭제
    Memo.remove({ _id: req.params.id }, err => {
      if(err) throw err;
      res.json({ success: true });
    });

  });

});
 
// GET MEMO LIST
router.get('/', (req, res) => {
 
  Memo.find()
  .sort({ "_id": -1})
  .limit(6)
  .exec( (err, memos) => {
    if(err) throw err;
    res.json(memos);
  });

});
 
export default router;
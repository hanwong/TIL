#Vue-Resource

- 소스를 내려 받고 `package.json` 파일이 있는 위치에서 `npm install`

- 패키지가 설치된 뒤에 `npm run dev` 하면 브라우저에 짠~ 하고 알아서 켜짐

- `vue-resource`를 main.js 파일에서 설정
```js
import VueResource from 'vue-resource'
...
Vue.use(VueResource);
```

- 기본 폼 동작 테스트
  - App.vue 파일 template, script 에 코드 작성
```html
<div class="form-group">
  <label>UserName</label>
  <input type="text" class="form-control" v-model="user.username">
</div>
<div class="form-group">
  <label>Mail</label>
  <input type="text" class="form-control" v-model="user.mail">
</div>
<button class="btn btn-primary" @click="submit">Submit</button>
```
```js
export default {
  data() {
    return {
      user: {
        username: '',
        mail: ''
      }
    };
  },
  methods: {
    submit() {
      console.log(this.user);
    }
  }
}

```


- firebase로 테스팅을 위한 DB 환경 설정
  - 계정 생성
  - 프로젝트 생성
  - 데이터베이스(Database) - 규칙(Rule) 에서 `.read`, `.write` 값을 모두 `true`로 변경

- `$http.post()`로 데이터 보내기
  - `post` 메소드 내에 argument로 본인의 데이터베이스 주소 뒤에 `data.json`을 붙여서 입력하고, 다음 argument로 보낸 데이터를 입력
    - `data.json`을 붙이는 것은 내 데이터베이스의 `data`라는 공간에 `json` 형식으로 저장한다라고 생각하면 됨
  - `promise`를 당연히 지원해주므로 `then` 메소드에 성공, 실패에 대한 처리를 해줌

```js
...
  methods: {
    submit() {
      this.$http
        .post('https://your-project.firebaseio.com/data.json', this.user)
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
    }
  }
...
```

- 그러면 성공을 할 것임

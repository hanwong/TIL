# Vue-Resource
### get

- 가져올 데이타를 저장하는 변수 추가
  - `users: []` 이 부분임

```js
data() {
  return {
    user: {
      username: '',
      mail: ''
    },
    users: []
  };
},
```

- 데이타를 호출하는 메소드 추가
  - 첫번째 응답에서 `response.json()`로 받은 데이타는 `promise` 객체가 리턴된다.
  - 다시 한번 `then`을 사용하면 우리가 원하는 데이타 만 가진 객체가 리턴된다.
  - 그 데이타를 다시 한번 써먹을 수 있게 iteration 해주고 위에서 만든 변수에 저장한다.

```js
fetchData() {
  this.$http
    .get('https://your-project.firebaseio.com/data.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const resultArray = [];
      for ( let key in data ) {
        resultArray.push(data[key]);
      }
      this.users = resultArray;
    });
}
```


- 데이타를 가져오는 버튼 만들기

```html
<button class="btn btn-primary" @click="fetchData">GetData</button>
<br>
<br>
<ul class="list-group">
  <li class="list-group-item" v-for="u in users">{{u.username}} - {{u.mail}}</li>
</ul>
```

- 그러면 성공을 할 것임


- `Vue.http.options.root` 사용하기
  - url의 반복되는 root 부분을 `main.js`에 설정해 놓으면 하위 구조에서는 편하게 필요한 정보만 입력 할 수 있게 해줌

```js
Vue.http.options.root = 'https://your-project.firebaseio.com/';
```

  - 위와 같이 설정해 놓으면 `post`, `get` 사용시 좀 더 편리할 듯

```js
...
this.$http
  .post('data.json', this.user)
...
this.$http
  .get('data.json')
...
```

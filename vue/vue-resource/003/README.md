# Vue-Resource
### interceptors

- 인터셉터는 전역에서 request 프로세스 이전 이후에 필요한 조건들을 처리 할 수 있습니다.
  - [interceptors](https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#interceptors)

- Intercepting Request
  - 요청을 인터셉트하는 예제에서는 간단히 POST 메소드로 요청시에 PUT 메소드로 변경해서 처리를 하는 것을 구현하였습니다.

```js
...
Vue.http.interceptors.push((request, next) => {
    console.log(request);
    if(request.method === 'POST') {
        request.method = 'PUT';
    }
    next();
});
...
```

- Intercepting Response
  - 인터셉터를 사용하면 응답이 왔을 때에도 데이터를 필요한 형태의 구조로 변경해서 반환해주는 처리를 할 수 있도록 구현 할 수 있습니다.

```js
...
  next(response => {
      response.json = () => { return { message: response.body } };
  });
...
```


### $resource

- `resource`를 사용하면 `$http` 보다 더욱 간편하고 좀 더 RESTful하게 사용 할 수 있는것 같습니다.
  - 전역에서는 `Vue.resource`로 사용 할 수 있고 개별 인스턴스 안에서는 `this.$resource`로 사용 할 수 있습니다.
  - `resource(url, [params], [actions], [options])`
  - [resource](https://github.com/pagekit/vue-resource/blob/develop/docs/resource.md)


#### 1. resource 기본 세팅

- 먼저 `data`에 `resource`를 활용할 객체를 하나 선언합니다.
- `created()` hook 함수 안에 `$resource` 서비스를 참조해줍니다.
  - 그러면 `resource`를 활용하기 위한 기본적인 설정은 완료되었습니다.

```js
  data() {
    return {
      ...
      resource: {}
    };
  },
  ...
  ...
  created() {
    this.resource = this.$resource('data.json');
  }
```

#### 2. submit() 메소드 수정하기

- 기존에 `$http`를 사용하던 부분은 주석 처리를 해줍니다.
- 그리고 `this.resource.save`에 전송할 `this.user`를 argument로 넣습니다.
  - save와 같이 기본적으로 `get`, `save`, `query`, `update`, `remove`, `delete` 내장 메소드를 제공해줘서 편하게 사용할 수 있습니다.

```js
  submit() {
    // this.$http
    //   .post('data.json', this.user)
    //   .then(response => {
    //     console.log(response);
    //   }, error => {
    //     console.log(error);
    //   });
    this.resource.save({}, this.user);
  }
```

#### 3. fetchData() 메소드 수정하기

- `get`을 사용하는 것도 크게 다르지 않습니다. `$http` 대신에 `resource`로 바꿔주면 됩니다.
  - `this.resource.get()`에 url이 포함 되어 있지 않은 이유는 위에서 초기 설정에 지정을 해두어서 필요하지 않은것입니다. 초기 설정에 url 값을 넣어주지 않는다면 각 메소드들에서 직접 설정해도 됩니다.

```js
  fetchData() {
    // this.$http
    //   .get('data.json')
    this.resource.get()
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

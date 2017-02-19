# Vue-Resource
### interceptors

- Intercepting Request

```js main.js
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

```js main.js
...
  next(response => {
      response.json = () => { return { message: response.body } };
  });
...
```

### VUEJS STUDY

#### 컴포넌트 간 데이터 전달 방식

!(Components data flow)[/vue-cli/src/assets/componentsdata.png]

- `props` PARENT => CHILD.
  - 부모 컴포넌트에서 자식 컴포넌트에 데이터를 전달
  ```html
  <app-server
      :server="parent-server">
  </app-server>
  ```
  - 자식 컴포넌트에서 전달 받은 데이터 사용
  ```js
  export default {
    props: ['server']
  }
  ```
- `$emit` CHILD => PARENT.

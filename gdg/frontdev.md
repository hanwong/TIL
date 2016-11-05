# 초보자를 위한 프론트엔드 개발

## 버전관리
* git
* boilerplate
* 궁금한 것이 있을 떄?
    * 질문부터 하지 말라?
    * W3Fools
    * MDN
    * Web Fundamentals
    * W3C - 규격문서
        * 왜 만들었는지를 알게되고, 다음은 어떻게 가야할지 감이 오게 된다.
    * webplatform.org

* 검색어 site:사이트주소

## 개발프로세스
* 개발, 소스관리
* 점점 커지는 복잡도, 어려워지는 조합의 프론트엔드
    * 개발자는 코드와 모듈을 분리된 형태로 관리하고 싶어함.
    * HTTP호출을 최소화하는 최적화된 코드
* jQuery 만이 다가 아니다, zepto 같은 것도 잇음
* 퍼포먼스
    * underscore
    * lodash
    * moment.js
* CDN
    * cdnjs.com
    * developers.google.com/speed/libraries
    * cloudflare


## HTML CSS
### HTML
* 기본문법
    * .html
    * index.html - 기본 경로 표현
        * HTML 은 문서를 공유하기 위해서 시작된 것
    * 여는태그, 닫는태그가 합쳐져서 한 요소가 됨.
    * 빈요소/
* 문서 구성
    * 기본구조 - 문서타입, HTML요소, head, meta, title, body, 콘텐츠
    * 문서타입을 쓰지 않으면 레거시 코드가 된다. Quirks mode
    * meta - charset, viewport
* 요소
    * sections
        * body
        * article - 독립적인 콘텐츠, 내부의 콘텐츠가 컨텍스트와 상관없는
        * section - 제목을 가진 그룹화 콘텐츠
        * header??
        * footer??
        * h1-6
    * group
        * p
        * ol, ul - li
        * dl - dt - dd
        * figure - figcation
        * div
    * table
        * caption
        * tr - th - td
    * form
        * 유저에게 데이터를 입력 받거나 서버에게 전달하는 목적으로 사용
    * text-level


### CSS
* font-family: `<family-name>`, `<generic-font>`


## Hitchhiker's guide to the front-end

* 로딩 최적화, HTTP Request
    * Require.js - AMD 모듈
    * 돔 로드 끝난 이후에 JS를 로딩해준다.
    * 이제는 번들링 작업 - Webpack
* 이미지 최적화
    * tinypng.com
* test 코드, 

# SVG & D3.js

* WebGL, C++과 JS 연동 될 예정

-

## 개요

#### 이미지 비교
* 라스터 이미지
    * 픽셀로 이미지 표현
    * 이미지를 확대하면 이미지가 깨짐
    * png, jpg, bmp 등

* SVG 이미지
    * 바이너리로 표현
    * 이미지를 확대해도 깨지지 않음


#### SVG
* Scalable Vector Graphics
* Scalable * 속성으로 조절 가능
    * 사전적 의미 * 확대 축속에 난조가 생기지 않음
    * 자동으로 확대 축속에 대응
* Vector
    * 라스터이미지, 픽셀 사용
    * 벡터, 좌표 사용
* Graphics
    * 그래픽으로 표현

#### HTML5 와 SVG
* SVG 스펙 발표
    * 2001년 9월
    * 컴퓨터 사용으로 인해 사용부진
* HTML5와 함께 두각
    * `<svg>`로 표현, 구현, HTML의 요소로 표현, canvas
    * HTML, CSS 조합하여 UI/UX 제공
    * 이전에는 xml 형태로 사용했었음, 그래서 느렸고 사용하기 불편했고,

#### SVG 키워드
* 좌표
    * x,y 좌표
    * 콘텐츠 표현 시작 위치
* 사이즈영역
    * 넓이 높이 개념이 있어야 된다.
    * 콘텐츠 사이즈
* viewport
    * 콘텐츠 표현 공간
    * 콘텐츠 확대 줌인 줌아웃

#### D3.js
* D3 * Data*Driven Documents
* 데이터 기반 도큐먼트
* D3의 기본 방향
    * 모든 기능이 아닌 핵심 기능만 제공
    * 이를 사용하여 프로그램 개발
    * 다양한 UI/UX 제공 불가

#### 향후 전망
* 데이터 시각화
    * 데이터로 그래프 표현은 필수
    * 인포그래픽, 그래픽과 SVG를 잘 정리한거.... 해볼까???
* 모바일 적용 확대
    * 아이콘, 메뉴 버튼에 사용
    * 목적 * 확대, 축소 대응

-

## 기본 도형

#### 개요
* 기본 스펙
    * SVG 1.1 - 2011.08.16
    * SVG2 - Draft
* SVG 에디터
    * 일러스트레이터
    * svg-edit
    * inkscape
* SVG 작성 형태
    * HTML에 인라인 형태로 작성
    * XML - 2010년 이전...

* `<svg>` 엘리먼트
    * class, style - css style, 완전히 같지는 않고 스펙이 조금 다르니 확인이 필요함.
    * x, y - 위치 좌표
    * width, height - 너비, 높이
    * viewBox - 축소 확대 기능
    * preserveAspectRatio - xmin ymin
    * [svg spec](https://www.w3.org/TR/SVG/)
    * [svg mdn](https://developer.mozilla.org/en-US/docs/Web/SVG)


#### 주요 용어
* 글리프 (glyph)
    * 글자 하나의 모양 단위
    * 도형 기호 괄호 공백 등 포함
* SVG canvas
    * 표현 공간
    * 좌우 상하의 무한 공간과 유효한 공간으로 구분
* 뷰포트


## 선 - line

#### `<line>`
* class, style
* x1 y1에서 x2 y2로 선을 긋는다.
* transform - matrix, translate, scale, rotate
    * translate()를 작성하여 선의 이동, 몽땅 여기서 저기로
    * presentation, event 스펙 -  대부분 css
* onClick과 같은 이벤트 설정 가능, DOM과 함께

* 선 긋기
    * x1, y1 - 시작 좌표
    * x2, y2 - 끝 좌표
    * stroke - 라인 색 표현, 지정하지 않으면 선이 보이지 않음.

* CSS style
    * svg1.1은 css2 기준이다.
    * CSS3에서 svg 1.1 및 2.0 지원
    * `style="stroke: blue"`
    * `<style>`

* `stroke` - 작성하지 않으면 선이 보이지 않음.
    * `stroke` - 선색
        * rgb, rgba, hex 로 줄 수 있음
    * `stroke-width`, `stroke-height`
        * 선 두께
        * 선의 가운데가 좌표의 시작점
        * **좌표를 기준으로 좌우상하로 표시, 꼭지점 기준이 아님**
    * `stroke-linecap`
        * 선끝 모습
        * butt, round, square
    * `stroke-dasharray`
        * 점선과 간격
        * "20, 5" - 20픽셀을 긋고 5픽셀 띄움
        * 복수형태
            * "30, 10, 7, 3" - 30긋고 10띄우고 7긋고 3띄우고
    * `stroke-opacity` - 투명도
    * `stroke-linejoin`
        * 모퉁이 각, 선이 겹치는 부분의 처리
        * miter, round, bevel
    * `stroke-miterlimit`
        * `stroke-linejoin="miter"`와 같이 사용
        * 디폴트 값은 4, 직접 설정 해봐야 암
    * `stroke-dashoffset`
        * dasharray와 같이 사용
        * 처음 시작을 띄우고 그 좌표 부터 array 값 대로 그림
    * `stroke-offset`
        *


## 도형

* `<rect>`
    * x, y
    * width, height
    * rx, ry - radius

* `fill` 속성
    * fill 은 기본값이 black임.
    * `fill-opacity` - 투명도
    * `fill-rule`
        * nonezero - 영역 전체를 페인트
        * evenodd - 겹치는 부분을 칠하지 않음

* `<circle>`
    * cx, cy - 중심 좌표
    * r - 반지름

* `<ellipse>`
    * cx, cy - 중심 좌표
    * rx, ry - x축 반지름, y축 반지름

* `<polyline>`
    * 꺽은선
    * points
    * fill 로 채울 수 있음.

* `<polygon>`
    * polyline과 속성은 같음
    * 마지막 점에서 시작점으로 선을 연결함

* `<path>`
    * 좌표를 직선 또는 곡선으로 연결, 그래프의 대부분을 이것으로 그림
    * `pathLength`
    * fill, stroke로 채우고 선색을 준다.
    * `d` 속성
        * d 속성 값으로 외곽선 아웃라인을 긋는다.
        * `M100,160` - 외곽선을 긋는 시작 위치
        * `L160,100` - 으로 선을 긋고, 선을 긋고 ,
        * `z` - 시작 좌표로 선을 긋는다.
        * 선을 그어서 도형을 만들고, 도형으로 인식된다.
    * `d` 속성 구성
        * `M100,160`
        * 명령 - M, L, Q, S ...
            * M - move to
        * 파라미터
            * 100, 160
        * 서브패스
    * `d` 속성 작성 기준
        * 콤마구분 - `M100,160 L160,100`
        * 공백구분 - `M100 160 L160 100`
        * 파라미터와 명령어 연결 - `M100 160L160 100`
        * 같은 명령이 연속될때 명령 문자 생략 가능
            * `M100,160 L160,100 160,100 160,100`
        * 줄 분리 방법
            * 따옴표, `+`로 연결하지 않고 그냥 줄을 분리
        * 현 위치 current point
            * 선을 긋는 현재 위치
    * 절대/상대 좌표
        * 절대 좌표 - M, L 대문자 사용
        * 상대 좌표 - m, l 소문자 사용
        * 모든 명령은 절대 명령에 대한 상대 명령이 있음
            * M:m , L:l
        * path data 에러 처리 기준
            * 에러가 발생한 이전 명령까지 표현
            * 에러 이후 명령은 처리하지 않음
    * [d 명령어](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)
        * `M`
            * Move to, 선을 그리는 시작 위치가 됨
            * 중간에 새로운 시작 좌표를 그릴수 있다.
            * 처음 `m`은 대문자로 처리 된다.
        * `L`
            * Line to, 선 긋기
            * `M160,140 160,200` - `L` 명령 생략, 작성하지 않으면 lineto로 간주한다.
            * `H, h` - x값, 수평선을 그음
            * `V, v` - y값, 수직선을 그음
        * `Z`
            * Close path
            * sub-path를 닫음, 다음 명령은 새로운 sub-path를 만듬
            * 대소문자를 구분하지 않음
        * `A` - Curve
            * rx, ry - 타원호 반지름
            * x-axis-rotation - x축 회전 각도
            * large-arc-flag - 호 선택(1: 긴 방향, 0: 짧은 방향)
            * sweep-flag - 회전 방향 (1: 시계방향, 0: 반시계방향)
            * x, y - 끝 좌표
            * 타원호 크기 구하기 - `getBoundingClientRect()`
                * width, height, top, right, left, bottom
        * `Q` - 2차 베지어 곡선
            * x1, y1 - x, y 축 제어점
            * x, y  - x, y 끝점
            * 시작점에서 제어점을 경유하여 끝점으로 포물선을 그린다.
            * `T` - 점 대칭
        * `C`
            * x1, y1 - x, y 축 첫번째 제어점
            * x2, y2 - x, y 축 두번째 제어점
            * x, y - x, y 끝점
            * `S` - 대칭


## `viewBox`
* `viewBox="min-x ,min-y ,width ,height"`
* `viewBox="min-x min-y width height"`
    * viewBox 범위만 페이지에 표시되고 밖은 표시되지 않는다.
    * 음수 영역 표시
        * 앞 viewBox에서 음수 영역을 표시하려면 viewBox에 음수 좌표로 영역 지정
    * `viewBox` 축소
        * 음수 영역 표시
        * 비율로 축소
            * `<svg>` width/height는 변경하지 않고 표시할 전체 영역을 `viewBox`의 width/height를 변경
    * `viewBox` 확대
        * `<svg>` width/height는 변경하지 않고 표시할 전체 영역을 `viewBox`의 width/height를 변경

## `transform`
* `translate` - tx[ty] 값 만큼 이동
    * 도형이동, top, left 보다 처리 속도가 훨씬 빠름

* `scale` - sx[sy] 비율 만큼 이동 및 확대
    * x,y x2 한 위치로 이동
    * width,height x2 한 크기로 확대
    * 음수로도 가능

* `rotate`
    * (angle, cx, cy)
    * angle - 양수 시계방향, 음수 시계반대방향
    * cx, cy - 기본 값은 (0,0)을 기준으로 회전한다.

* `skewX`, `skewY` - 경사, 기울기

* `matrix(a,b,c,d,e,f)`
    * a - x축 확대 축소
    * b - y축 기울기
    * c - x축 기울기
    * d - y축 확대 축소
    * e - x축 이동
    * f - y축 이동


## `text`
* x, y - 시작점
    * baseline - 한글은 베이스라인에 맞추거나 조금 아래에 표시, 영어는 꼬리 달린 소문자들만 밑으로 표시됨
* dx, dy - 이동 값
* textLength - 전체 길이
* lengthAdjust - textLength 속성, spacing, spacingAndGlyphs
* rotate - 회전
    * `rotate="30,50,50,90..."` 각 글자에 따라 다르게 적용 가능
* text-anchor
    * 텍스트 위치 맞춤 - start, middle, end
* writing-mode
* spacing, letter-spacing, word-spacing
* text-decoration
* fill, stroke, dasharray ... svg는 glyph로 그리기 때문에 가능함...


## 공통 엘리먼트
* `<g>`
* `<use>`


## 텍스트 마커 이미지 도형 제어


-

* `<canvas>`
    * 비트맵 기반으로 그려지고
    * js를 활용해서 그려야함
    * 속도가 빠름
    * 확대 축소가 필요 없을 때 사용

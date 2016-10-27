/**
 * Recursion
 *  - 매개변수의 명시화 : Recursion 함수 작성시 변수를 명시적으로 작성한다.
 */

// 순차 탐색 - 검색 할 구간을 begin, end로 명시적으로 표시
function search(data, begin, end, target) {
    if(begin > end) {
        return -1;
    }
    else if(target === data[begin]) {
        return data[begin];
    }
    else {
        return search(data, begin + 1, end, target);
    }
}

var testData = [ 5, 6, 2, 3, 1, 4, 7, 10, 8, 9];
search(testData, 0, 7, 3);

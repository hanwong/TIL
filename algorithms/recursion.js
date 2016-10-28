/**
 * Recursion
 *  - 매개변수의 명시화 : Recursion 함수 작성시 변수를 명시적으로 작성한다.
 */

// 순차 탐색 - 검색 할 구간을 begin, end로 명시적으로 표시
// 처음부터 끝까지 찾는 방법
function searchAll(data, begin, end, target) {
    if(begin > end) {
        return -1;
    }
    else if(target === data[begin]) {
        return begin;
    }
    else {
        return search(data, begin + 1, end, target);
    }
}

// 반으로 나눠서 찾는 방법
function searchMiddle(data, begin, end, target) {
    if(begin > end) {
        return -1;
    }
    else {
        var middle = ( begin + end ) / 2;

        if(data[middle] === target) {
            return middle;
        }

        var index = searchMiddle(data, begin, middle - 1, target);

        if(index != -1){
            return index;
        }
        else {
            return searchMiddle(data, middle + 1, end, target);
        }
    }
}

var testData = [ 5, 6, 2, 3, 1, 4, 7, 10, 8, 9];
searchAll(testData, 0, 7, 3);
searchMiddle(testData, 0, 7, 3);

// 최대값 찾기
function findMax(data, begin, end) {
    if(begin === end){
        return data[begin];
    }
    else {
        return Math.max(data[begin], findMax(data, begin+1, end));
    }
}

findMax(testData, 0, 9);


// Binary Search
function binarySearch(items, target, begin, end) {
    if(begin > end) {
        return console.log('error');
    }
    else {
        var middle = ( begin + end ) / 2,
            compareResult = target === items[middle] ? 0 :
            target < items[middle] ? -1 : 1;

        if(compareResult === 0) {
            return middle;
        }
        else if(compareResult < 0) {
            return binarySearch(items, target, begin, middle-1);
        }
        else {
            return binarySearch(items, target, middle+1, end);
        }
    }
}

// Maze 미로찾기
var N = 8,
    maze = [[0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 1, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0, 1, 1],
            [0, 1, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0, 1, 0, 0]];

var pathWay = 0,
    wall    = 1,
    blocked = 2,
    path    = 3;

function findMazePath(x, y) {

    if ( x < 0 || y < 0 || x > N || y > N ) {
        return false;
    }
    else if ( maze[x][y] != pathWay ) {
        return false;
    }
    else if ( x === N-1 && y === N-1 ) {
        maze[x][y] = path;
        return true;
    }
    else {
        maze[x][y] = path;
        if ( findMazePath(x-1, y) ||
             findMazePath(x, y+1) ||
             findMazePath(x+1, y) ||
             findMazePath(x, y-1) ) {
                 return true;
        }
        maze[x][y] = blocked;
        return false;
    }

}

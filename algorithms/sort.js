'use strict'
/**
 * Sorting Algorithms
 */

/**
 * Merge Sort - 분할정복법
 *  분할 - 해결하고자 하는 문제를 작은 크기의 동일한 문제들로 분할
 *  정복 - 각각의 작은 문제를 순환적으로 해결
 *  합병 - 작은 문제의 해를 합하여 원래 문제에 대한 해를 구함
 */
function mergeSort(data, p, r) {
    if( p < r ) {
        var q = parseInt((p+r)/2, 10);
        mergeSort(data, p, q);
        mergeSort(data, q+1, r);
        merge(data, p, q, r);
    }
}

function merge(data, p, q, r) {
    var i = p, j = q+1, k = p,
        tmp = [];

    while (i<=q && j<=r) {
        if(data[i]<=data[j]) {
            tmp[k++] = data[i++];
            console.log(i, data[i]);
            console.log(j, data[j]);
        }
        else {
            tmp[k++] = data[j++];
            console.log(i, data[i]);
            console.log(j, data[j]);
        }
    }

    while (i<=q) {
        tmp[k++] = data[i++];
    }

    while (j<=r) {
        tmp[k++] = data[j++];
    }

    for( let idx=p ; idx<=r ; idx++) {
        data[idx] = tmp[idx];
    }
    console.log('merge', tmp);
}

var data = [9,3,2,6,7,5,4,1,0,8];
// console.log('start', data);
// mergeSort(data, 0, 9);

/**
 * Quick Sort - 분할정복법
 *  분할 - pivot 값을 기준으로 나눈다.
 *  정복 - partition 개념이 중요. pivot 기준의 앞뒤 partition을 순환 정렬
 *  합병 - nothing to do
 */
function quickSort(data, p, r) {
    if( p < r ) {
        var q = partition(data, p, r);
        quickSort(data, p, q-1);
        quickSort(data, q+1, r);
    }
}

function partition(data, p, r) {
    var pivot=data[r], i = p-1, j = p, tmp;

    for( ; j<=r-1 ; j++) {
        if(data[j] <= pivot) {
            i++;
            tmp = data[i];
            data[i] = data[j];
            data[j] = tmp;
        }
    }

    tmp = data[i+1];
    data[i+1] = pivot;
    data[r] = tmp;
    console.log('part-small', data.slice(0,i+1));
    console.log('pivot', data[i+1]);
    console.log('part-big', data.slice(i+2,r+1));
    console.log('---partition---', data.slice(p,r+1));
    return i+1;
}
console.log('start', data);
quickSort(data, 0, 9);
console.log('end', data);

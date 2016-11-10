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
        }
        else {
            tmp[k++] = data[j++];
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
}

var data = [9,3,2,6,7,5,4,1,8,0];
mergeSort(data, 0, 9);

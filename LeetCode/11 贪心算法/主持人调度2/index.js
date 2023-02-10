/**
 思路
 1 通过 sort 方法对数组进行从小到大排序
 2 查找目前区间的头元素是否在当前一个区间外，是的话更新当前区间
 3 否的话，主持人人数 + 1, 并重置当前人数
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 计算成功举办活动需要多少名主持人
 * @param n int整型 有n个活动
 * @param startEnd int整型二维数组 startEnd[i][0]用于表示第i个活动的开始时间，startEnd[i][1]表示第i个活动的结束时间
 * @return int整型
 */
function minmumNumberOfHost(n, startEnd) {
  if (n <= 1) return n;
  // write code here
  const arr = startEnd.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let res = 1;
  let pre = arr.shift();

  while (arr.length > 0) {
    const targetIndex = arr.findIndex((item) => item[0] >= pre[1]);
    if (targetIndex < 0) {
      pre = arr.shift();
      res++;
    } else {
      pre = arr[targetIndex];
      arr.splice(targetIndex, 1); // 删除
    }
  }

  return res;
}

/**
 * 
 思路
 隐形条件: start 必然小于等于 end
 通过隐形条件可知， 只要当前区间的start >= end 则不需要换主持人  👉 [start1, end1] [start2, end2]
 只有当当前区间的 start < end 需要更换支持人 

 因此我们可以通过先对开始区间和结束区间进行排序
 在根据当前区间的开始时间和上一个区间的结束时间做判断
 */
function minmumNumberOfHost2(n, startEnd) {
  if (n <= 1) return n;
  // write code here
  const start = startEnd.map((item) => item[0]).sort((a, b) => a - b);
  const end = startEnd.map((item) => item[1]).sort((a, b) => a - b);
  let res = 0;
  let j = 0;
  for (let i = 0; i < n; i++) {
    if (start[i] >= end[j]) {
      j++;
    } else {
      res++;
    }
  }

  return res;
}

console.log(
  minmumNumberOfHost(6, [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ])
);

// console.log(
//   minmumNumberOfHost(34, [
//     [547, 612],
//     [417, 551],
//     [132, 132],
//     [168, 446],
//     [95, 747],
//     [187, 908],
//     [115, 712],
//     [15, 329],
//     [612, 900],
//     [3, 509],
//     [181, 200],
//     [562, 787],
//     [136, 268],
//     [36, 784],
//     [533, 573],
//     [165, 946],
//     [343, 442],
//     [127, 725],
//     [557, 991],
//     [604, 613],
//     [633, 721],
//     [287, 847],
//     [414, 480],
//     [428, 698],
//     [437, 616],
//     [475, 932],
//     [652, 886],
//     [19, 992],
//     [132, 543],
//     [390, 869],
//     [754, 903],
//     [284, 925],
//     [511, 951],
//     [272, 739],
//   ])
// );

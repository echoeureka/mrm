const arr = [124, 1, 43, 3, 2, 4, 32, 3, 2, 3, 44]

for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 44) arr.splice(i, 1)
}
console.log(arr)

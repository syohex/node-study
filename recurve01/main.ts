let f: (lst: number[], index: number) => number;
f = (lst: number[], index: number): number => {
  if (index == lst.length) {
    return 0;
  }

  return lst[index] + f(lst, index + 1);
};

console.log(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0));

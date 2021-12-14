function part1(nums: number[], target: number): number {
  const s = new Set<number>();
  for (const num of nums) {
    s.add(num);
  }

  for (const num of nums) {
    const diff = target - num;
    if (s.has(diff)) {
      return num * diff;
    }
  }

  throw new Error("never reash here");
}

function part2(nums: number[], target: number): number {
  const s = new Set<number>();
  for (const num of nums) {
    s.add(num);
  }

  const len = nums.length;
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len; ++j) {
      if (i === j) {
        continue;
      }

      const diff = target - nums[i] - nums[j];
      if (s.has(diff)) {
        return diff * nums[i] * nums[j];
      }
    }
  }

  throw new Error("never reach here");
}

function test() {
  const input: number[] = [1721, 979, 366, 299, 675, 1456];
  console.assert(part1(input, 2020) === 514579);
  console.assert(part2(input, 2020) === 241861950);
}

async function main() {
  const text = await Deno.readTextFile("./input.txt");
  const nums = text.split(/\r?\n/).filter((line) => line.length !== 0).map((
    line,
  ) => parseInt(line));
  const answer1 = part1(nums, 2020);
  const answer2 = part2(nums, 2020);
  console.log(`Part1: ${answer1}`);
  console.log(`Part2: ${answer2}`);

  if (answer1 !== 157059) {
    throw new Error(`Part1 answer must be 157059`);
  }
  if (answer2 !== 165080960) {
    throw new Error(`Part2 answer must be 165080960`);
  }
}

test();
main().catch((err) => console.error(err));

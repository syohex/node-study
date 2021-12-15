function parseInput(input: string): string[][] {
  return input.split(/\r?\n/).filter((line) => line.length !== 0).map(
    (line) => {
      return line.split("");
    },
  );
}

function common(data: string[][], rowStep: number, colStep: number): number {
  const rows = data.length;
  const cols = data[0].length;

  let row = 0;
  let col = 0;
  let ret = 0;

  while (true) {
    row = row + rowStep;
    col = (col + colStep) % cols;

    if (row >= rows) {
      break;
    }

    if (data[row][col] === "#") {
      ret += 1;
    }
  }

  return ret;
}

function part1(data: string[][]): number {
  return common(data, 1, 3);
}

function part2(data: string[][]): number {
  const steps = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
  return steps.reduce((acc, [rowStep, colStep]) => {
    return acc * common(data, rowStep, colStep);
  }, 1);
}

function test() {
  const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

  const data = parseInput(input);
  const answer1 = part1(data);
  const answer2 = part2(data);

  console.assert(answer1 === 7);
  console.assert(answer2 === 336);
}

test();

async function main() {
  const input = await Deno.readTextFile("input.txt");
  const data = parseInput(input);
  const answer1 = part1(data);
  const answer2 = part2(data);

  console.log(`Part1: ${answer1}`);
  console.log(`Part2: ${answer2}`);

  console.assert(answer1 === 299);
  console.assert(answer2 === 3621285278);
}

main().catch((err) => console.error(err));

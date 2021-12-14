type Data = {
  lowest: number;
  highest: number;
  ch: string;
  password: string;
};

function parseInput(input: string): Data[] {
  return input.split(/\r?\n/).filter((line) => line.length !== 0).map(
    (line) => {
      const match = line.match(/^(\d+)-(\d+)\s+([a-z]):\s+(\S+)$/);
      if (match === null) {
        throw new Error(`unexpected input: ${line}`);
      }

      return {
        lowest: parseInt(match[1]),
        highest: parseInt(match[2]),
        ch: match[3],
        password: match[4],
      };
    },
  );
}

function part1(data: Data[]): number {
  return data.filter((d) => {
    const chars = d.password.split("").filter((c) => c === d.ch).length;
    return chars >= d.lowest && chars <= d.highest;
  }).length;
}

function part2(data: Data[]): number {
  return data.filter((d) => {
    const first = d.password[d.lowest - 1] === d.ch ? 1 : 0;
    const second = d.password[d.highest - 1] === d.ch ? 1 : 0;
    return (first ^ second) === 1;
  }).length;
}

function test() {
  const input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;
  const data = parseInput(input);
  const answer1 = part1(data);
  console.log(`Part1: ${answer1}`);

  if (answer1 !== 2) {
    throw new Error(`answer1 must be 2`);
  }

  const answer2 = part2(data);
  console.log(`Part2: ${answer2}`);

  if (answer1 !== 2) {
    throw new Error(`answer1 must be 2`);
  }
  if (answer2 !== 1) {
    throw new Error(`answer2 must be 1`);
  }
}

async function main() {
  const input = await Deno.readTextFile("input.txt");
  const data = parseInput(input);
  const answer1 = part1(data);
  const answer2 = part2(data);

  console.log(`Part1: ${answer1}`);
  console.log(`Part2: ${answer2}`);

  if (answer1 !== 580) {
    throw new Error(`Answer1 must be 580`);
  }
  if (answer2 !== 611) {
    throw new Error(`Answer1 must be 611`);
  }
}

test();
main().catch((err) => console.error(err));

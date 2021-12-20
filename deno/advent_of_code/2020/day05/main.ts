function parseSeat(seat: string): number {
  const parseAsBinary = (str: string, zeroChar: string): number => {
    return [...str].reduce((acc, c) => {
      const val = c === zeroChar ? 0 : 1;
      return acc * 2 + val;
    }, 0);
  };

  const rowStr = seat.substring(0, 7);
  const colStr = seat.substring(7);

  const row = parseAsBinary(rowStr, "F");
  const col = parseAsBinary(colStr, "L");
  return row * 8 + col;
}

function part1(seatData: string[]): number {
  const ids = seatData.map(parseSeat);
  return Math.max(...ids);
}

function part2(seatData: string[]): number {
  const ids = seatData.map(parseSeat);
  const s = new Set([...ids]);
  const ret = ids.find((id) => {
    return !s.has(id + 1) && s.has(id + 2);
  });
  if (!ret) {
    throw new Error("my seat is not found");
  }

  return ret + 1;
}

function test() {
  console.assert(parseSeat("BFFFBBFRRR") === 567);
  console.assert(parseSeat("FFFBBBFRRR") === 119);
  console.assert(parseSeat("BBFFBBFRLL") === 820);
}

async function main() {
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split(/\r?\n/).filter((line) => line.length !== 0);
  const answer1 = part1(lines);
  const answer2 = part2(lines);

  console.assert(answer1 === 896);
  console.assert(answer2 === 659);

  console.log(`Part1: ${answer1}`);
  console.log(`Part2: ${answer2}`);
}

test();

await main();

type Passport = {
  [key: string]: number | string;
};

function parseInput(input: string): Passport[] {
  const ret: Passport[] = [];
  const lines = input.split(/\r?\n/);

  const numKeys = new Set<string>(["byr", "iyr", "eyr"]);

  let passport = {} as Passport;
  for (const line of lines) {
    if (line.match(/^\s*$/)) {
      ret.push(passport);
      passport = {};
      continue;
    }

    const re = /(\w+):(\S+)/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(line)) !== null) {
      const key: keyof Passport = match[1];
      const value = match[2];

      if (numKeys.has(key)) {
        passport[key] = parseInt(value);
      } else {
        passport[key] = value;
      }
    }
  }

  if (Object.keys(passport).length !== 0) {
    ret.push(passport);
  }

  return ret;
}

function part1(passports: Passport[]): number {
  const mandatoryKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  return passports.filter((p) => {
    return mandatoryKeys.every((key) => key in p);
  }).length;
}

function part2(passports: Passport[]): number {
  const mandatoryKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const validEyeColor = new Set<string>([
    "amb",
    "blu",
    "brn",
    "gry",
    "grn",
    "hzl",
    "oth",
  ]);
  return passports.filter((p) => {
    return mandatoryKeys.every((key) => key in p);
  }).filter((p) => {
    if (!(p.byr >= 1920 && p.byr <= 2002)) {
      return false;
    }
    if (!(p.iyr >= 2010 && p.iyr <= 2020)) {
      return false;
    }
    if (!(p.eyr >= 2020 && p.eyr <= 2030)) {
      return false;
    }

    if (typeof p.hgt === "string") {
      const match = p.hgt.match(/^(\d+)(cm|in)$/);
      if (!match) {
        return false;
      }

      const height = parseInt(match[1]);
      const unit = match[2];
      if (unit === "cm") {
        if (!(height >= 150 && height <= 193)) {
          return false;
        }
      } else {
        if (!(height >= 59 && height <= 76)) {
          return false;
        }
      }
    }
    if (typeof p.hcl === "string") {
      if (!p.hcl.match(/^#[0-9a-f]{6}$/)) {
        return false;
      }
    }
    if (typeof p.ecl === "string") {
      if (!validEyeColor.has(p.ecl)) {
        return false;
      }
    }
    if (typeof p.pid === "string") {
      if (!p.pid.match(/^[0-9]{9}$/)) {
        return false;
      }
    }

    return true;
  }).length;
}

function test() {
  const input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
  byr:1937 iyr:2017 cid:147 hgt:183cm
  
  iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
  hcl:#cfa07d byr:1929

  hcl:#ae17e1 iyr:2013
  eyr:2024
  ecl:brn pid:760753108 byr:1931
  hgt:179cm

  hcl:#cfa07d eyr:2025 pid:166559648
  iyr:2011 ecl:brn hgt:59in
  `;

  const data = parseInput(input);
  const answer1 = part1(data);
  console.assert(answer1 === 2);

  const input2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
  
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

  const answer2 = part2(parseInput(input2));
  console.assert(answer2 === 4);
}

async function main() {
  const input = await Deno.readTextFile("input.txt");
  const data = parseInput(input);
  const answer1 = part1(data);
  const answer2 = part2(data);

  console.log(`Part1: ${answer1}`);
  console.log(`Part2: ${answer2}`);

  console.assert(answer1 === 213);
  console.assert(answer2 === 147);
}

test();

main().catch((err) => console.error(err));

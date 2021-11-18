class HitAndBlow {
  private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private answer: string[] = [];
  private tryCount = 0;

  setting() {
    const answerLength = 3;

    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length);
      const selectedItem = this.answerSource[randNum];
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem);
      }
    }
  }

  async play() : Promise<void> {
    const inputArr = (await promptInput('Input 3 numbers seperated by ","')).split(',');
    const result = this.check(inputArr);

    if (result.hit != this.answer.length) {
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
      this.tryCount += 1;
      await this.play();
    } else {
      this.tryCount += 1;
    }
  }

  private check(input: string[]): { hit: number, blow: number } {
    let hitCount = 0;
    let blowCount = 0;

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1;
      } else if (this.answer.includes(val)) {
        blowCount += 1;
      }
    });

    return {
      hit: hitCount,
      blow: blowCount,
    };
  }

  end() {
    printLine(`Correct!\nYour trials: ${this.tryCount}`);
    process.exit(0);
  }
}

function printLine(text: string, breakLine: boolean = true) {
  process.stdout.write(text + (breakLine ? '\n' : ''));
}

function readLineFromStdin(): Promise<string> {
  return new Promise((resolve) => {
    process.stdin.once('data', data => {
      resolve(data.toString());
    });
  });
}

async function promptInput(text: string) {
  printLine(`\n${text}\n> `, false)
  const input: string = await readLineFromStdin();
  return input.trim();
}

async function main(): Promise<void> {
  const hitAndBlow = new HitAndBlow();
  hitAndBlow.setting();
  await hitAndBlow.play();
  hitAndBlow.end();
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
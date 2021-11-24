import { Task, Status } from "./Task";

export class TaskCollection {
  private tasks: Task[] = [];

  add(task: Task): void {
    this.tasks.push(task);
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  find(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(task: Task) {
    this.tasks = this.tasks.map((item) => {
      if (item.id === task.id) {
        return task;
      }

      return item;
    });
  }

  filter(s: Status): Task[] {
    return this.tasks.filter(({ status }) => status === s);
  }
};
import dragula from 'dragula';
import { Status, Task, statusMap } from './Task';

export class TaskRenderer {
  constructor(
    private readonly todoList: HTMLElement,
    private readonly doingList: HTMLElement,
    private readonly doneList: HTMLElement,
  ) {
  }

  append(task: Task): { deleteButton: HTMLElement } {
    const { taskElement, deleteButton } = this.render(task);
    this.todoList.append(taskElement);
    return { deleteButton };
  }

  private render(task: Task): { taskElement: HTMLElement, deleteButton: HTMLElement } {
    const taskElement = document.createElement('div');
    const spanElement = document.createElement('span');
    const deleteButton = document.createElement('button');

    taskElement.id = task.id;
    taskElement.classList.add('task-item');

    spanElement.textContent = task.title;
    deleteButton.textContent = 'Delete';

    taskElement.append(spanElement, deleteButton);
    return { taskElement, deleteButton };
  }

  remove(task: Task) {
    const taskElement = document.getElementById(task.id);
    if (!taskElement) {
      return;
    }

    if (task.status === statusMap.todo) {
      this.todoList.removeChild(taskElement);
    } else if (task.status === statusMap.doing) {
      this.doingList.removeChild(taskElement);
    } else if (task.status === statusMap.done) {
      this.doneList.removeChild(taskElement);
    }
  }

  subscribeDragAndDrop(onDrop: (el: Element, sibling: Element | null, newStatus: Status) => void) {
    dragula([this.todoList, this.doingList, this.doneList]).on('drop', (el, target, _source, sibling) => {
      let newStatus: Status = statusMap.todo;

      if (target.id === 'doingList') {
        newStatus = statusMap.doing;
      } else if (target.id === 'doneList') {
        newStatus = statusMap.done;
      }

      onDrop(el, sibling, newStatus);
    });
  }

  getId(el: Element): string {
    return el.id;
  }
};
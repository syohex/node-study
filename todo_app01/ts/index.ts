import { EventListener } from './EventListener';
import { Status, Task, statusMap } from './Task';
import { TaskCollection } from './TaskCollection';
import { TaskRenderer } from './TaskRenderer';

class Application {
  private readonly eventListener = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRenderer = new TaskRenderer(
    document.getElementById('todoList') as HTMLElement,
    document.getElementById('doingList') as HTMLElement,
    document.getElementById('doneList') as HTMLElement
  );

  start() {
    const createForm = document.getElementById('createForm') as HTMLElement;
    const deleteAllDoneButton = document.getElementById('deleteAllDoneTask') as HTMLElement;

    this.eventListener.add('submit-handler', 'submit', createForm, this.handleSubmit.bind(this));
    this.eventListener.add('click-handler', 'click', deleteAllDoneButton,
      this.handleClickDeleteAllDoneTasks.bind(this));

    this.taskRenderer.subscribeDragAndDrop(this.handleDragAndDrop.bind(this));
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const titleInput = document.getElementById('title') as HTMLInputElement;
    if (!titleInput.value) {
      return;
    }

    const task = new Task({ title: titleInput.value });
    this.taskCollection.add(task);
    const { deleteButton } = this.taskRenderer.append(task);

    this.eventListener.add(
      task.id,
      'click',
      deleteButton,
      () => this.handleClickDeleteTask(task),
    )

    titleInput.value = '';
  }

  private handleClickDeleteTask(task: Task) {
    if (!window.confirm(`Delete "${task.title}" OK ?`)) {
      return;
    }

    this.executeDeleteTask(task);
  }

  private handleDragAndDrop(el: Element, sibiling: Element | null, newStatus: Status) {
    const taskId = this.taskRenderer.getId(el);
    if (!taskId) {
      return;
    }

    const task = this.taskCollection.find(taskId);
    if (!task) {
      return;
    }

    task.update({ status: newStatus });
    this.taskCollection.update(task);

    console.log(sibiling);
  }

  private executeDeleteTask(task: Task) {
    this.eventListener.remove(task.id);
    this.taskCollection.delete(task);
    this.taskRenderer.remove(task);
  }

  private handleClickDeleteAllDoneTasks() {
    if (!window.confirm('Clear all DONE tasks, OK ?')) {
      return;
    }

    const doneTasks = this.taskCollection.filter(statusMap.done);
    doneTasks.forEach((task) => this.executeDeleteTask(task));
  }
}

window.addEventListener('load', () => {
  const app = new Application();
  app.start();
});
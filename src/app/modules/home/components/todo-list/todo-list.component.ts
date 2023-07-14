import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from "../../models/task-list";

@Component({
  selector: 't-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]');

  constructor() { }
  ngDoCheck(): void {
    this.setLocalStorage()
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm('Deseja realmente remover todos os itens da lista?')
    if (confirm === true) this.taskList = [];
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja Deletar?')
      if (confirm === true) this.deleteItemTaskList(index)
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}

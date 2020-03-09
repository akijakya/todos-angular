import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  // we are getting the information from the todos.component.html,
  // which gets the information from todo-item.component.ts
  // Here, we delete the task from the UI and also send a delete request to the server
  deleteTodo(todo:Todo) {
    // this replaces my todos list with every todo except for the one that I deleted (filter array operator)
    this.todos = this.todos.filter(t => t.id !== todo.id)
    // sending a request via todo.service.ts to the server to delete the task, and there is no need to return anything
    this.todoService.deleteTodo(todo).subscribe();
  }

  // we subscribe to an Observable which will return with the newly created todo, which we then push to out todos array
  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      console.log("todos.component.ts addTodo is fired");
      this.todos.push(todo);
    });
  }
}

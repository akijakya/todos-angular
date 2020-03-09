import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // set classes dinamically
  // this will add two classes to each todo: todo, and is-complete which are also present in the css file.
  // the value (true or false) for 'is-complete' gets read out from the data passed with the todo (todo.completed)
  setClasses () {
    let classes = {
      'todo':         true,
      'is-complete':  this.todo.completed
    }
    return classes;
  }

  onToggle(todo) {
    // toggling the checkbox on the UI
    // this will revert (!) the current value (true or false) for the todo item itself
    todo.completed = !todo.completed;
    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));
  }

  // deleting a todo
  // when the delete button is clicked, we send off an event in the todo-item component, however
  // emitting up "deleteTodo" - we are setting it as @Output, and we are catching it in the todos.component.html 
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}

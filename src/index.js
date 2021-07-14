import { TodoList, Todo } from './classes'
import { crearTodoHTML } from './js/componentes';
import './styles.css'

export const todoList = new TodoList();

const tarea = new Todo('Aprender JavaScrit!!');

todoList.todos.forEach(todo => crearTodoHTML(todo));



console.log('todos', todoList.todos);
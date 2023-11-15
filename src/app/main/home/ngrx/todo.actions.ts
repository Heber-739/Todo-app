import { createAction, props } from "@ngrx/store";
import { Todo } from "../interface/todo.interface";




export const initializate = createAction(
  '[Todo[]] initializate',
  props<{todos:Todo[]}>()
);

export const createTodo = createAction(
  '[Todo] createTodo',
  props<{todo:Todo}>()
);

export const updateTodo = createAction(
  '[Todo] updateTodo',
  props<{todo:Todo}>()
);

export const deleteTodo = createAction(
  '[Todo] deleteTodo',
  props<{uid:string}>()
);

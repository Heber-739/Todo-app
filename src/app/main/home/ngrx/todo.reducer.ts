import { createReducer, on } from '@ngrx/store';
import { createTodo, deleteTodo, filterByStatus, initializate, updateTodo } from './todo.actions';
import { Todo } from '../interface/todo.interface';

export const initialState:Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(initializate, (state, {todos}) => [...state,...todos]),
  on(createTodo, (state, {todo}) => [todo,...state]),
  on(updateTodo, (state, {todo}) => state.map((t)=> todo.uid === t.uid ? todo : t)),
  on(deleteTodo, (state, {uid}) => state.filter((t)=> t.uid !== uid)),
);

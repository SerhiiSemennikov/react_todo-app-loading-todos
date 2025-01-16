import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2256;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = () => {
  return client.delete(`/todos?userId=${USER_ID}`);
};


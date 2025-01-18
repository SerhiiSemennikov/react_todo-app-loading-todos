import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (todoId: number) => void;
  //loadingTodos: number[];
  isTodoLoading: boolean;
  isTodoDeleting: boolean;
};

export const TodoList: React.FC<Props> = props => {
  const { todos, onDelete, isTodoLoading, isTodoDeleting } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          //isLoading={loadingTodos.includes(todo.id)}
          isTodoLoading={isTodoLoading}
          isTodoDeleting={isTodoDeleting}
        />
      ))}
      {/*{tempTodo && (
        <TodoItem
          todo={tempTodo}
          onDelete={() => {}}
          isLoading={loadingTodos.includes(tempTodo.id)}
        />
      )}*/}
    </section>
  );
};

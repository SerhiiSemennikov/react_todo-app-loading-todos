import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';


type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = props => {
  const { todos } = props;

  const allTodoCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">

      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: allTodoCompleted })}
        data-cy="ToggleAllButton"
      />

     
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};

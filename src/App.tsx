/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, deleteTodo, USER_ID } from './api/todos';
import { getTodos } from './api/todos';
//import classNames from 'classnames';
import { Filter } from './types/FilterType';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredField, setFilteredField] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.Default,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  //const [loadingTodos, setLoadingTodos] = useState<number[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const completedTodos = todos.filter(todo => todo.completed);
  const [isTodoDeleting, setIsTodoDeleting] = useState(false);
  const onAdd = async (title: string) => {
    setTempTodo({
      id: 0,
      title,
      userId: USER_ID,
      completed: false,
    });

    const newTodo: Omit<Todo, 'id'> = {
      title,
      userId: USER_ID,
      completed: false,
    };

    try {
      try {
        const todo = await createTodo(newTodo);

        return setTodos(currentTodos => [...currentTodos, todo]);
      } catch (err) {
        setErrorMessage(ErrorMessage.UnableToAdd);
        throw err;
      }
    } finally {
      return setTempTodo(null);
    }
  };

  const onDelete = (todoId: number) => {
    //setLoadingTodos(prevTodos => [...prevTodos, todoId]);
    setIsTodoDeleting(true);
    deleteTodo(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToDelete);
      })
      .finally(() => setIsTodoDeleting(false));
    //.finally(() =>
    //  setLoadingTodos(prevTodos => prevTodos.filter(id => todoId !== id)),
    //);
  };

  const onDeleteAllCompleted = () => {
    completedTodos.forEach(todo => onDelete(todo.id));
  };

  useEffect(() => {
    setIsTodoLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoad);
        setTimeout(() => {
          setErrorMessage(errorMessage);
        }, 100);
      })
      .finally(() => setIsTodoLoading(false));
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filteredField) {
      case Filter.Completed:
        return todo.completed;
      case Filter.Active:
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          todos={todos}
          onAdd={onAdd}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          inputRef={inputRef}
          isInputDisabled={!!tempTodo}
          isTodoLoading={isTodoLoading}
        />
        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              tempTodo={tempTodo}
              onDelete={onDelete}
              isTodoLoading={isTodoLoading}
              isTodoDeleting={isTodoDeleting}
            />
            <Footer
              filterField={filteredField}
              setFilteredField={setFilteredField}
              todos={todos}
              onDeleteAllCompleted={onDeleteAllCompleted}
            />
            {errorMessage && (
              <ErrorNotification
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

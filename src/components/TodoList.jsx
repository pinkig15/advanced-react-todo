import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';

function TodoList({ todos, updateTodo, deleteTodo, reorderTodos }) {
  // Called when drag ends
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside list
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ul
            className="space-y-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white dark:bg-gray-800 rounded p-3 shadow flex items-center justify-between
                    ${snapshot.isDragging ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                  >
                    <TodoItem
                      todo={todo}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;

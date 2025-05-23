import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Save edits on blur or Enter key
  const saveEdit = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== todo.text) {
      updateTodo(todo.id, { text: trimmed });
    } else {
      setText(todo.text); // revert if empty
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      layout
      className="flex items-center w-full"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        className="mr-3 w-5 h-5 cursor-pointer"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveEdit();
            } else if (e.key === 'Escape') {
              setText(todo.text);
              setIsEditing(false);
            }
          }}
          className="flex-grow border-b border-indigo-500 bg-transparent focus:outline-none text-gray-900 dark:text-white"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-grow select-none cursor-text ${
            todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
          }`}
          title="Double click to edit"
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete todo"
        className="ml-3 p-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
      >
        <XMarkIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
      </button>
    </motion.div>
  );
}

export default TodoItem;

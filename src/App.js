import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';
import { AnimatePresence, motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import BackupRestore from './components/BackupRestore';
import './index.css';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;


  // Add new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  // Update fields (edit, complete)
  const updateTodo = (id, fields) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, ...fields } : todo
    )));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Reorder todo list (DnD)
  const reorderTodos = (start, end) => {
    const copy = [...todos];
    const [moved] = copy.splice(start, 1);
    copy.splice(end, 0, moved);
    setTodos(copy);
  };

  // Filter logic
  const filteredTodos = todos
  .filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  })
  .filter((todo) =>
    todo.text.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-colors duration-300">
      <BackupRestore todos={todos} setTodos={setTodos} />

      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search todos..."
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 Advanced To-Do App</h1>
          <ThemeToggle />
        </header>

        <input
          type="text"
          className="w-full border rounded p-2 mb-4 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Add a task and press Enter..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              addTodo(e.target.value.trim());
              e.target.value = '';
            }
          }}
        />

        <Filters filter={filter} setFilter={setFilter} />

        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-200 flex justify-between">
          <span>Total: {totalCount}</span>
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
        </div>
              
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TodoList
              todos={filteredTodos}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              reorderTodos={reorderTodos}
            />
          </motion.div>
        </AnimatePresence>

        {todos.some(todo => todo.completed) && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-semibold"
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

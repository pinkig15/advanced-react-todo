import React from 'react';

const BackupRestore = ({ todos, setTodos }) => {
  // Export todos as JSON file
  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos_backup.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  // Import todos from JSON file
  const importTodos = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTodos = JSON.parse(event.target.result);
        if (Array.isArray(importedTodos)) {
          setTodos(importedTodos);
        } else {
          alert('Invalid file format.');
        }
      } catch {
        alert('Failed to read file.');
      }
    };
    reader.readAsText(file);
    e.target.value = null; // Reset file input
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={exportTodos}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export Todos
      </button>

      <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Import Todos
        <input
          type="file"
          accept="application/json"
          onChange={importTodos}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default BackupRestore;

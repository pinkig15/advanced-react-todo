import React from 'react';
import classNames from 'classnames';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

function Filters({ filter, setFilter }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={classNames(
            'px-3 py-1 rounded-md font-semibold',
            filter === key
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filters;

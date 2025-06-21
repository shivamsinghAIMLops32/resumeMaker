import React from 'react';
import { motion } from 'framer-motion';
import useResumeStore, { ResumeLayout } from '../../store/useResumeStore';

const LayoutSelector: React.FC = () => {
  const { layout, setLayout, accentColor, setAccentColor, backgroundColor, setBackgroundColor } = useResumeStore();

  const layouts: { id: ResumeLayout; name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' }
  ];

  const colors = [
    { id: 'indigo', value: '#4f46e5', name: 'Indigo' },
    { id: 'blue', value: '#0284c7', name: 'Blue' },
    { id: 'red', value: '#dc2626', name: 'Red' },
    { id: 'green', value: '#16a34a', name: 'Green' },
    { id: 'purple', value: '#9333ea', name: 'Purple' },
    { id: 'pink', value: '#db2777', name: 'Pink' },
    { id: 'amber', value: '#d97706', name: 'Amber' },
    { id: 'teal', value: '#0d9488', name: 'Teal' },
    { id: 'orange', value: '#ea580c', name: 'Orange' },
    { id: 'emerald', value: '#059669', name: 'Emerald' }
  ];

  const backgrounds = [
    { value: '#ffffff', name: 'White' },
    { value: '#f8fafc', name: 'Light Gray' },
    { value: '#f0f9ff', name: 'Light Blue' },
    { value: '#fdf2f8', name: 'Light Pink' },
    { value: '#f0fdf4', name: 'Light Green' },
    { value: '#fdf4ff', name: 'Light Purple' },
    { value: '#fffbeb', name: 'Light Amber' },
    { value: '#f0fdfa', name: 'Light Teal' },
    { value: '#fef2f2', name: 'Light Red' },
    { value: '#f5f3ff', name: 'Light Violet' }
  ];

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-6">
        <label className="form-label text-gray-700 dark:text-gray-300">Choose Template</label>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map(({ id, name }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-3 rounded-md border cursor-pointer text-center transition-all duration-200
                ${layout === id 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md' 
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}
              `}
              onClick={() => setLayout(id)}
            >
              <div className="text-sm font-medium">{name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="form-label text-gray-700 dark:text-gray-300">Accent Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map(({ id, value, name }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 dark:border-gray-600 transition-all duration-200
                ${accentColor === value ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-700 dark:ring-gray-300 scale-110' : 'hover:scale-105'}
              `}
              style={{ backgroundColor: value }}
              onClick={() => setAccentColor(value)}
              title={name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="form-label text-gray-700 dark:text-gray-300">Background Color</label>
        <div className="flex flex-wrap gap-2">
          {backgrounds.map(({ value, name }) => (
            <motion.div
              key={value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600 transition-all duration-200
                ${backgroundColor === value ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-700 dark:ring-gray-300 scale-110' : 'hover:scale-105'}
              `}
              style={{ backgroundColor: value }}
              onClick={() => setBackgroundColor(value)}
              title={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
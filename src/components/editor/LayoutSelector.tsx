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
    { id: 'teal', value: '#0d9488', name: 'Teal' }
  ];

  const backgrounds = [
    { value: '#ffffff', name: 'White' },
    { value: '#f8fafc', name: 'Light Gray' },
    { value: '#f0f9ff', name: 'Light Blue' },
    { value: '#fdf2f8', name: 'Light Pink' },
    { value: '#f0fdf4', name: 'Light Green' },
    { value: '#fdf4ff', name: 'Light Purple' }
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="form-label">Choose Template</label>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map(({ id, name }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-2 rounded-md border cursor-pointer text-center
                ${layout === id 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
              `}
              onClick={() => setLayout(id)}
            >
              <div className="text-sm font-medium">{name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Accent Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map(({ id, value, name }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-8 h-8 rounded-full cursor-pointer
                ${accentColor === value ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-700' : ''}
              `}
              style={{ backgroundColor: value }}
              onClick={() => setAccentColor(value)}
              title={name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="form-label">Background Color</label>
        <div className="flex flex-wrap gap-2">
          {backgrounds.map(({ value, name }) => (
            <motion.div
              key={value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-8 h-8 rounded-full cursor-pointer border border-gray-200
                ${backgroundColor === value ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-700' : ''}
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
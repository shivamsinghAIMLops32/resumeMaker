import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import useResumeStore, { Course } from '../../../store/useResumeStore';

const CoursesForm: React.FC = () => {
  const { courses, addCourse, updateCourse, removeCourse } = useResumeStore();
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) return;
    
    if (editMode && editId) {
      updateCourse(editId, { name, provider, date, description });
      setEditMode(false);
      setEditId(null);
    } else {
      addCourse({ name, provider, date, description });
    }
    
    // Reset form
    setName('');
    setProvider('');
    setDate('');
    setDescription('');
  };
  
  const handleEdit = (course: Course) => {
    setName(course.name);
    setProvider(course.provider);
    setDate(course.date);
    setDescription(course.description);
    setEditMode(true);
    setEditId(course.id);
  };
  
  const handleCancel = () => {
    setName('');
    setProvider('');
    setDate('');
    setDescription('');
    setEditMode(false);
    setEditId(null);
  };
  
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">Courses & Learning</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Course Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Machine Learning"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="provider" className="form-label">Provider</label>
            <input
              type="text"
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="form-input"
              placeholder="Coursera / Stanford University"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date" className="form-label">Completion Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group mb-4">
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Brief description of what you learned"
            rows={2}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {editMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            {editMode ? 'Update' : 'Add'} Course
          </button>
        </div>
      </form>
      
      {courses.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2">Your Courses:</h4>
          <div className="space-y-2">
            <AnimatePresence>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {course.provider}
                      {course.date && ` • ${new Date(course.date).toLocaleDateString()}`}
                    </div>
                    {course.description && (
                      <div className="text-sm mt-1">{course.description}</div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                      title="Edit Course"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CoursesForm;
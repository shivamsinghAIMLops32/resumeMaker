import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import useResumeStore, { Achievement } from '../../../store/useResumeStore';

const AchievementsForm: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, removeAchievement } = useResumeStore();
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) return;
    
    if (editMode && editId) {
      updateAchievement(editId, { title, date, description });
      setEditMode(false);
      setEditId(null);
    } else {
      addAchievement({ title, date, description });
    }
    
    // Reset form
    setTitle('');
    setDate('');
    setDescription('');
  };
  
  const handleEdit = (achievement: Achievement) => {
    setTitle(achievement.title);
    setDate(achievement.date);
    setDescription(achievement.description);
    setEditMode(true);
    setEditId(achievement.id);
  };
  
  const handleCancel = () => {
    setTitle('');
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
      <h3 className="text-lg font-medium mb-4">Achievements & Certifications</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Achievement / Certification Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="AWS Certified Solutions Architect"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
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
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Brief description of the achievement or certification"
            rows={3}
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
            {editMode ? 'Update' : 'Add'} Achievement
          </button>
        </div>
      </form>
      
      {achievements.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2">Your Achievements:</h4>
          <div className="space-y-2">
            <AnimatePresence>
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    {achievement.date && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    )}
                    {achievement.description && (
                      <div className="text-sm mt-1">{achievement.description}</div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                      title="Edit Achievement"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => removeAchievement(achievement.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Delete Achievement"
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

export default AchievementsForm;
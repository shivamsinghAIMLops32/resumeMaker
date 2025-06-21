import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Star } from 'lucide-react';
import useResumeStore from '../../../store/useResumeStore';

const SkillsForm: React.FC = () => {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [name, setName] = useState('');
  const [level, setLevel] = useState(3);
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    
    addSkill(name.trim(), level, category || undefined);
    setName('');
    setLevel(3);
    setCategory('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const categories = [
    { value: '', label: 'No Category' },
    { value: 'Programming Languages', label: 'Programming Languages' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Database', label: 'Database' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'Design', label: 'Design' },
    { value: 'Soft Skills', label: 'Soft Skills' },
    { value: 'Tools', label: 'Tools' },
    { value: 'Other', label: 'Other' }
  ];

  const skillsByCategory = skills.reduce((acc: Record<string, typeof skills>, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Skills</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="form-group">
          <label className="form-label">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="e.g., React.js, Python, Leadership"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Proficiency Level</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={`cursor-pointer transition-colors ${
                    star <= level 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-gray-300 dark:text-gray-600 hover:text-amber-300'
                  }`}
                  onClick={() => setLevel(star)}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {level === 1 && 'Beginner'}
                {level === 2 && 'Basic'}
                {level === 3 && 'Intermediate'}
                {level === 4 && 'Advanced'}
                {level === 5 && 'Expert'}
              </span>
            </div>
            <button
              onClick={handleAdd}
              className="btn btn-primary flex items-center"
              title="Add Skill"
            >
              <Plus size={16} className="mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-800 dark:text-gray-200">Your Skills:</h4>
        <AnimatePresence>
          {Object.keys(skillsByCategory).length > 0 ? (
            Object.entries(skillsByCategory).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-1">
                  {category}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.div 
                      key={skill.id}
                      className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                      <div className="flex items-center mx-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={`${
                              star <= skill.level 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Remove Skill"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              No skills added yet. Add your first skill above.
            </p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SkillsForm;
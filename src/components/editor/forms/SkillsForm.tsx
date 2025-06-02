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
    if (!name) return;
    
    addSkill(name, level, category || undefined);
    setName('');
    setLevel(3);
    setCategory('');
  };

  const categories = [
    { value: '', label: 'None' },
    { value: 'programming', label: 'Programming Languages' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' },
    { value: 'database', label: 'Database' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'design', label: 'Design' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'other', label: 'Other' }
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
      
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="col-span-5">
          <label className="form-label">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="e.g., React.js"
          />
        </div>
        
        <div className="col-span-3">
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
        
        <div className="col-span-4">
          <label className="form-label">Proficiency</label>
          <div className="flex">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-l-md px-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`cursor-pointer transition-colors ${
                    star <= level 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  onClick={() => setLevel(star)}
                />
              ))}
            </div>
            <button
              onClick={handleAdd}
              className="btn btn-primary rounded-l-none"
              title="Add Skill"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Your Skills:</h4>
        <AnimatePresence>
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{category}</h5>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.div 
                    key={skill.id}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <span className="text-sm text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <div className="flex items-center mx-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={10}
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
                      className="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Remove Skill"
                    >
                      <Trash2 size={12} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No skills added yet. Add your first skill above.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsForm;
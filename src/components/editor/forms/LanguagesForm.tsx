import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import useResumeStore, { Language } from '../../../store/useResumeStore';

const LanguagesForm: React.FC = () => {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore();
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState<'beginner' | 'intermediate' | 'advanced' | 'fluent' | 'native'>('intermediate');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) return;
    
    if (editMode && editId) {
      updateLanguage(editId, { name, proficiency });
      setEditMode(false);
      setEditId(null);
    } else {
      addLanguage({ name, proficiency });
    }
    
    // Reset form
    setName('');
    setProficiency('intermediate');
  };
  
  const handleEdit = (language: Language) => {
    setName(language.name);
    setProficiency(language.proficiency);
    setEditMode(true);
    setEditId(language.id);
  };
  
  const handleCancel = () => {
    setName('');
    setProficiency('intermediate');
    setEditMode(false);
    setEditId(null);
  };
  
  const proficiencyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' }
  ];
  
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">Languages</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Language</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="English, Spanish, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="proficiency" className="form-label">Proficiency</label>
            <select
              id="proficiency"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value as any)}
              className="form-select"
            >
              {proficiencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
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
            {editMode ? 'Update' : 'Add'} Language
          </button>
        </div>
      </form>
      
      {languages.length > 0 ? (
        <div>
          <h4 className="text-md font-medium mb-2">Your Languages:</h4>
          <div className="space-y-2">
            <AnimatePresence>
              {languages.map((language) => (
                <motion.div
                  key={language.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div>
                    <span className="font-medium">{language.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      ({language.proficiency})
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(language)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                      title="Edit Language"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => removeLanguage(language.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Delete Language"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No languages added yet. Add your first language above.
        </p>
      )}
    </motion.div>
  );
};

export default LanguagesForm;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useResumeStore from '../../../store/useResumeStore';

const HobbiesForm: React.FC = () => {
  const [hobbies, setHobbies] = useState<string>('');
  const { about, updateAbout } = useResumeStore();
  
  // In a real app, we'd have a dedicated hobbies field in the store
  // For simplicity, we're using the about field to store hobbies
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(hobbies); // In a real app, we'd have a separate action for hobbies
  };
  
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">Hobbies & Interests</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="hobbies" className="form-label">List your hobbies and interests</label>
          <textarea
            id="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="form-textarea"
            placeholder="Photography, Hiking, Playing Piano, Open Source Contributing, etc."
            rows={4}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Include hobbies that show your personality and transferable skills.
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Why include hobbies?</h4>
          <ul className="text-xs text-blue-600 dark:text-blue-400 list-disc list-inside space-y-1">
            <li>Shows personality beyond technical skills</li>
            <li>Can be conversation starters in interviews</li>
            <li>Demonstrates balance and well-roundedness</li>
            <li>May highlight relevant soft skills</li>
          </ul>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Hobbies
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default HobbiesForm;
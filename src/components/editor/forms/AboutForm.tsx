import React from 'react';
import { motion } from 'framer-motion';
import useResumeStore from '../../../store/useResumeStore';

const AboutForm: React.FC = () => {
  const { about, updateAbout } = useResumeStore();

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">About / Professional Summary</h3>
      
      <div className="form-group">
        <label htmlFor="about" className="form-label">Briefly describe yourself and your career objectives</label>
        <textarea
          id="about"
          value={about}
          onChange={(e) => updateAbout(e.target.value)}
          className="form-textarea h-32"
          placeholder="Experienced software engineer with a passion for creating efficient, scalable applications..."
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Recommended: 2-4 sentences that highlight your expertise and career goals.
        </p>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Writing Tips:</h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
          <li>Focus on your key strengths and unique qualities</li>
          <li>Include your years of experience and specializations</li>
          <li>Mention specific industries or domains you've worked in</li>
          <li>Align with the job you're applying for</li>
          <li>Keep it concise and impactful</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AboutForm;
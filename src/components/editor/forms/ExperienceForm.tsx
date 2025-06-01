import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import useResumeStore, { Experience } from '../../../store/useResumeStore';

const ExperienceForm: React.FC = () => {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentExperience, setCurrentExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
    responsibilities: [],
    techUsed: []
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience({ ...currentExperience, [name]: value });
  };
  
  const handleResponsibilitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const responsibilities = e.target.value.split('\n').filter(r => r.trim() !== '');
    setCurrentExperience({ ...currentExperience, responsibilities });
  };
  
  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map(tech => tech.trim());
    setCurrentExperience({ ...currentExperience, techUsed: techs });
  };
  
  const handleSubmit = () => {
    if (!currentExperience.company || !currentExperience.role) return;
    
    if (editMode && expanded) {
      updateExperience(expanded, currentExperience);
      setEditMode(false);
    } else {
      addExperience(currentExperience);
    }
    
    setCurrentExperience({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: [],
      techUsed: []
    });
    setExpanded(null);
  };
  
  const handleEdit = (exp: Experience) => {
    setCurrentExperience({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      responsibilities: exp.responsibilities,
      techUsed: exp.techUsed
    });
    setEditMode(true);
    setExpanded(exp.id);
  };
  
  const handleCancel = () => {
    setCurrentExperience({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: [],
      techUsed: []
    });
    setEditMode(false);
    setExpanded(null);
  };
  
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <button
          onClick={() => setExpanded(expanded ? null : 'new')}
          className="btn btn-primary text-sm"
        >
          {expanded === 'new' ? 'Cancel' : 'Add Experience'}
        </button>
      </div>
      
      <AnimatePresence>
        {expanded === 'new' && !editMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={currentExperience.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Google"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Role / Position</label>
                  <input
                    type="text"
                    name="role"
                    value={currentExperience.role}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Senior Software Engineer"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={currentExperience.startDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={currentExperience.endDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={currentExperience.location}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Mountain View, CA"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    value={currentExperience.techUsed.join(', ')}
                    onChange={handleTechChange}
                    className="form-input"
                    placeholder="React, Node.js, AWS"
                  />
                </div>
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">Responsibilities (one per line)</label>
                <textarea
                  value={currentExperience.responsibilities.join('\n')}
                  onChange={handleResponsibilitiesChange}
                  className="form-textarea h-32"
                  placeholder="Led a team of 5 developers to deliver a new feature
Reduced loading time by 40% through code optimization
Collaborated with UX team to improve user experience"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use bullet points. Start each with an action verb. Quantify achievements when possible.
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Save Experience
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {experience.length > 0 ? (
        <div className="space-y-2">
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              className="border border-gray-200 dark:border-gray-700 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => !editMode && setExpanded(expanded === exp.id ? null : exp.id)}
              >
                <div>
                  <h4 className="font-medium">{exp.company}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{exp.role}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!editMode && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(exp);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Edit Experience"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExperience(exp.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Experience"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  {!editMode && (
                    expanded === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expanded === exp.id && !editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        {exp.startDate && (
                          <div>
                            <span className="font-medium">Period: </span>
                            {new Date(exp.startDate).toLocaleDateString()} - 
                            {exp.endDate 
                              ? new Date(exp.endDate).toLocaleDateString()
                              : 'Present'
                            }
                          </div>
                        )}
                        
                        {exp.location && (
                          <div>
                            <span className="font-medium">Location: </span>
                            {exp.location}
                          </div>
                        )}
                      </div>
                      
                      {exp.responsibilities.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-sm">Responsibilities:</span>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.responsibilities.map((responsibility, index) => (
                              <li key={index} className="text-sm">{responsibility}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {exp.techUsed.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-sm">Technologies: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {exp.techUsed.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {expanded === exp.id && editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label className="form-label">Company / Organization</label>
                          <input
                            type="text"
                            name="company"
                            value={currentExperience.company}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Role / Position</label>
                          <input
                            type="text"
                            name="role"
                            value={currentExperience.role}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={currentExperience.startDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={currentExperience.endDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={currentExperience.location}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Technologies Used</label>
                          <input
                            type="text"
                            value={currentExperience.techUsed.join(', ')}
                            onChange={handleTechChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group mb-4">
                        <label className="form-label">Responsibilities (one per line)</label>
                        <textarea
                          value={currentExperience.responsibilities.join('\n')}
                          onChange={handleResponsibilitiesChange}
                          className="form-textarea h-32"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleCancel}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary"
                        >
                          Update Experience
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No work experience entries added yet. Click the "Add Experience" button to add your work history.
        </p>
      )}
    </motion.div>
  );
};

export default ExperienceForm;
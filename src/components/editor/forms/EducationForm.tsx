import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import useResumeStore, { Education } from '../../../store/useResumeStore';

const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEducation, setCurrentEducation] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    location: '',
    gpa: '',
    coursework: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEducation({ ...currentEducation, [name]: value });
  };
  
  const handleSubmit = () => {
    if (!currentEducation.institution || !currentEducation.degree) return;
    
    if (editMode && expanded) {
      updateEducation(expanded, currentEducation);
      setEditMode(false);
    } else {
      addEducation(currentEducation);
    }
    
    setCurrentEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
      coursework: ''
    });
    setExpanded(null);
  };
  
  const handleEdit = (edu: Education) => {
    setCurrentEducation({
      institution: edu.institution,
      degree: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate,
      location: edu.location,
      gpa: edu.gpa,
      coursework: edu.coursework
    });
    setEditMode(true);
    setExpanded(edu.id);
  };
  
  const handleCancel = () => {
    setCurrentEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
      coursework: ''
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
        <h3 className="text-lg font-medium">Education</h3>
        <button
          onClick={() => setExpanded(expanded ? null : 'new')}
          className="btn btn-primary text-sm"
        >
          {expanded === 'new' ? 'Cancel' : 'Add Education'}
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
                  <label className="form-label">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={currentEducation.institution}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Stanford University"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Degree / Program</label>
                  <input
                    type="text"
                    name="degree"
                    value={currentEducation.degree}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="B.S. Computer Science"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={currentEducation.startDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={currentEducation.endDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={currentEducation.location}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Stanford, CA"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">GPA</label>
                  <input
                    type="text"
                    name="gpa"
                    value={currentEducation.gpa}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">Relevant Coursework</label>
                <textarea
                  name="coursework"
                  value={currentEducation.coursework}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Data Structures, Algorithms, Machine Learning, ..."
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
                  Save Education
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {education.length > 0 ? (
        <div className="space-y-2">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              className="border border-gray-200 dark:border-gray-700 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => !editMode && setExpanded(expanded === edu.id ? null : edu.id)}
              >
                <div>
                  <h4 className="font-medium">{edu.institution}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!editMode && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(edu);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Edit Education"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEducation(edu.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Education"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  {!editMode && (
                    expanded === edu.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expanded === edu.id && !editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {edu.startDate && (
                          <div>
                            <span className="font-medium">Period: </span>
                            {new Date(edu.startDate).toLocaleDateString()} - 
                            {edu.endDate 
                              ? new Date(edu.endDate).toLocaleDateString()
                              : 'Present'
                            }
                          </div>
                        )}
                        
                        {edu.location && (
                          <div>
                            <span className="font-medium">Location: </span>
                            {edu.location}
                          </div>
                        )}
                        
                        {edu.gpa && (
                          <div>
                            <span className="font-medium">GPA: </span>
                            {edu.gpa}
                          </div>
                        )}
                      </div>
                      
                      {edu.coursework && (
                        <div className="mt-2">
                          <span className="font-medium text-sm">Relevant Coursework: </span>
                          <p className="text-sm mt-1">{edu.coursework}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {expanded === edu.id && editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label className="form-label">Institution</label>
                          <input
                            type="text"
                            name="institution"
                            value={currentEducation.institution}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Degree / Program</label>
                          <input
                            type="text"
                            name="degree"
                            value={currentEducation.degree}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={currentEducation.startDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={currentEducation.endDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={currentEducation.location}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">GPA</label>
                          <input
                            type="text"
                            name="gpa"
                            value={currentEducation.gpa}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group mb-4">
                        <label className="form-label">Relevant Coursework</label>
                        <textarea
                          name="coursework"
                          value={currentEducation.coursework}
                          onChange={handleInputChange}
                          className="form-textarea"
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
                          Update Education
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
          No education entries added yet. Click the "Add Education" button to add your educational history.
        </p>
      )}
    </motion.div>
  );
};

export default EducationForm;
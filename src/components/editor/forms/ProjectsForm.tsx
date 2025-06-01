import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import useResumeStore, { Project } from '../../../store/useResumeStore';

const ProjectsForm: React.FC = () => {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    techUsed: [],
    githubUrl: '',
    demoUrl: '',
    image: '',
    startDate: '',
    endDate: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };
  
  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map(tech => tech.trim());
    setCurrentProject({ ...currentProject, techUsed: techs });
  };
  
  const handleSubmit = () => {
    if (!currentProject.title) return;
    
    if (editMode && expanded) {
      updateProject(expanded, currentProject);
      setEditMode(false);
    } else {
      addProject(currentProject);
    }
    
    setCurrentProject({
      title: '',
      description: '',
      techUsed: [],
      githubUrl: '',
      demoUrl: '',
      image: '',
      startDate: '',
      endDate: ''
    });
    setExpanded(null);
  };
  
  const handleEdit = (project: Project) => {
    setCurrentProject({
      title: project.title,
      description: project.description,
      techUsed: project.techUsed,
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      image: project.image,
      startDate: project.startDate,
      endDate: project.endDate
    });
    setEditMode(true);
    setExpanded(project.id);
  };
  
  const handleCancel = () => {
    setCurrentProject({
      title: '',
      description: '',
      techUsed: [],
      githubUrl: '',
      demoUrl: '',
      image: '',
      startDate: '',
      endDate: ''
    });
    setEditMode(false);
    setExpanded(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Image size should be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCurrentProject({ ...currentProject, image: result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setCurrentProject({ ...currentProject, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Projects</h3>
        <button
          onClick={() => setExpanded(expanded ? null : 'new')}
          className="btn btn-primary text-sm"
        >
          {expanded === 'new' ? 'Cancel' : 'Add Project'}
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
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentProject.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Portfolio Website"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    value={currentProject.techUsed.join(', ')}
                    onChange={handleTechChange}
                    className="form-input"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={currentProject.startDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={currentProject.endDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={currentProject.githubUrl}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Demo URL</label>
                  <input
                    type="url"
                    name="demoUrl"
                    value={currentProject.demoUrl}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://myproject.com"
                  />
                </div>
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={currentProject.description}
                  onChange={handleInputChange}
                  className="form-textarea h-24"
                  placeholder="Describe your project, its features, and your role in it..."
                />
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">Project Image</label>
                <div className="flex items-center space-x-4">
                  {currentProject.image ? (
                    <div className="relative w-16 h-16">
                      <img 
                        src={currentProject.image} 
                        alt="Project"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <button
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={removeImage}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <Upload size={20} className="text-gray-400" />
                    </div>
                  )}
                  
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-secondary text-xs"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
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
                  Save Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {projects.length > 0 ? (
        <div className="space-y-2">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => !editMode && setExpanded(expanded === project.id ? null : project.id)}
              >
                <div className="flex items-center">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-8 h-8 object-cover rounded-md mr-3"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    {project.techUsed.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.techUsed.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!editMode && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(project);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Edit Project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(project.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  {!editMode && (
                    expanded === project.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expanded === project.id && !editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <p className="text-sm mb-2">{project.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
                        {project.startDate && (
                          <div>
                            <span className="font-medium">Duration: </span>
                            {new Date(project.startDate).toLocaleDateString()} - 
                            {project.endDate 
                              ? new Date(project.endDate).toLocaleDateString()
                              : 'Present'
                            }
                          </div>
                        )}
                        
                        {project.githubUrl && (
                          <div>
                            <span className="font-medium">GitHub: </span>
                            <a 
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Code
                            </a>
                          </div>
                        )}
                        
                        {project.demoUrl && (
                          <div>
                            <span className="font-medium">Demo: </span>
                            <a 
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Demo
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {expanded === project.id && editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label className="form-label">Project Title</label>
                          <input
                            type="text"
                            name="title"
                            value={currentProject.title}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Technologies Used</label>
                          <input
                            type="text"
                            value={currentProject.techUsed.join(', ')}
                            onChange={handleTechChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={currentProject.startDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={currentProject.endDate}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">GitHub URL</label>
                          <input
                            type="url"
                            name="githubUrl"
                            value={currentProject.githubUrl}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Demo URL</label>
                          <input
                            type="url"
                            name="demoUrl"
                            value={currentProject.demoUrl}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          name="description"
                          value={currentProject.description}
                          onChange={handleInputChange}
                          className="form-textarea h-24"
                        />
                      </div>
                      
                      <div className="form-group mb-4">
                        <label className="form-label">Project Image</label>
                        <div className="flex items-center space-x-4">
                          {currentProject.image ? (
                            <div className="relative w-16 h-16">
                              <img 
                                src={currentProject.image} 
                                alt="Project"
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <button
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                                onClick={removeImage}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <Upload size={20} className="text-gray-400" />
                            </div>
                          )}
                          
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="btn btn-secondary text-xs"
                            >
                              Upload Image
                            </button>
                          </div>
                        </div>
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
                          Update Project
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
          No projects added yet. Click the "Add Project" button to add your first project.
        </p>
      )}
    </motion.div>
  );
};

export default ProjectsForm;
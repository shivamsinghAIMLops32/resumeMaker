import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import useResumeStore, { Publication } from '../../../store/useResumeStore';

const PublicationsForm: React.FC = () => {
  const { publications, addPublication, updatePublication, removePublication } = useResumeStore();
  
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentPublication, setCurrentPublication] = useState<Omit<Publication, 'id'>>({
    title: '',
    authors: '',
    journal: '',
    date: '',
    url: '',
    description: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPublication({ ...currentPublication, [name]: value });
  };
  
  const handleSubmit = () => {
    if (!currentPublication.title) return;
    
    if (editMode && expanded) {
      updatePublication(expanded, currentPublication);
      setEditMode(false);
    } else {
      addPublication(currentPublication);
    }
    
    setCurrentPublication({
      title: '',
      authors: '',
      journal: '',
      date: '',
      url: '',
      description: ''
    });
    setExpanded(null);
  };
  
  const handleEdit = (publication: Publication) => {
    setCurrentPublication({
      title: publication.title,
      authors: publication.authors,
      journal: publication.journal,
      date: publication.date,
      url: publication.url,
      description: publication.description
    });
    setEditMode(true);
    setExpanded(publication.id);
  };
  
  const handleCancel = () => {
    setCurrentPublication({
      title: '',
      authors: '',
      journal: '',
      date: '',
      url: '',
      description: ''
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
        <h3 className="text-lg font-medium">Publications & Research</h3>
        <button
          onClick={() => setExpanded(expanded ? null : 'new')}
          className="btn btn-primary text-sm"
        >
          {expanded === 'new' ? 'Cancel' : 'Add Publication'}
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
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPublication.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Publication or Research Paper Title"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Authors</label>
                  <input
                    type="text"
                    name="authors"
                    value={currentPublication.authors}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="J. Smith, A. Johnson, et al."
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Journal / Conference</label>
                  <input
                    type="text"
                    name="journal"
                    value={currentPublication.journal}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Journal Name or Conference"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Publication Date</label>
                  <input
                    type="date"
                    name="date"
                    value={currentPublication.date}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group md:col-span-2">
                  <label className="form-label">URL</label>
                  <input
                    type="url"
                    name="url"
                    value={currentPublication.url}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://journal.com/your-publication"
                  />
                </div>
              </div>
              
              <div className="form-group mb-4">
                <label className="form-label">Abstract / Description</label>
                <textarea
                  name="description"
                  value={currentPublication.description}
                  onChange={handleInputChange}
                  className="form-textarea h-24"
                  placeholder="Brief description or abstract of your publication..."
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
                  Save Publication
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {publications.length > 0 ? (
        <div className="space-y-2">
          {publications.map((publication) => (
            <motion.div
              key={publication.id}
              className="border border-gray-200 dark:border-gray-700 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => !editMode && setExpanded(expanded === publication.id ? null : publication.id)}
              >
                <div>
                  <h4 className="font-medium">{publication.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {publication.journal}
                    {publication.date && ` • ${new Date(publication.date).getFullYear()}`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!editMode && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(publication);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Edit Publication"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePublication(publication.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Publication"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  {!editMode && (
                    expanded === publication.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expanded === publication.id && !editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      {publication.authors && (
                        <div className="mb-2">
                          <span className="font-medium text-sm">Authors: </span>
                          <span className="text-sm">{publication.authors}</span>
                        </div>
                      )}
                      
                      {publication.description && (
                        <div className="mb-2">
                          <p className="text-sm">{publication.description}</p>
                        </div>
                      )}
                      
                      {publication.url && (
                        <div>
                          <a 
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm"
                          >
                            View Publication
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {expanded === publication.id && editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-3"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label className="form-label">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={currentPublication.title}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Authors</label>
                          <input
                            type="text"
                            name="authors"
                            value={currentPublication.authors}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Journal / Conference</label>
                          <input
                            type="text"
                            name="journal"
                            value={currentPublication.journal}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Publication Date</label>
                          <input
                            type="date"
                            name="date"
                            value={currentPublication.date}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group md:col-span-2">
                          <label className="form-label">URL</label>
                          <input
                            type="url"
                            name="url"
                            value={currentPublication.url}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group mb-4">
                        <label className="form-label">Abstract / Description</label>
                        <textarea
                          name="description"
                          value={currentPublication.description}
                          onChange={handleInputChange}
                          className="form-textarea h-24"
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
                          Update Publication
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
          No publications added yet. Click the "Add Publication" button to add your research or publications.
        </p>
      )}
    </motion.div>
  );
};

export default PublicationsForm;
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import useResumeStore from '../../../store/useResumeStore';

const PersonalInfoForm: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(personalInfo.photo || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Image size should be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      updatePersonalInfo({ photo: result });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    updatePersonalInfo({ photo: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
      
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload size={24} className="text-gray-400" />
            )}
          </div>
          
          {photoPreview && (
            <button 
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={removePhoto}
            >
              <X size={14} />
            </button>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-xs text-center w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            Upload Photo
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={personalInfo.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="John Doe"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title" className="form-label">Professional Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={personalInfo.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Software Engineer"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleInputChange}
            className="form-input"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={personalInfo.location}
            onChange={handleInputChange}
            className="form-input"
            placeholder="San Francisco, CA"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website" className="form-label">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={personalInfo.website}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;
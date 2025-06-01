import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Save } from 'lucide-react';
import SectionToggle from './SectionToggle';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SocialLinksForm from './forms/SocialLinksForm';
import AboutForm from './forms/AboutForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import AchievementsForm from './forms/AchievementsForm';
import CoursesForm from './forms/CoursesForm';
import HobbiesForm from './forms/HobbiesForm';
import LanguagesForm from './forms/LanguagesForm';
import PublicationsForm from './forms/PublicationsForm';
import LayoutSelector from './LayoutSelector';
import useResumeStore from '../../store/useResumeStore';

const EditorPane: React.FC = () => {
  const { exportData, importData } = useResumeStore();
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
  
  const handleExport = () => {
    const dataStr = exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'resume-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importData(content);
      } catch (error) {
        console.error('Failed to parse imported file:', error);
        alert('Failed to import resume data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Resume Editor
        </motion.h2>
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            className="btn btn-secondary flex items-center text-xs"
            title="Export Resume Data"
          >
            <Download size={14} className="mr-1" />
            Export
          </button>
          <label className="btn btn-secondary flex items-center text-xs cursor-pointer">
            <Upload size={14} className="mr-1" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <div className="card mb-4">
        <h3 className="text-md font-medium mb-2">Choose Layout</h3>
        <LayoutSelector />
      </div>
      
      <div className="card mb-4">
        <h3 className="text-md font-medium mb-2">Toggle Sections</h3>
        <SectionToggle 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {activeSection === 'personalInfo' && <PersonalInfoForm />}
        {activeSection === 'socialLinks' && <SocialLinksForm />}
        {activeSection === 'about' && <AboutForm />}
        {activeSection === 'skills' && <SkillsForm />}
        {activeSection === 'projects' && <ProjectsForm />}
        {activeSection === 'education' && <EducationForm />}
        {activeSection === 'experience' && <ExperienceForm />}
        {activeSection === 'achievements' && <AchievementsForm />}
        {activeSection === 'courses' && <CoursesForm />}
        {activeSection === 'hobbies' && <HobbiesForm />}
        {activeSection === 'languages' && <LanguagesForm />}
        {activeSection === 'publications' && <PublicationsForm />}
      </div>
    </div>
  );
};

export default EditorPane;
import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Link,
  FileText,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Heart,
  Globe,
  BookMarked,
  Phone
} from 'lucide-react';
import useResumeStore, { ResumeSection } from '../../store/useResumeStore';

interface SectionToggleProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SectionToggle: React.FC<SectionToggleProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const { visibleSections, toggleSection } = useResumeStore();

  const sectionIcons = {
    personalInfo: <User size={16} />,
    socialLinks: <Link size={16} />,
    about: <FileText size={16} />,
    skills: <Code size={16} />,
    projects: <Briefcase size={16} />,
    education: <GraduationCap size={16} />,
    experience: <Briefcase size={16} />,
    achievements: <Award size={16} />,
    courses: <BookOpen size={16} />,
    hobbies: <Heart size={16} />,
    languages: <Globe size={16} />,
    publications: <BookMarked size={16} />,
    contact: <Phone size={16} />
  };

  const sectionNames = {
    personalInfo: 'Personal Info',
    socialLinks: 'Social Links',
    about: 'About/Objective',
    skills: 'Skills',
    projects: 'Projects',
    education: 'Education',
    experience: 'Experience',
    achievements: 'Achievements',
    courses: 'Courses',
    hobbies: 'Hobbies',
    languages: 'Languages',
    publications: 'Publications',
    contact: 'Contact'
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {(Object.keys(visibleSections) as ResumeSection[]).map((section) => (
        <motion.div
          key={section}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center p-2 rounded-md cursor-pointer
            ${activeSection === section 
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
          `}
          onClick={() => setActiveSection(section)}
        >
          <div className="flex items-center flex-1">
            <span className="mr-2">{sectionIcons[section]}</span>
            <span className="text-sm">{sectionNames[section]}</span>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={visibleSections[section]}
                onChange={() => toggleSection(section)}
                className="sr-only peer"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionToggle;
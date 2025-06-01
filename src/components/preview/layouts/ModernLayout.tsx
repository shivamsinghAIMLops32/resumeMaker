import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  Code, 
  ExternalLink
} from 'lucide-react';
import useResumeStore from '../../../store/useResumeStore';

const ModernLayout: React.FC = () => {
  const { 
    personalInfo, 
    socialLinks, 
    about, 
    skills, 
    projects, 
    education, 
    experience, 
    achievements, 
    courses, 
    languages, 
    publications,
    visibleSections,
    accentColor
  } = useResumeStore();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="font-sans text-gray-900 p-8 print:p-6">
      {/* Header */}
      <header style={{ color: accentColor }}>
        <motion.h1 
          className="text-3xl font-bold mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {personalInfo.name || 'Your Name'}
        </motion.h1>
        <motion.h2 
          className="text-xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {personalInfo.title || 'Professional Title'}
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap items-center gap-4 text-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={14} className="mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe size={14} className="mr-1" />
              <a 
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </motion.div>
        
        {visibleSections.socialLinks && socialLinks.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                {link.platform === 'linkedin' && <Linkedin size={16} className="mr-1" />}
                {link.platform === 'github' && <Github size={16} className="mr-1" />}
                {link.platform === 'twitter' && <Twitter size={16} className="mr-1" />}
                {(link.platform === 'leetcode' || link.platform === 'hackerrank') && <Code size={16} className="mr-1" />}
                {link.platform === 'blog' && <Globe size={16} className="mr-1" />}
                {link.platform === 'other' && <ExternalLink size={16} className="mr-1" />}
                <span>{link.username || link.url.replace(/^https?:\/\//, '')}</span>
              </a>
            ))}
          </motion.div>
        )}
      </header>
      
      <div className="border-t border-gray-200 pt-6" style={{ borderColor: accentColor }}></div>
      
      {/* About / Summary */}
      {visibleSections.about && about && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
            About
          </h3>
          <p className="text-sm leading-relaxed">{about}</p>
        </section>
      )}
      
      {/* Skills */}
      {visibleSections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="px-3 py-1 rounded-full bg-gray-100 text-xs"
              >
                {skill.name}
                {skill.level > 0 && (
                  <span className="ml-1 text-gray-400">
                    {Array.from({ length: skill.level }).map((_, i) => '•').join('')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: accentColor }}>
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{exp.role}</h4>
                    <div className="text-sm text-gray-600">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    {exp.location && <span> | {exp.location}</span>}
                  </div>
                </div>
                
                {exp.responsibilities.length > 0 && (
                  <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                    {exp.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                )}
                
                {exp.techUsed.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.techUsed.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {visibleSections.education && education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: accentColor }}>
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    {edu.location && <span> | {edu.location}</span>}
                  </div>
                </div>
                
                {edu.gpa && (
                  <div className="mt-1 text-sm">
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </div>
                )}
                
                {edu.coursework && (
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Relevant Coursework:</span> {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {visibleSections.projects && projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: accentColor }}>
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    {project.techUsed.length > 0 && (
                      <div className="text-sm text-gray-600">
                        {project.techUsed.join(', ')}
                      </div>
                    )}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm text-gray-600">
                      {formatDate(project.startDate)} – {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </div>
                  )}
                </div>
                
                {project.description && (
                  <p className="mt-1 text-sm">{project.description}</p>
                )}
                
                <div className="mt-1 flex space-x-3 text-sm">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                      style={{ color: accentColor }}
                    >
                      <Github size={12} className="mr-1" /> Repository
                    </a>
                  )}
                  
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                      style={{ color: accentColor }}
                    >
                      <ExternalLink size={12} className="mr-1" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Achievements */}
      {visibleSections.achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: accentColor }}>
            Achievements & Certifications
          </h3>
          <ul className="space-y-2">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{achievement.title}</span>
                  {achievement.date && <span className="text-gray-600">{formatDate(achievement.date)}</span>}
                </div>
                {achievement.description && <p className="text-gray-700">{achievement.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* Languages */}
      {visibleSections.languages && languages.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
            Languages
          </h3>
          <div className="flex flex-wrap gap-4">
            {languages.map((language) => (
              <div key={language.id} className="text-sm">
                <span className="font-medium">{language.name}:</span> {language.proficiency}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Courses */}
      {visibleSections.courses && courses.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
            Courses & Learning
          </h3>
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{course.name}</span>
                  {course.date && <span className="text-gray-600">{formatDate(course.date)}</span>}
                </div>
                <div className="text-gray-600">{course.provider}</div>
                {course.description && <p className="text-gray-700">{course.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* Publications */}
      {visibleSections.publications && publications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
            Publications & Research
          </h3>
          <ul className="space-y-3">
            {publications.map((publication) => (
              <li key={publication.id} className="text-sm">
                <div className="font-medium">{publication.title}</div>
                {publication.authors && <div className="text-gray-700">{publication.authors}</div>}
                <div className="text-gray-600">
                  {publication.journal}
                  {publication.date && ` • ${formatDate(publication.date)}`}
                </div>
                {publication.description && <p className="text-gray-700 mt-1">{publication.description}</p>}
                {publication.url && (
                  <a 
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 hover:underline"
                    style={{ color: accentColor }}
                  >
                    View Publication
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ModernLayout;
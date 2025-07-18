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
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import useResumeStore from '../../../store/useResumeStore';

const CreativeLayout: React.FC = () => {
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
    accentColor,
    backgroundColor
  } = useResumeStore();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin size={14} className="mr-2 opacity-80" />;
      case 'github': return <Github size={14} className="mr-2 opacity-80" />;
      case 'twitter': return <Twitter size={14} className="mr-2 opacity-80" />;
      case 'leetcode': return <Code size={14} className="mr-2 opacity-80" />;
      case 'hackerrank': return <Code size={14} className="mr-2 opacity-80" />;
      case 'blog': return <Globe size={14} className="mr-2 opacity-80" />;
      default: return <ExternalLink size={14} className="mr-2 opacity-80" />;
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((categories: Record<string, typeof skills>, skill) => {
    const category = skill.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(skill);
    return categories;
  }, {});

  return (
    <div 
      className="font-sans flex flex-col md:flex-row print:flex-row min-h-full"
      style={{ backgroundColor }}
    >
      {/* Sidebar */}
      <div 
        className="md:w-1/3 print:w-1/3 p-8 print:p-4 text-white"
        style={{ backgroundColor: accentColor }}
      >
        {/* Photo and Name */}
        <div className="text-center mb-8">
          {personalInfo.photo ? (
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.name}
                className="w-full h-full rounded-full border-4 border-white/30 object-cover"
                style={{ aspectRatio: '1/1' }}
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white/30 flex items-center justify-center bg-white/10 text-3xl font-bold">
              {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          
          <h1 className="text-2xl font-bold mb-1 text-white">
            {personalInfo.name || 'Your Name'}
          </h1>
          <h2 className="text-md opacity-90 mb-4 text-white">
            {personalInfo.title || 'Professional Title'}
          </h2>
        </div>
        
        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-white">
            Contact
          </h3>
          
          <div className="space-y-2 text-sm text-white">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail size={14} className="mr-2 opacity-80" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone size={14} className="mr-2 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe size={14} className="mr-2 opacity-80" />
                <a 
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all text-white"
                >
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin size={14} className="mr-2 opacity-80" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Social Links */}
        {visibleSections.socialLinks && socialLinks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-white">
              Connect
            </h3>
            
            <div className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline text-white"
                >
                  {getSocialIcon(link.platform)}
                  <span>{link.username || link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {visibleSections.skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-white">
              Skills
            </h3>
            
            <div className="space-y-3">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium mb-2 text-white">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <div 
                        key={skill.id}
                        className="px-2 py-1 bg-white/10 rounded-md text-xs text-white"
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {visibleSections.languages && languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-white">
              Languages
            </h3>
            
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center text-white">
                  <span className="text-sm">{language.name}</span>
                  <div className="text-xs uppercase">{language.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Courses */}
        {visibleSections.courses && courses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-white">
              Courses
            </h3>
            
            <div className="space-y-3 text-sm">
              {courses.map((course) => (
                <div key={course.id}>
                  <div className="font-medium text-white">{course.name}</div>
                  <div className="text-xs opacity-80 text-white">
                    {course.provider}
                    {course.date && ` • ${formatDate(course.date)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="md:w-2/3 print:w-2/3 p-8 print:p-4 text-gray-800">
        {/* About / Summary */}
        {visibleSections.about && about && (
          <section className="mb-8">
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              About Me
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">{about}</p>
          </section>
        )}
        
        {/* Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section className="mb-8">
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
                  <div 
                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-md text-gray-800">{exp.role}</h4>
                      <div className="text-sm text-gray-600">{exp.company}</div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  
                  {exp.responsibilities.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-sm flex text-gray-700">
                          <ChevronRight size={14} className="mr-1 mt-0.5 shrink-0" style={{ color: accentColor }} />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.techUsed.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.techUsed.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 rounded text-gray-700"
                          style={{ backgroundColor: `${accentColor}20` }}
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
        
        {/* Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Projects
            </h3>
            
            <div className="space-y-5">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
                  <div 
                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-md text-gray-800">{project.title}</h4>
                      {project.techUsed.length > 0 && (
                        <div className="text-xs text-gray-600">
                          {project.techUsed.join(' • ')}
                        </div>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(project.startDate)} – {project.endDate ? formatDate(project.endDate) : 'Present'}
                      </div>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                  )}
                  
                  <div className="mt-1 flex space-x-4 text-xs">
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
        
        {/* Education */}
        {visibleSections.education && education.length > 0 && (
          <section className="mb-8">
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education
            </h3>
            
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
                  <div 
                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-md text-gray-800">{edu.institution}</h4>
                      <div className="text-sm text-gray-600">{edu.degree}</div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      {edu.location && <div>{edu.location}</div>}
                    </div>
                  </div>
                  
                  <div className="mt-1 text-sm">
                    {edu.gpa && <span className="mr-3 text-gray-700">GPA: {edu.gpa}</span>}
                    {edu.coursework && (
                      <div className="text-xs mt-1 text-gray-600">
                        <span className="font-medium">Coursework:</span> {edu.coursework}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Achievements */}
        {visibleSections.achievements && achievements.length > 0 && (
          <section className="mb-8">
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Achievements
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="text-sm p-3 rounded"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <div className="font-bold text-gray-800">{achievement.title}</div>
                  {achievement.date && <div className="text-xs text-gray-600">{formatDate(achievement.date)}</div>}
                  {achievement.description && <p className="mt-1 text-gray-700">{achievement.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Publications */}
        {visibleSections.publications && publications.length > 0 && (
          <section>
            <h3 
              className="text-xl font-bold mb-3 pb-1 border-b" 
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Publications
            </h3>
            
            <div className="space-y-4">
              {publications.map((publication) => (
                <div key={publication.id} className="text-sm">
                  <div className="font-bold text-gray-800">{publication.title}</div>
                  {publication.authors && <div className="text-xs italic text-gray-600">{publication.authors}</div>}
                  <div className="text-xs text-gray-600">
                    {publication.journal}
                    {publication.date && ` • ${formatDate(publication.date)}`}
                  </div>
                  {publication.description && <p className="mt-1 text-gray-700 text-xs">{publication.description}</p>}
                  {publication.url && (
                    <a 
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-xs hover:underline"
                      style={{ color: accentColor }}
                    >
                      View Publication
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeLayout;
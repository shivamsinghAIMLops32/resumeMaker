import React from 'react';
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

const ClassicLayout: React.FC = () => {
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
    <div className="font-serif text-gray-900 p-10 print:p-6">
      {/* Header */}
      <header className="text-center mb-8 pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.name || 'Your Name'}
        </h1>
        <h2 className="text-xl mb-4" style={{ color: accentColor }}>
          {personalInfo.title || 'Professional Title'}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
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
        </div>
        
        {visibleSections.socialLinks && socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-3">
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
          </div>
        )}
      </header>
      
      {/* About / Summary */}
      {visibleSections.about && about && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Professional Summary
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <p className="text-sm leading-relaxed">{about}</p>
        </section>
      )}
      
      {/* Skills */}
      {visibleSections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Technical Skills
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="mr-6 mb-2"
              >
                <span className="font-medium">{skill.name}</span>
                {skill.level > 0 && (
                  <div className="mt-1 h-1.5 w-20 bg-gray-200 rounded-full">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${skill.level * 20}%`,
                        backgroundColor: accentColor
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Professional Experience
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <div className="text-sm italic">{exp.company}</div>
                  </div>
                  <div className="text-sm text-right">
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    <br />
                    {exp.location}
                  </div>
                </div>
                
                {exp.responsibilities.length > 0 && (
                  <ul className="mt-2 text-sm list-disc list-inside space-y-1 pl-2">
                    {exp.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                )}
                
                {exp.techUsed.length > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Technologies:</span> {exp.techUsed.join(', ')}
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
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Education
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.institution}</h4>
                    <div className="text-sm italic">{edu.degree}</div>
                  </div>
                  <div className="text-sm text-right">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    <br />
                    {edu.location}
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
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Projects
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{project.title}</h4>
                    {project.techUsed.length > 0 && (
                      <div className="text-sm italic">
                        {project.techUsed.join(', ')}
                      </div>
                    )}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm text-right">
                      {formatDate(project.startDate)} – {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </div>
                  )}
                </div>
                
                {project.description && (
                  <p className="mt-1 text-sm">{project.description}</p>
                )}
                
                <div className="mt-1 text-sm">
                  {project.githubUrl && (
                    <span className="mr-4">
                      <span className="font-medium">Repository:</span>{' '}
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        GitHub
                      </a>
                    </span>
                  )}
                  
                  {project.demoUrl && (
                    <span>
                      <span className="font-medium">Demo:</span>{' '}
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        Live Demo
                      </a>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Additional Sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Achievements */}
        {visibleSections.achievements && achievements.length > 0 && (
          <section className="mb-6 col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-2 uppercase\" style={{ color: accentColor }}>
              Achievements
            </h3>
            <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-2 pl-2">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="text-sm">
                  <div className="font-medium">{achievement.title}</div>
                  {achievement.date && <div className="text-xs text-gray-600">{formatDate(achievement.date)}</div>}
                  {achievement.description && <p className="text-xs mt-1">{achievement.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Languages */}
        {visibleSections.languages && languages.length > 0 && (
          <section className="mb-6 col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
              Languages
            </h3>
            <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-2 pl-2">
              {languages.map((language) => (
                <li key={language.id} className="text-sm">
                  <span className="font-medium">{language.name}:</span> {language.proficiency}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      
      {/* Courses */}
      {visibleSections.courses && courses.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Courses & Training
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pl-2">
            {courses.map((course) => (
              <li key={course.id} className="text-sm">
                <div className="font-medium">{course.name}</div>
                <div className="text-xs">
                  {course.provider}
                  {course.date && ` • ${formatDate(course.date)}`}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* Publications */}
      {visibleSections.publications && publications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Publications
          </h3>
          <div className="h-1 w-16 mb-3" style={{ backgroundColor: accentColor }}></div>
          <ul className="space-y-3 pl-2">
            {publications.map((publication) => (
              <li key={publication.id} className="text-sm">
                <div className="font-medium">{publication.title}</div>
                {publication.authors && <div className="text-xs italic">{publication.authors}</div>}
                <div className="text-xs">
                  {publication.journal}
                  {publication.date && ` • ${formatDate(publication.date)}`}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicLayout;
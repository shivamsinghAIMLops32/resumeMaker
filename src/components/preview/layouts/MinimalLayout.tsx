import React from 'react';
import useResumeStore from '../../../store/useResumeStore';

const MinimalLayout: React.FC = () => {
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
      className="font-sans text-gray-800 p-12 print:p-6 max-w-4xl mx-auto min-h-full"
      style={{ backgroundColor }}
    >
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-light mb-1" style={{ color: accentColor }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <h2 className="text-lg font-light text-gray-600 mb-3">
          {personalInfo.title || 'Professional Title'}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-700">
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          
          {personalInfo.phone && (
            <div>{personalInfo.phone}</div>
          )}
          
          {personalInfo.location && (
            <div>{personalInfo.location}</div>
          )}
          
          {personalInfo.website && (
            <a 
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: accentColor }}
            >
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
        
        {visibleSections.socialLinks && socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mt-2 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: accentColor }}
              >
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>
      
      {/* About / Summary */}
      {visibleSections.about && about && (
        <section className="mb-8">
          <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
            Profile
          </h3>
          <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
          <p className="text-sm leading-relaxed text-center max-w-2xl mx-auto text-gray-700">{about}</p>
        </section>
      )}
      
      {/* Skills */}
      {visibleSections.skills && skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
            Skills
          </h3>
          <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="text-center">
                <h4 className="text-sm font-medium mb-2 text-gray-800">{category}</h4>
                <div className="text-sm">
                  {categorySkills.map((skill, index) => (
                    <React.Fragment key={skill.id}>
                      <span className="text-gray-700">{skill.name}</span>
                      {index < categorySkills.length - 1 && <span className="mx-2 text-gray-500">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
            Experience
          </h3>
          <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-800">{exp.role}</h4>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-sm text-gray-600">{exp.company}</div>
                  <div className="text-sm text-gray-600">{exp.location}</div>
                </div>
                
                {exp.responsibilities.length > 0 && (
                  <ul className="text-sm list-disc list-inside space-y-1 pl-2 text-gray-700">
                    {exp.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {visibleSections.education && education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
            Education
          </h3>
          <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-800">{edu.institution}</h4>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-sm text-gray-700">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.location}</div>
                </div>
                
                {(edu.gpa || edu.coursework) && (
                  <div className="text-sm text-gray-700">
                    {edu.gpa && <span className="mr-4">GPA: {edu.gpa}</span>}
                    {edu.coursework && (
                      <span>Coursework: {edu.coursework}</span>
                    )}
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
          <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
            Projects
          </h3>
          <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-800">{project.title}</h4>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm text-gray-600">
                      {formatDate(project.startDate)} – {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </div>
                  )}
                </div>
                
                {project.techUsed.length > 0 && (
                  <div className="text-sm text-gray-600 mb-1">
                    Technologies: {project.techUsed.join(', ')}
                  </div>
                )}
                
                {project.description && (
                  <p className="text-sm mb-1 text-gray-700">{project.description}</p>
                )}
                
                <div className="text-sm">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-4 hover:underline"
                      style={{ color: accentColor }}
                    >
                      GitHub
                    </a>
                  )}
                  
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: accentColor }}
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Achievements */}
        {visibleSections.achievements && achievements.length > 0 && (
          <section>
            <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
              Achievements
            </h3>
            <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-2">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="text-sm">
                  <span className="font-medium text-gray-800">{achievement.title}</span>
                  {achievement.date && <span className="text-gray-600 ml-2">({formatDate(achievement.date)})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Languages */}
        {visibleSections.languages && languages.length > 0 && (
          <section>
            <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
              Languages
            </h3>
            <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-1">
              {languages.map((language) => (
                <li key={language.id} className="text-sm text-gray-700">
                  <span className="font-medium">{language.name}:</span> {language.proficiency}
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Courses */}
        {visibleSections.courses && courses.length > 0 && (
          <section>
            <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
              Courses
            </h3>
            <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.id} className="text-sm">
                  <div className="font-medium text-gray-800">{course.name}</div>
                  <div className="text-gray-600">
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
          <section>
            <h3 className="text-base font-normal mb-2 text-center uppercase tracking-wide text-gray-800">
              Publications
            </h3>
            <div className="w-full h-px mb-4" style={{ backgroundColor: accentColor }}></div>
            <ul className="space-y-3">
              {publications.map((publication) => (
                <li key={publication.id} className="text-sm">
                  <div className="font-medium text-gray-800">{publication.title}</div>
                  <div className="text-gray-600">
                    {publication.journal}
                    {publication.date && ` • ${formatDate(publication.date)}`}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalLayout;
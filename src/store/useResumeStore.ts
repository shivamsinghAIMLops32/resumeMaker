import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type ResumeSection = 
  | 'personalInfo' 
  | 'socialLinks' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'education' 
  | 'experience' 
  | 'achievements' 
  | 'courses' 
  | 'hobbies' 
  | 'languages' 
  | 'publications' 
  | 'contact';

export type ResumeLayout = 'modern' | 'classic' | 'minimal' | 'creative';

export type SocialPlatform = 'linkedin' | 'github' | 'twitter' | 'leetcode' | 'hackerrank' | 'blog' | 'other';

export interface PersonalInfo {
  name: string;
  title: string;
  photo: string;
  location: string;
  email: string;
  phone: string;
  website: string;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techUsed: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa: string;
  coursework: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string[];
  techUsed: string[];
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  date: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  url: string;
  description: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface ResumeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  layout: ResumeLayout;
  setLayout: (layout: ResumeLayout) => void;
  
  accentColor: string;
  setAccentColor: (color: string) => void;

  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  
  visibleSections: Record<ResumeSection, boolean>;
  toggleSection: (section: ResumeSection) => void;
  
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  socialLinks: SocialLink[];
  addSocialLink: (platform: SocialPlatform, url: string, username: string) => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  removeSocialLink: (id: string) => void;
  
  about: string;
  updateAbout: (text: string) => void;
  
  skills: Skill[];
  addSkill: (name: string, level: number, category?: string) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  education: Education[];
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  experience: Experience[];
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, data: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, data: Partial<Course>) => void;
  removeCourse: (id: string) => void;
  
  languages: Language[];
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  
  publications: Publication[];
  addPublication: (publication: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, data: Partial<Publication>) => void;
  removePublication: (id: string) => void;
  
  exportData: () => string;
  importData: (jsonData: string) => void;
}

const initialPersonalInfo: PersonalInfo = {
  name: '',
  title: '',
  photo: '',
  location: '',
  email: '',
  phone: '',
  website: '',
};

const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      layout: 'modern',
      setLayout: (layout) => set({ layout }),
      
      accentColor: '#4f46e5',
      setAccentColor: (color) => set({ accentColor: color }),

      backgroundColor: '#ffffff',
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      
      visibleSections: {
        personalInfo: true,
        socialLinks: true,
        about: true,
        skills: true,
        projects: true,
        education: true,
        experience: true,
        achievements: false,
        courses: false,
        hobbies: false,
        languages: false,
        publications: false,
        contact: true,
      },
      toggleSection: (section) => 
        set((state) => ({
          visibleSections: {
            ...state.visibleSections,
            [section]: !state.visibleSections[section],
          },
        })),
      
      personalInfo: initialPersonalInfo,
      updatePersonalInfo: (info) => 
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
      
      socialLinks: [],
      addSocialLink: (platform, url, username) => 
        set((state) => ({
          socialLinks: [
            ...state.socialLinks,
            { id: uuidv4(), platform, url, username },
          ],
        })),
      updateSocialLink: (id, data) => 
        set((state) => ({
          socialLinks: state.socialLinks.map((link) => 
            link.id === id ? { ...link, ...data } : link
          ),
        })),
      removeSocialLink: (id) => 
        set((state) => ({
          socialLinks: state.socialLinks.filter((link) => link.id !== id),
        })),
      
      about: '',
      updateAbout: (text) => set({ about: text }),
      
      skills: [],
      addSkill: (name, level, category) => 
        set((state) => ({
          skills: [
            ...state.skills,
            { id: uuidv4(), name, level, category },
          ],
        })),
      updateSkill: (id, data) => 
        set((state) => ({
          skills: state.skills.map((skill) => 
            skill.id === id ? { ...skill, ...data } : skill
          ),
        })),
      removeSkill: (id) => 
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),
      
      projects: [],
      addProject: (project) => 
        set((state) => ({
          projects: [
            ...state.projects,
            { id: uuidv4(), ...project },
          ],
        })),
      updateProject: (id, data) => 
        set((state) => ({
          projects: state.projects.map((project) => 
            project.id === id ? { ...project, ...data } : project
          ),
        })),
      removeProject: (id) => 
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      
      education: [],
      addEducation: (education) => 
        set((state) => ({
          education: [
            ...state.education,
            { id: uuidv4(), ...education },
          ],
        })),
      updateEducation: (id, data) => 
        set((state) => ({
          education: state.education.map((edu) => 
            edu.id === id ? { ...edu, ...data } : edu
          ),
        })),
      removeEducation: (id) => 
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),
      
      experience: [],
      addExperience: (experience) => 
        set((state) => ({
          experience: [
            ...state.experience,
            { id: uuidv4(), ...experience },
          ],
        })),
      updateExperience: (id, data) => 
        set((state) => ({
          experience: state.experience.map((exp) => 
            exp.id === id ? { ...exp, ...data } : exp
          ),
        })),
      removeExperience: (id) => 
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),
      
      achievements: [],
      addAchievement: (achievement) => 
        set((state) => ({
          achievements: [
            ...state.achievements,
            { id: uuidv4(), ...achievement },
          ],
        })),
      updateAchievement: (id, data) => 
        set((state) => ({
          achievements: state.achievements.map((ach) => 
            ach.id === id ? { ...ach, ...data } : ach
          ),
        })),
      removeAchievement: (id) => 
        set((state) => ({
          achievements: state.achievements.filter((ach) => ach.id !== id),
        })),
      
      courses: [],
      addCourse: (course) => 
        set((state) => ({
          courses: [
            ...state.courses,
            { id: uuidv4(), ...course },
          ],
        })),
      updateCourse: (id, data) => 
        set((state) => ({
          courses: state.courses.map((course) => 
            course.id === id ? { ...course, ...data } : course
          ),
        })),
      removeCourse: (id) => 
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
        })),
      
      languages: [],
      addLanguage: (language) => 
        set((state) => ({
          languages: [
            ...state.languages,
            { id: uuidv4(), ...language },
          ],
        })),
      updateLanguage: (id, data) => 
        set((state) => ({
          languages: state.languages.map((lang) => 
            lang.id === id ? { ...lang, ...data } : lang
          ),
        })),
      removeLanguage: (id) => 
        set((state) => ({
          languages: state.languages.filter((lang) => lang.id !== id),
        })),
      
      publications: [],
      addPublication: (publication) => 
        set((state) => ({
          publications: [
            ...state.publications,
            { id: uuidv4(), ...publication },
          ],
        })),
      updatePublication: (id, data) => 
        set((state) => ({
          publications: state.publications.map((pub) => 
            pub.id === id ? { ...pub, ...data } : pub
          ),
        })),
      removePublication: (id) => 
        set((state) => ({
          publications: state.publications.filter((pub) => pub.id !== id),
        })),
      
      exportData: () => {
        const state = useResumeStore.getState();
        const data = {
          layout: state.layout,
          accentColor: state.accentColor,
          backgroundColor: state.backgroundColor,
          visibleSections: state.visibleSections,
          personalInfo: state.personalInfo,
          socialLinks: state.socialLinks,
          about: state.about,
          skills: state.skills,
          projects: state.projects,
          education: state.education,
          experience: state.experience,
          achievements: state.achievements,
          courses: state.courses,
          languages: state.languages,
          publications: state.publications,
        };
        return JSON.stringify(data, null, 2);
      },
      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          set({
            layout: data.layout || 'modern',
            accentColor: data.accentColor || '#4f46e5',
            backgroundColor: data.backgroundColor || '#ffffff',
            visibleSections: data.visibleSections || {},
            personalInfo: data.personalInfo || initialPersonalInfo,
            socialLinks: data.socialLinks || [],
            about: data.about || '',
            skills: data.skills || [],
            projects: data.projects || [],
            education: data.education || [],
            experience: data.experience || [],
            achievements: data.achievements || [],
            courses: data.courses || [],
            languages: data.languages || [],
            publications: data.publications || [],
          });
        } catch (error) {
          console.error('Failed to import resume data:', error);
        }
      },
    }),
    {
      name: 'resume-storage',
    }
  )
);

export default useResumeStore;
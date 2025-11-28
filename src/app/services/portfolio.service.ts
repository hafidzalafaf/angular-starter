import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PersonalInfo, Skill, Project } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // Mock data - dalam aplikasi nyata, ini akan dari API
  private mockPersonalInfo: PersonalInfo = {
    name: 'John Doe',
    title: 'Frontend Developer',
    bio: 'Passionate frontend developer with 3+ years of experience creating beautiful, functional, and user-friendly web applications. I love learning new technologies and sharing knowledge with the developer community.',
    email: 'john.doe@email.com',
    location: 'Jakarta, Indonesia',
    yearsExperience: 3,
    projectsCompleted: 20,
    profileImage: '/assets/profile.jpg'
  };

  private mockSkills: Skill[] = [
    // Frontend Frameworks
    { id: '1', name: 'React', level: 9, category: 'frontend', color: 'blue' },
    { id: '2', name: 'Next.js', level: 8, category: 'frontend', color: 'blue' },
    { id: '3', name: 'Angular', level: 7, category: 'frontend', color: 'red' },
    { id: '4', name: 'Vue.js', level: 6, category: 'frontend', color: 'green' },
    
    // Languages
    { id: '5', name: 'TypeScript', level: 9, category: 'language', color: 'purple' },
    { id: '6', name: 'JavaScript', level: 9, category: 'language', color: 'purple' },
    { id: '7', name: 'HTML5', level: 9, category: 'language', color: 'purple' },
    { id: '8', name: 'CSS3', level: 8, category: 'language', color: 'purple' },
    
    // Tools
    { id: '9', name: 'Tailwind CSS', level: 9, category: 'tool', color: 'green' },
    { id: '10', name: 'SCSS', level: 8, category: 'tool', color: 'green' },
    { id: '11', name: 'Git', level: 8, category: 'tool', color: 'green' },
    { id: '12', name: 'Webpack', level: 7, category: 'tool', color: 'green' }
  ];

  private mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform built with React and TypeScript',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce'
    },
    {
      id: '2',
      title: 'Portfolio Website',
      description: 'Personal portfolio website with Angular and modern design',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
      featured: true,
      liveUrl: 'https://portfolio.example.com',
      githubUrl: 'https://github.com/example/portfolio'
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      technologies: ['Vue.js', 'TypeScript', 'Socket.io', 'Express'],
      featured: false,
      githubUrl: 'https://github.com/example/taskmanager'
    }
  ];

  constructor() { }

  // Simulasi API call dengan delay
  getPortfolioData(): Observable<{
    personalInfo: PersonalInfo;
    skills: Skill[];
    projects: Project[];
  }> {
    return of({
      personalInfo: this.mockPersonalInfo,
      skills: this.mockSkills,
      projects: this.mockProjects
    }).pipe(
      delay(1000) // Simulasi network delay
    );
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of(this.mockPersonalInfo).pipe(delay(500));
  }

  getSkills(): Observable<Skill[]> {
    return of(this.mockSkills).pipe(delay(500));
  }

  getProjects(): Observable<Project[]> {
    return of(this.mockProjects).pipe(delay(500));
  }

  // Method untuk update data (dalam aplikasi nyata akan ke API)
  updatePersonalInfo(personalInfo: PersonalInfo): Observable<PersonalInfo> {
    this.mockPersonalInfo = { ...personalInfo };
    return of(this.mockPersonalInfo).pipe(delay(500));
  }

  addSkill(skill: Skill): Observable<Skill> {
    this.mockSkills.push(skill);
    return of(skill).pipe(delay(500));
  }

  addProject(project: Project): Observable<Project> {
    this.mockProjects.push(project);
    return of(project).pipe(delay(500));
  }
}
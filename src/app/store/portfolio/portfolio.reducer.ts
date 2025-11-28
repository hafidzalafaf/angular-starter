import { createReducer, on } from '@ngrx/store';
import { PortfolioState } from '../../models/portfolio.model';
import * as PortfolioActions from './portfolio.actions';

export const initialState: PortfolioState = {
  personalInfo: null,
  skills: [],
  projects: [],
  loading: false,
  error: null
};

export const portfolioReducer = createReducer(
  initialState,
  
  // Load Portfolio Data
  on(PortfolioActions.loadPortfolioData, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PortfolioActions.loadPortfolioDataSuccess, (state, { personalInfo, skills, projects }) => ({
    ...state,
    personalInfo,
    skills,
    projects,
    loading: false,
    error: null
  })),
  
  on(PortfolioActions.loadPortfolioDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Personal Info
  on(PortfolioActions.updatePersonalInfo, (state, { personalInfo }) => ({
    ...state,
    personalInfo
  })),

  // Skills
  on(PortfolioActions.addSkill, (state, { skill }) => ({
    ...state,
    skills: [...state.skills, skill]
  })),

  on(PortfolioActions.updateSkill, (state, { skill }) => ({
    ...state,
    skills: state.skills.map(s => s.id === skill.id ? skill : s)
  })),

  on(PortfolioActions.deleteSkill, (state, { skillId }) => ({
    ...state,
    skills: state.skills.filter(s => s.id !== skillId)
  })),

  // Projects
  on(PortfolioActions.addProject, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project]
  })),

  on(PortfolioActions.updateProject, (state, { project }) => ({
    ...state,
    projects: state.projects.map(p => p.id === project.id ? project : p)
  })),

  on(PortfolioActions.deleteProject, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter(p => p.id !== projectId)
  })),

  on(PortfolioActions.toggleProjectFeatured, (state, { projectId }) => ({
    ...state,
    projects: state.projects.map(p => 
      p.id === projectId ? { ...p, featured: !p.featured } : p
    )
  }))
);
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from '../../models/portfolio.model';

// Feature selector
export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

// Basic selectors
export const selectPersonalInfo = createSelector(
  selectPortfolioState,
  (state) => state.personalInfo
);

export const selectSkills = createSelector(
  selectPortfolioState,
  (state) => state.skills
);

export const selectProjects = createSelector(
  selectPortfolioState,
  (state) => state.projects
);

export const selectLoading = createSelector(
  selectPortfolioState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPortfolioState,
  (state) => state.error
);

// Advanced selectors
export const selectSkillsByCategory = createSelector(
  selectSkills,
  (skills) => {
    return {
      frontend: skills.filter(skill => skill.category === 'frontend'),
      language: skills.filter(skill => skill.category === 'language'),
      tool: skills.filter(skill => skill.category === 'tool')
    };
  }
);

export const selectFeaturedProjects = createSelector(
  selectProjects,
  (projects) => projects.filter(project => project.featured)
);

export const selectProjectsCount = createSelector(
  selectProjects,
  (projects) => projects.length
);

export const selectSkillsCount = createSelector(
  selectSkills,
  (skills) => skills.length
);

// Computed data selectors
export const selectPortfolioSummary = createSelector(
  selectPersonalInfo,
  selectProjectsCount,
  selectSkillsCount,
  (personalInfo, projectsCount, skillsCount) => ({
    personalInfo,
    totalProjects: projectsCount,
    totalSkills: skillsCount,
    yearsExperience: personalInfo?.yearsExperience || 0
  })
);
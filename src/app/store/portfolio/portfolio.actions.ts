import { createAction, props } from '@ngrx/store';
import { PersonalInfo, Skill, Project } from '../../models/portfolio.model';

// Load Portfolio Data Actions
export const loadPortfolioData = createAction('[Portfolio] Load Portfolio Data');
export const loadPortfolioDataSuccess = createAction(
  '[Portfolio] Load Portfolio Data Success',
  props<{ 
    personalInfo: PersonalInfo; 
    skills: Skill[]; 
    projects: Project[]; 
  }>()
);

export const loadPortfolioDataFailure = createAction(
  '[Portfolio] Load Portfolio Data Failure',
  props<{ error: string }>()
);

// Personal Info Actions
export const updatePersonalInfo = createAction(
  '[Portfolio] Update Personal Info',
  props<{ personalInfo: PersonalInfo }>()
);

// Skills Actions
export const addSkill = createAction(
  '[Portfolio] Add Skill',
  props<{ skill: Skill }>()
);
export const updateSkill = createAction(
  '[Portfolio] Update Skill',
  props<{ skill: Skill }>()
);
export const deleteSkill = createAction(
  '[Portfolio] Delete Skill',
  props<{ skillId: string }>()
);

// Projects Actions
export const addProject = createAction(
  '[Portfolio] Add Project',
  props<{ project: Project }>()
);
export const updateProject = createAction(
  '[Portfolio] Update Project',
  props<{ project: Project }>()
);
export const deleteProject = createAction(
  '[Portfolio] Delete Project',
  props<{ projectId: string }>()
);
export const toggleProjectFeatured = createAction(
  '[Portfolio] Toggle Project Featured',
  props<{ projectId: string }>()
);

// Filter Actions (untuk demo state management)
export const setSkillFilter = createAction(
  '[Portfolio] Set Skill Filter',
  props<{ category: 'all' | 'frontend' | 'language' | 'tool' }>()
);
export const setProjectFilter = createAction(
  '[Portfolio] Set Project Filter',
  props<{ featured: boolean | null }>()
);
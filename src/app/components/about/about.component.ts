import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AppState } from '../../store';
import { PersonalInfo, Skill, Project } from '../../models/portfolio.model';
import { 
  selectPersonalInfo, 
  selectSkillsByCategory, 
  selectFeaturedProjects,
  selectLoading,
  selectError,
  selectPortfolioSummary
} from '../../store/portfolio/portfolio.selectors';
import { loadPortfolioData } from '../../store/portfolio/portfolio.actions';

@Component({
  selector: 'app-about',
  imports: [RouterModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  personalInfo$: Observable<PersonalInfo | null>;
  skillsByCategory$: Observable<{
    frontend: Skill[];
    language: Skill[];
    tool: Skill[];
  }>;
  featuredProjects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  portfolioSummary$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.personalInfo$ = this.store.select(selectPersonalInfo);
    this.skillsByCategory$ = this.store.select(selectSkillsByCategory);
    this.featuredProjects$ = this.store.select(selectFeaturedProjects);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.portfolioSummary$ = this.store.select(selectPortfolioSummary);
  }

  ngOnInit(): void {
    // Load portfolio data when component initializes
    this.store.dispatch(loadPortfolioData());
  }

  // Method untuk demo state management
  refreshData(): void {
    this.store.dispatch(loadPortfolioData());
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store';
import { Skill, PersonalInfo } from '../../models/portfolio.model';
import { 
  selectSkills, 
  selectPersonalInfo, 
  selectLoading 
} from '../../store/portfolio/portfolio.selectors';
import { 
  addSkill, 
  updatePersonalInfo,
  loadPortfolioData 
} from '../../store/portfolio/portfolio.actions';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Admin Panel
          </h1>
          <p class="text-gray-400">Demo State Management dengan NgRx</p>
          <button 
            (click)="refreshData()"
            [disabled]="loading$ | async"
            class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors">
            {{ (loading$ | async) ? 'Loading...' : 'Refresh Data' }}
          </button>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Personal Info Editor -->
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 class="text-2xl font-bold mb-6 text-blue-400">Personal Information</h2>
            
            <div *ngIf="personalInfo$ | async as personalInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="personalInfoForm.name"
                  [value]="personalInfo.name"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Title</label>
                <input 
                  type="text" 
                  [(ngModel)]="personalInfoForm.title"
                  [value]="personalInfo.title"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Bio</label>
                <textarea 
                  [(ngModel)]="personalInfoForm.bio"
                  [value]="personalInfo.bio"
                  rows="4"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none resize-none">
                </textarea>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Location</label>
                  <input 
                    type="text" 
                    [(ngModel)]="personalInfoForm.location"
                    [value]="personalInfo.location"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Years Experience</label>
                  <input 
                    type="number" 
                    [(ngModel)]="personalInfoForm.yearsExperience"
                    [value]="personalInfo.yearsExperience"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none">
                </div>
              </div>
              
              <button 
                (click)="updatePersonalInfoData()"
                class="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                Update Personal Info
              </button>
            </div>
          </div>

          <!-- Skills Manager -->
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 class="text-2xl font-bold mb-6 text-purple-400">Skills Management</h2>
            
            <!-- Add New Skill Form -->
            <div class="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 class="text-lg font-semibold mb-4">Add New Skill</h3>
              <div class="space-y-3">
                <input 
                  type="text" 
                  [(ngModel)]="newSkill.name"
                  placeholder="Skill name (e.g., React)"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none">
                
                <select 
                  [(ngModel)]="newSkill.category"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none">
                  <option value="">Select category</option>
                  <option value="frontend">Frontend Framework</option>
                  <option value="language">Programming Language</option>
                  <option value="tool">Tool/Library</option>
                </select>
                
                <div class="flex items-center gap-4">
                  <label class="text-sm">Level (1-10):</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    [(ngModel)]="newSkill.level"
                    class="flex-1">
                  <span class="text-purple-400 font-semibold w-8">{{ newSkill.level }}</span>
                </div>
                
                <button 
                  (click)="addNewSkill()"
                  [disabled]="!newSkill.name || !newSkill.category"
                  class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors">
                  Add Skill
                </button>
              </div>
            </div>

            <!-- Skills List -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Current Skills</h3>
              <div class="space-y-2 max-h-64 overflow-y-auto">
                <div 
                  *ngFor="let skill of skills$ | async" 
                  class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <div class="font-medium">{{ skill.name }}</div>
                    <div class="text-sm text-gray-400">
                      {{ skill.category | titlecase }} • Level {{ skill.level }}/10
                    </div>
                  </div>
                  <div class="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      [style.width.%]="skill.level * 10">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- State Debug Panel -->
        <div class="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 class="text-2xl font-bold mb-6 text-yellow-400">State Debug</h2>
          <div class="text-sm font-mono">
            <div class="mb-2">
              <span class="text-yellow-400">Loading:</span> 
              <span class="text-green-400">{{ loading$ | async }}</span>
            </div>
            <div class="mb-2">
              <span class="text-yellow-400">Skills Count:</span> 
              <span class="text-green-400">{{ (skills$ | async)?.length || 0 }}</span>
            </div>
            <div>
              <span class="text-yellow-400">Personal Info Loaded:</span> 
              <span class="text-green-400">{{ !!(personalInfo$ | async) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  skills$: Observable<Skill[]>;
  personalInfo$: Observable<PersonalInfo | null>;
  loading$: Observable<boolean>;

  personalInfoForm: Partial<PersonalInfo> = {};
  
  newSkill: Partial<Skill> = {
    name: '',
    level: 5,
    category: 'frontend',
    color: 'blue'
  };

  constructor(private store: Store<AppState>) {
    this.skills$ = this.store.select(selectSkills);
    this.personalInfo$ = this.store.select(selectPersonalInfo);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPortfolioData());
    
    // Initialize form with current data
    this.personalInfo$.subscribe(personalInfo => {
      if (personalInfo) {
        this.personalInfoForm = { ...personalInfo };
      }
    });
  }

  addNewSkill(): void {
    if (this.newSkill.name && this.newSkill.category) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: this.newSkill.name,
        level: this.newSkill.level || 5,
        category: this.newSkill.category as 'frontend' | 'language' | 'tool',
        color: this.getCategoryColor(this.newSkill.category)
      };

      this.store.dispatch(addSkill({ skill }));
      
      // Reset form
      this.newSkill = {
        name: '',
        level: 5,
        category: 'frontend',
        color: 'blue'
      };
    }
  }

  updatePersonalInfoData(): void {
    if (this.personalInfoForm.name && this.personalInfoForm.title) {
      const personalInfo: PersonalInfo = {
        name: this.personalInfoForm.name,
        title: this.personalInfoForm.title || '',
        bio: this.personalInfoForm.bio || '',
        email: this.personalInfoForm.email || '',
        location: this.personalInfoForm.location || '',
        yearsExperience: this.personalInfoForm.yearsExperience || 0,
        projectsCompleted: this.personalInfoForm.projectsCompleted || 0,
        profileImage: this.personalInfoForm.profileImage
      };

      this.store.dispatch(updatePersonalInfo({ personalInfo }));
    }
  }

  refreshData(): void {
    this.store.dispatch(loadPortfolioData());
  }

  private getCategoryColor(category: string): string {
    switch (category) {
      case 'frontend': return 'blue';
      case 'language': return 'purple';
      case 'tool': return 'green';
      default: return 'gray';
    }
  }
}
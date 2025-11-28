# State Management dengan NgRx di Angular

Dokumentasi ini menjelaskan implementasi state management menggunakan NgRx dalam project Angular portfolio.

## 📋 Overview

NgRx adalah library state management untuk Angular yang menggunakan pola Redux. Ini membantu mengelola state aplikasi secara terprediksi dan memudahkan debugging.

## 🏗️ Arsitektur NgRx

### 1. **State**
State adalah single source of truth yang menyimpan data aplikasi.

```typescript
export interface PortfolioState {
  personalInfo: PersonalInfo | null;
  skills: Skill[];
  projects: Project[];
  loading: boolean;
  error: string | null;
}
```

### 2. **Actions** 
Actions adalah events yang mendeskripsikan apa yang terjadi di aplikasi.

```typescript
// Load Portfolio Data Actions
export const loadPortfolioData = createAction('[Portfolio] Load Portfolio Data');
export const loadPortfolioDataSuccess = createAction(
  '[Portfolio] Load Portfolio Data Success',
  props<{ personalInfo: PersonalInfo; skills: Skill[]; projects: Project[]; }>()
);
```

### 3. **Reducers**
Reducers adalah pure functions yang mengubah state berdasarkan actions.

```typescript
export const portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.loadPortfolioData, (state) => ({
    ...state,
    loading: true,
    error: null
  }))
);
```

### 4. **Effects**
Effects menangani side effects seperti API calls.

```typescript
loadPortfolioData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PortfolioActions.loadPortfolioData),
    mergeMap(() =>
      this.portfolioService.getPortfolioData().pipe(
        map(({ personalInfo, skills, projects }) => 
          PortfolioActions.loadPortfolioDataSuccess({ personalInfo, skills, projects })
        )
      )
    )
  )
);
```

### 5. **Selectors**
Selectors adalah functions untuk mengambil data dari state.

```typescript
export const selectPersonalInfo = createSelector(
  selectPortfolioState,
  (state) => state.personalInfo
);
```

## 🔧 Setup dan Konfigurasi

### 1. Install Dependencies

```bash
npm install @ngrx/store@19 @ngrx/effects@19 @ngrx/store-devtools@19
```

### 2. Konfigurasi di app.config.ts

```typescript
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideStore({ portfolio: portfolioReducer }),
    provideEffects([PortfolioEffects]),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    })
  ]
};
```

## 📁 Struktur File

```
src/app/
├── models/
│   └── portfolio.model.ts       # Interface definitions
├── services/
│   └── portfolio.service.ts     # API service
└── store/
    ├── index.ts                 # Main store exports
    └── portfolio/
        ├── index.ts
        ├── portfolio.actions.ts
        ├── portfolio.reducer.ts
        ├── portfolio.selectors.ts
        └── portfolio.effects.ts
```

## 🎯 Penggunaan di Component

### 1. Inject Store dan Setup Observables

```typescript
export class AboutComponent implements OnInit {
  personalInfo$: Observable<PersonalInfo | null>;
  skillsByCategory$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.personalInfo$ = this.store.select(selectPersonalInfo);
    this.skillsByCategory$ = this.store.select(selectSkillsByCategory);
    this.loading$ = this.store.select(selectLoading);
  }
```

### 2. Dispatch Actions

```typescript
ngOnInit(): void {
  // Load data when component initializes
  this.store.dispatch(loadPortfolioData());
}

refreshData(): void {
  this.store.dispatch(loadPortfolioData());
}
```

### 3. Subscribe di Template

```html
<!-- Loading State -->
<div *ngIf="loading$ | async" class="text-center py-20">
  <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
  <p class="mt-4 text-gray-400">Loading portfolio data...</p>
</div>

<!-- Display Data -->
<div *ngIf="personalInfo$ | async as personalInfo">
  <h2>{{ personalInfo.name }}</h2>
  <p>{{ personalInfo.bio }}</p>
</div>
```

## 🔍 Benefits NgRx

### 1. **Predictable State Management**
- Single source of truth
- Immutable state updates
- Time-travel debugging

### 2. **Better Organization**
- Separation of concerns
- Testable pure functions
- Clear data flow

### 3. **Developer Experience**
- Redux DevTools integration
- Hot module replacement
- Type safety dengan TypeScript

### 4. **Performance**
- Memoized selectors
- Change detection optimization
- OnPush strategy compatibility

## 🛠️ Development Tools

### 1. Redux DevTools
Install browser extension untuk debugging:
- View state changes
- Time-travel debugging
- Action replay

### 2. NgRx Schematics (Optional)
```bash
ng add @ngrx/schematics
ng generate @ngrx/schematics:feature feature-name
```

## 📊 Best Practices

### 1. **Action Naming**
```typescript
// Good: [Source] Event
export const loadPortfolioData = createAction('[Portfolio] Load Portfolio Data');

// Bad: generic names
export const loadData = createAction('Load Data');
```

### 2. **State Structure**
```typescript
// Good: normalized and flat
interface AppState {
  portfolio: PortfolioState;
  ui: UiState;
  auth: AuthState;
}

// Avoid: nested and complex
```

### 3. **Selectors Usage**
```typescript
// Good: use memoized selectors
this.data$ = this.store.select(selectProcessedData);

// Avoid: direct state access
```

### 4. **Effects for Side Effects**
```typescript
// Good: API calls in effects
@Injectable()
export class PortfolioEffects {
  loadData$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadPortfolioData),
      mergeMap(() => this.service.getData())
    )
  );
}
```

## 🧪 Testing

### 1. Testing Reducers
```typescript
describe('Portfolio Reducer', () => {
  it('should load portfolio data', () => {
    const action = loadPortfolioDataSuccess({ personalInfo, skills, projects });
    const result = portfolioReducer(initialState, action);
    
    expect(result.loading).toBe(false);
    expect(result.personalInfo).toEqual(personalInfo);
  });
});
```

### 2. Testing Effects
```typescript
describe('Portfolio Effects', () => {
  it('should load portfolio data', () => {
    const action = loadPortfolioData();
    const completion = loadPortfolioDataSuccess({ personalInfo, skills, projects });
    
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    
    expect(effects.loadPortfolioData$).toBeObservable(expected);
  });
});
```

## 🚀 Next Steps

1. **Add More Features**: Implement CRUD operations untuk skills dan projects
2. **Caching**: Add caching strategy dengan effects
3. **Error Handling**: Implement comprehensive error handling
4. **Offline Support**: Add offline state management
5. **Performance**: Implement OnPush change detection strategy

## 📚 Referensi

- [NgRx Documentation](https://ngrx.io/docs)
- [Redux Pattern](https://redux.js.org/basics/data-flow)
- [Angular Architecture](https://angular.dev/guide/architecture)

---

*Happy coding with Angular and NgRx! 🎉*
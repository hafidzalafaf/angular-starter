import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PortfolioService } from '../../services/portfolio.service';
import * as PortfolioActions from './portfolio.actions';

@Injectable()
export class PortfolioEffects {

  loadPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolioData),
      mergeMap(() =>
        this.portfolioService.getPortfolioData().pipe(
          map(({ personalInfo, skills, projects }) => 
            PortfolioActions.loadPortfolioDataSuccess({ personalInfo, skills, projects })
          ),
          catchError(error => of(PortfolioActions.loadPortfolioDataFailure({ 
            error: error.message || 'An error occurred while loading portfolio data' 
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService
  ) {}
}
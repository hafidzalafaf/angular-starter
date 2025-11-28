import { PortfolioState } from '../models/portfolio.model';

export interface AppState {
  portfolio: PortfolioState;
}

export * from './portfolio';
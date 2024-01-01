export interface Position {
  contractId: number;
  date: Object;
  ticker: string;
  position: number;
  unrealizedPnL: number;
  realizedPnL: number;
  averageCost: number;
  lastMarketPrice: number;
}

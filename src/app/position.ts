export interface Position {
  contractId: number;
  date: Object;
  ticker: String;
  position: number;
  unrealizedPnL: number;
  realizedPnL: number;
  averageCost: number;
  lastMarketPrice: number;
}

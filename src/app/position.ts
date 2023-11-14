export interface Position {
  contractId: number;
  date: String;
  ticker: String;
  position: number;
  unrealizedPnL: number;
  realizedPnL: number;
  averageCost: number;
  lastMarketPrice: number;
}

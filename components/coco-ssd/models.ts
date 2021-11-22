type Prediction = {
  bbox?: number[];
  class?: string;
  score?: number;
};
export type CocoSSDPredictionsType = Prediction[] | [] | undefined;

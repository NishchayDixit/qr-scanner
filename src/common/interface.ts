import { views } from "./constant";

export interface QRCodeGeneratorProps {
  url: string;
  favicon: string;
}

export interface HistoryListProps {
  history: string[];
  clearHistory: () => void;
  clearItem: (linkToRemove: string) => void;
}

export type ViewsType = typeof views.QR | typeof views.HISTORY | typeof views.SCAN;

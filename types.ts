export type Category = string;

export interface Integration {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  logoColor: string;
  logoInitials: string;
  logoUrl?: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
}

export interface SearchState {
  query: string;
  category: Category;
  isAiSearching: boolean;
  aiResults: string[] | null;
}
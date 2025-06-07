export interface Recipe {
  id: number;
  name: string;
  description?: string;
  image: string;
  ingredients: string[];
  instructions: string | string[];
  prepTimeMinutes: number;
  difficulty: string;
}
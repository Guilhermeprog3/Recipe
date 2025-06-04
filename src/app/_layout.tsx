import { Slot } from 'expo-router';
import { RecipesProvider } from '../context/recipecontext';

export default function RootLayout() {
  return (
    <RecipesProvider>
      <Slot />
    </RecipesProvider>
  );
}

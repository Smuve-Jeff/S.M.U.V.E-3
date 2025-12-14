export interface Game {
  id: string;
  title: string;
  category: 'Retro' | 'Tabletop' | 'Modern' | 'RPG' | 'Action';
  mode: 'Solo' | 'Multiplayer' | 'vs AI' | 'Co-op';
  url: string;
  image: string;
  desc: string;
  rating: number;
}

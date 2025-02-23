import { title } from '@/components/primitives';

export const metadata = {
  title: 'Boids Battleground',
  description: 'A game where you can battle against other players in a battleground.',
  image: '/projects/boids-battleground/thumbnail.png',
};

export default function BoidsBattlegroundPage() {
  return (
    <div>
      <h1 className={title()}>Boids Battleground</h1>
      <p>Boids Battleground is a game where you can battle against other players in a battleground.</p>
    </div>
  );
}

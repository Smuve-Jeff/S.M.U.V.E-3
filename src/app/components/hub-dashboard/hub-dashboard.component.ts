import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Game } from './game.model';

@Component({
  selector: 'app-hub-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hub-dashboard.component.html',
  styleUrls: ['./hub-dashboard.component.css']
})
export class HubDashboardComponent {
  autoLaunchGameId = input<string | null>(null);

  activeTab: string = 'All';
  activeGame: Game | null = null;
  safeUrl: SafeResourceUrl | null = null;
  currentFilter: string = 'none';

  games: Game[] = [
    {
      id: 'veloren', title: 'Veloren RPG', category: 'RPG', mode: 'Multiplayer', rating: 4.9,
      url: 'https://veloren.net',
      image: 'https://veloren.net/blog/devblog-118/cover.jpg',
      desc: 'Open world Voxel RPG.'
    },
    {
      id: 'hex', title: 'HexGL Racer', category: 'Action', mode: 'Solo', rating: 4.5,
      url: 'https://hexgl.bkcore.com/play/',
      image: 'https://i.ytimg.com/vi/3Mv58hZpCbg/maxresdefault.jpg',
      desc: 'Futuristic racing.'
    },
    {
      id: 'doom', title: 'Freedoom Arena', category: 'Modern', mode: 'vs AI', rating: 4.7,
      url: 'https://play-dos-games-online.com/dosbox-emulator/dosbox.html?jsdos_game=doom',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Freedoom_Phase_2_Screenshot.png',
      desc: 'FPS Classic.'
    },
    {
      id: 'chess', title: 'Grandmaster Chess', category: 'Tabletop', mode: 'vs AI', rating: 5.0,
      url: 'https://lichess.org/tv/frame?theme=blue&bg=dark',
      image: 'https://images.chesscomfiles.com/uploads/v1/article/25134.7e5a755c.668x375o.5042898c66e2.jpeg',
      desc: 'Strategy.'
    },
    {
      id: '2048', title: '2048 Space', category: 'Retro', mode: 'Solo', rating: 4.2,
      url: 'https://play2048.co/',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2048_logo.svg/1200px-2048_logo.svg.png',
      desc: 'Puzzle.'
    },
    {
      id: 'hextris', title: 'Hextris', category: 'Retro', mode: 'Solo', rating: 4.3,
      url: 'https://hextris.io/index.html',
      image: 'https://lh3.googleusercontent.com/w1KkSgJ2Nn0VdYyV9-e3D2bS1c8W1qV0g1kX9z2f6d0a7h5j4l8',
      desc: 'Reflex Puzzle.'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      const gameId = this.autoLaunchGameId();
      if (gameId) {
        this.launchSpecific(gameId);
      }
    });
  }

  getGames() {
    if (this.activeTab === 'All') return this.games;
    return this.games.filter(g => g.category === this.activeTab || g.mode === this.activeTab);
  }

  launchGame(game: Game) {
    this.activeGame = game;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(game.url);
  }

  launchSpecific(id: string) {
    const game = this.games.find(g => g.id === id);
    if(game) this.launchGame(game);
  }

  closeGame() {
    this.activeGame = null;
    this.safeUrl = null;
    this.currentFilter = 'none';
  }

  setFilter(event: any) {
    this.currentFilter = event.target.value;
  }
}

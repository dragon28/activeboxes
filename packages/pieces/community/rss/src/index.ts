import { PieceAuth, createPiece } from '@activeboxes/pieces-framework';
import { rssNewItemTrigger } from './lib/triggers/new-item-trigger';

export const rssFeed = createPiece({
  displayName: 'RSS Feed',
  description: 'Stay updated with RSS feeds',
  authors: ["Abdallah-Alwarawreh","kishanprmr","khaledmashaly","abuaboud"],
  minimumSupportedRelease: '0.30.0',
  logoUrl: 'https://cdn.activeboxes.org/pieces/rss.png',
  categories: [],
  auth: PieceAuth.None(),
  actions: [],
  triggers: [rssNewItemTrigger],
});

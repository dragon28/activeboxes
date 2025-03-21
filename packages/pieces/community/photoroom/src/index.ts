import { createPiece, PieceAuth } from '@activeboxes/pieces-framework';
import { removeBackground } from './lib/actions/remove-background';

export const photoroomAuth = PieceAuth.CustomAuth({
  required: true,
  props: {
    apiKey: PieceAuth.SecretText({
      displayName: 'API key',
      required: true,
    }),
  },
});

export const photoroom = createPiece({
  displayName: 'Photoroom',
  auth: photoroomAuth,
  minimumSupportedRelease: '0.30.0',
  logoUrl: 'https://cdn.activeboxes.org/pieces/photoroom.png',
  authors: ['AdamSelene', 'Charles-Go'],
  actions: [removeBackground],
  triggers: [],
});

import { PieceAuth, createPiece } from '@activeboxes/pieces-framework';
import { PieceCategory } from '@activeboxes/shared';
import { createApprovalLink } from './lib/actions/create-approval-link';
import { waitForApprovalLink } from './lib/actions/wait-for-approval';

export const approval = createPiece({
  displayName: 'Approval',
  description: 'Build approval process in your workflows',

  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.30.0',
  logoUrl: 'https://cdn.activeboxes.org/pieces/approval.svg',
  authors: ["kishanprmr","MoShizzle","khaledmashaly","abuaboud"],
  categories: [PieceCategory.CORE, PieceCategory.FLOW_CONTROL],
  actions: [waitForApprovalLink, createApprovalLink],
  triggers: [],
});

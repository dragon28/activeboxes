import {
  createTrigger,
  TriggerStrategy,
} from '@activeboxes/pieces-framework';
import { intercomAuth } from '../..';
import { intercomClient } from '../common';

export const conversationUnsnoozed = createTrigger({
  // auth: check https://www.activeboxes.org/docs/developers/piece-reference/authentication,
  name: 'conversationUnsnoozed',
  displayName: 'Conversation unsnoozed',
  description:
    'Triggers when a conversation is unsnoozed',
  props: {},
  sampleData: undefined,
  auth: intercomAuth,
  type: TriggerStrategy.APP_WEBHOOK,
  async onEnable(context) {
    const client = intercomClient(context.auth);
    const response: { app: { id_code: string } } = await client.get({
      url: '/me',
    });
    context.app.createListeners({
      events: ['conversation.admin.unsnoozed'],
      identifierValue: response['app']['id_code'],
    });
  },
  async onDisable(context) {
    // implement webhook deletion logic
  },
  async run(context) {
    return [context.payload.body];
  },
});

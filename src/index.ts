import { App } from '@slack/bolt';
import { MessageAttachment } from '@slack/types';
import dayjs from 'dayjs';
import { DocbaseClient } from './DocbaseClient';

const app = new App({
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT ? +process.env.PORT : 3000,
  customRoutes: [
    {
      path: '/healthz',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('OK');
      },
    },
  ],
});

const docbase = new DocbaseClient();

app.event('link_shared', async ({ event, client, logger }) => {
  for (const link of event.links) {
    if (link.domain !== `${process.env.DOCBASE_TEAM_NAME}.docbase.io`) {
      continue;
    }
    const [, posts, postId] = new URL(link.url).pathname.split('/');
    logger.debug({ posts, postId });

    const post = await docbase.fetchPost(postId);
    logger.debug(post);
    if (!post) {
      // Not found
      continue;
    }

    const groupsCount = post.groups.length ?? 0;
    if (groupsCount > 0) {
      // Restricted post
      continue;
    }

    const attachment: MessageAttachment = {
      title: post.title,
      title_link: post.url,
      author_name: post.user.name,
      author_icon: post.user.profile_image_url,
      text: post.body.slice(0, 50),
      color: 'good',
      footer: 'Tags: ' + post.tags.map((v) => v.name).join(', '),
      ts: dayjs(post.updated_at).unix().toString(),
    };
    await client.chat.unfurl({
      channel: event.channel,
      ts: event.message_ts,
      unfurls: { [post.url]: attachment },
    });
  }
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();

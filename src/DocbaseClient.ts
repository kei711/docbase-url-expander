import axios, { AxiosInstance } from 'axios';
import { LRUMap } from 'lru_map';

export class DocbaseClient {
  private lruMap = new LRUMap<string, Post>(100);
  private client: AxiosInstance;

  constructor() {
    if (!process.env.DOCBASE_ACCESS_TOKEN || !process.env.DOCBASE_TEAM_NAME) {
      throw new Error('Environment variables are not set');
    }

    this.client = axios.create({
      baseURL: 'https://api.docbase.io',
      headers: {
        'Content-Type': 'application/json',
        'X-DocBaseToken': process.env.DOCBASE_ACCESS_TOKEN ?? '',
      },
      responseType: 'json',
    });
  }

  async fetchPost(id: string): Promise<Post | null> {
    if (id.length === 0) {
      throw new Error('Invalid argument');
    }
    if (this.lruMap.has(id)) {
      return this.lruMap.get(id) ?? null;
    }

    try {
      const response = await this.client.get<Post>(
        `/teams/${process.env.DOCBASE_TEAM_NAME}/posts/${id}`
      );
      const post = response.data;
      this.lruMap.set(id, post);
      return post;
    } catch (err) {
      return null;
    }
  }
}

interface Post {
  id: number;
  title: string;
  body: string;
  draft: boolean;
  archived: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  tags: Array<{ name: string }>;
  scope: 'group';
  sharing_url: string;
  representative_image_url: string;
  user: {
    id: number;
    name: string;
    profile_image_url: string;
  };
  stars_count: number;
  good_jobs_count: number;
  comments: [];
  groups: [{ id: number; name: string }];
  attachments: [
    {
      id: string;
      name: string;
      size: number;
      url: string;
      markdown: string;
      created_at: string;
    }
  ];
}

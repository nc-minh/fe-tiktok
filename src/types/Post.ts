import { UserInfo } from './User';

export interface GetPostPayload {
  userId: string;
  pageSize?: number;
}

export interface ResponsePostType {
  category_id: [];
  contents?: number;
  media_url: string;
  reaction_count: number;
  view_count: number;
  _id: string;
}

export interface ResponseGetPostType {
  post?: ResponsePostType[];
  user?: UserInfo[];
}

export interface CreatePostPayload {
  contents?: string;
  media_url?: string;
}

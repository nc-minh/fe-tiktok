import { UserInfo } from './User';

export interface GetPostPayload {
  userId: string;
  pageSize?: number;
}

export interface ResponsePostType {
  category_id: [];
  contents?: string;
  media_url: string;
  reaction_count: number;
  view_count: number;
  comment_count: number;
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

export interface PostInfoType {
  _id: string;
  media_url?: string;
  reaction_count: number;
  view_count: number;
  comment_count: number;
  contents: string;
  user_id: {
    _id: string;
    fullname: string;
    username: string;
    avatar: string;
    tick: boolean;
  };
}

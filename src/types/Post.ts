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
  isReaction: {
    _id: string;
  }[];
}

export interface ViewPostRes {
  _id: string;
  user_id: string;
  contents: string;
  media_url?: string;
  reaction_count: number;
  view_count: number;
  category_id: [];
  comment_count: number;
}

export interface PostTrends {
  _id: string;
  user_id: {
    _id: string;
    fullname: string;
    username: string;
    avatar: string;
    tick: boolean;
  };
  contents: string;
  media_url?: string;
  reaction_count: number;
  view_count: number;
  category_id: [];
  comment_count: number;
  isFollow?: boolean;
  isReaction?: boolean;
  created_at?: string;
  updated_at?: string;
}
export interface PostTrendsPayload {
  pageSize: number;
  currentPage: number;
}

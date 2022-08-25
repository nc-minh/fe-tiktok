export interface CommentInfoType {
  comment_reaction_count: number;
  contents: string;
  created_at: string;
  updated_at: string;
  post_id: string;
  user_id: {
    _id: string;
    fullname: string;
    username: string;
    avatar: string;
    tick: boolean;
  };
  _id: string;
}

export interface CommentPayload {
  post_id: string;
  contents: string;
}

export interface CommentRes {
  _id: string;
  user_id: string;
  post_id: string;
  contents: string;
  comment_reaction_count: number;
  created_at: string;
  updated_at: string;
}

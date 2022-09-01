export interface FollowType {
  follow_id: string;
}

export interface FollowingsType {
  user_id: string;
}

export interface UserFollowingsType {
  avatar: string;
  fullname: string;
  username: string;
  _id: string;
  tick: boolean;
}
export interface FollowingsResponseType {
  _id: string;
  follow_id: UserFollowingsType;
  user_id: UserFollowingsType;
  created_at?: Date;
  updated_at?: Date;
}

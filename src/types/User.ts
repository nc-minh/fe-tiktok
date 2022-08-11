export interface UserInfo {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  bio: string;
  tick: boolean;
  followings_count: number;
  followers_count: number;
  isFollow?: boolean;
  likes_count: number;
  website_url: string;
  social_network: [];
  created_at?: Date;
  updated_at?: Date;
}

export interface UpdateUserType {
  fullname?: string;
  username?: string;
  avatar?: string;
  bio?: string;
  website_url?: string;
  social_network?: [];
}

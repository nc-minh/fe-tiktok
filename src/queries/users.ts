import { useQuery } from '@tanstack/react-query';
import { getUserInfo, getUserByUsername } from 'services/user';
import { searchUsers } from 'services/search';
import { SearchUsersPayload } from 'types/Search';

import { STALE_TIME } from 'utils/constants';

export const useGetUserInfo = (enabled: boolean) =>
  useQuery(['user-info', enabled], () => getUserInfo(), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled: enabled,
  });

export const useSearchUsers = (payload: SearchUsersPayload, enabled: boolean) =>
  useQuery(['search-users', payload], () => searchUsers(payload, 0), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled: enabled,
  });

export const useGetUserByUsername = (username: string, enabled: boolean) =>
  useQuery(
    ['user-info', username, enabled],
    () => getUserByUsername(username),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: enabled,
    },
  );

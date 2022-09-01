import { useQuery } from '@tanstack/react-query';
import {
  getUserInfo,
  getUserByUsername,
  getSuggestedAccounts,
} from 'services/user';
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
    ['user-info-by-name', username, enabled],
    () => getUserByUsername(username),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: enabled,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

export const useGetSuggestedAccounts = (
  pageSize: number,
  currentPage: number,
  enabled: boolean,
) =>
  useQuery(
    ['suggested-accounts', enabled, pageSize, currentPage],
    () => getSuggestedAccounts(pageSize, currentPage),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: enabled,
    },
  );

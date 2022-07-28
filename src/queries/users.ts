import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'services/core';
import { searchUsers } from 'services/search';
import { SearchUsersPayload } from 'types/Search';

import { STALE_TIME } from 'utils/constants';

export const useGetUsers = () =>
  useQuery(['user'], () => getUsers(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useSearchUsers = (payload: SearchUsersPayload, enabled: boolean) =>
  useQuery(['search-users', payload], () => searchUsers(payload, 0), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled: enabled,
  });

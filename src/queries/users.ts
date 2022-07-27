import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'services/core';

import { STALE_TIME } from 'utils/constants';

export const useGetUsers = () =>
  useQuery(['user'], () => getUsers(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

import { useMutation } from '@tanstack/react-query';
import { follow } from 'services/follow';
import { FollowType } from 'types/Follow';

export const useFollow = () =>
  useMutation((payload: FollowType) => follow(payload));

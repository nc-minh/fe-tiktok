import { useMutation } from '@tanstack/react-query';
import { updateUser, updateAvatar } from 'services/user';
import { UpdateUserType } from 'types/User';

export const useUpdateUser = () =>
  useMutation((payload: UpdateUserType) => updateUser(payload));

export const useUpdateAvatar = () =>
  useMutation((avatar: FormData) => updateAvatar(avatar));

import { useMutation } from '@tanstack/react-query';
import { signup, login } from 'services/auth';
import { SignupDataType, LoginType } from 'types/Auth';

export const useSignup = () =>
  useMutation((payload: SignupDataType) => signup(payload));

export const useLogin = () =>
  useMutation((payload: LoginType) => login(payload));

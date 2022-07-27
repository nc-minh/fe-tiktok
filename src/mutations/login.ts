import { useMutation } from '@tanstack/react-query';
import { createUser } from 'services/core';

export const useCreateUser = () => useMutation(payload => createUser(payload));

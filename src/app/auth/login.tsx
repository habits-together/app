import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { useAuth } from '@/core';
import {
  Button,
  ControlledInput,
  Header,
  ScreenContainer,
  Text,
  View,
} from '@/ui';

export const passwordSchema = z.object({
  email: z.string(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type PasswordFormType = z.infer<typeof passwordSchema>;

export default function Login() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const { handleSubmit, control } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email,
      password: '123456',
    },
  });

  const onSubmit: SubmitHandler<PasswordFormType> = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex flex-1 flex-col gap-4">
          <Header leftButton={'back'} />
          <ControlledInput
            control={control}
            name="password"
            label={`Enter Password for ${email}`}
            placeholder="***"
            secureTextEntry={true}
          />
          <Text
            className="text-center text-slate-500 underline"
            onPress={() =>
              router.push({
                pathname: '/auth/password-reset',
                params: { email },
              })
            }
          >
            Forgot Password?
          </Text>
          <Button label="Login" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { auth } from '@/api/common/firebase';
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
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, setError } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email,
      password: '',
    },
  });
  const onSubmit: SubmitHandler<PasswordFormType> = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      console.error('Login Error:', error);
      setError('password', { message: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordReset = async (email: string) => {
    if (!email) {
      console.error('Error', 'Please enter a valid email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      router.push({
        pathname: '/auth/password-reset',
        params: { email },
      });
    } catch (error: any) {
      const errorMessage = error.message;
      console.error('Password Reset Error:', errorMessage);
    }
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
            onPress={() => handlePasswordReset(email)}
          >
            Forgot Password?
          </Text>
          <Button
            label="Login"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

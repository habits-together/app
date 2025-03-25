import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { useAuth } from '@/core';
import { Button, ControlledInput, Header, ScreenContainer, View } from '@/ui';

import { TermsAndConditions } from '.';
import { type PasswordFormType, passwordSchema } from './login';

export default function SignUp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const signUp = useAuth.use.signUp();
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
      await signUp(data.email, data.password);
      router.push('/auth/create-profile');
    } catch (error: any) {
      console.error('Login Error:', error);
      setError('password', { message: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
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
            label="Create Password"
            placeholder="*********"
            secureTextEntry={true}
          />
          <TermsAndConditions />
          <Button
            label="Sign Up"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

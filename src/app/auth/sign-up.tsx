import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
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
  // TODO: replace with sign up function
  const signUp = useAuth.use.signIn();

  const { handleSubmit, control } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email,
      password: '123456',
    },
  });

  const onSubmit: SubmitHandler<PasswordFormType> = (data) => {
    console.log('submitting data');
    console.log(data);
    signUp({ access: 'access-token', refresh: 'refresh-token' });
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
            label="Create Password"
            placeholder="***"
            secureTextEntry={true}
          />
          <TermsAndConditions />
          <Button label="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

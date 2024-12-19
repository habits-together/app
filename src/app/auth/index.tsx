import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import Logo from '@/components/logo';
import { Button, ControlledInput, ScreenContainer, Text, View } from '@/ui';

const emailSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

type EmailFormType = z.infer<typeof emailSchema>;

// eslint-disable-next-line max-lines-per-function
export default function Auth() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<EmailFormType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: 'test@gmail.com',
    },
  });

  const { colorScheme } = useColorScheme();
  const appleIconWhite = require('/assets/apple-icon-white.png');
  const appleIconBlack = require('/assets/apple-icon-black.png');

  // eslint-disable-next-line unused-imports/no-unused-vars
  const checkUserExists = async (email: string) => {
    return true; // Change as needed
  };

  const onSubmit = async (data: EmailFormType) => {
    const userExists = await checkUserExists(data.email);
    if (userExists) {
      router.push({
        pathname: '/auth/login',
        params: { email: data.email },
      });
    } else {
      router.push({ pathname: '/auth/sign-up', params: { email: data.email } });
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex flex-1 flex-col justify-center gap-4">
          <View className="flex-row gap-2">
            <Logo />
            <Text testID="form-title" className="text-xl font-semibold">
              Habits Together
            </Text>
          </View>
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
          />
          <Button
            label="Continue With Email"
            onPress={handleSubmit(onSubmit)}
          />
          <View className="flex-row items-center gap-3">
            <View className="h-px flex-1 bg-slate-300 dark:bg-stone-600" />
            <Text className="text-slate-300">OR</Text>
            <View className="h-px flex-1 bg-slate-300 dark:bg-stone-600" />
          </View>

          <Button
            label="Continue With Google"
            onPress={handleSubmit(onSubmit)}
            variant="outline"
            iconImage={require('/assets/google-icon.png')}
          />
          <Button
            label="Continue With Apple"
            onPress={handleSubmit(onSubmit)}
            variant="outline"
            iconImage={colorScheme === 'dark' ? appleIconWhite : appleIconBlack}
          />
          <TermsAndConditions />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

export const TermsAndConditions = () => {
  return (
    <View className="flex-row justify-center">
      <Text className="text-center text-slate-500">
        By continuing, I agree to the{'\n'}
        <Text
          className="text-slate-500 underline"
          onPress={() => {
            // Handle Terms & Conditions link press
          }}
        >
          Terms & Conditions
        </Text>{' '}
        and{' '}
        <Text
          className="text-slate-500 underline"
          onPress={() => {
            // Handle Privacy Policy link press
          }}
        >
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { httpsCallable } from 'firebase/functions';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { functions } from '@/api/common/firebase';
import Logo from '@/components/logo';
import { Button, ControlledInput, ScreenContainer, Text, View } from '@/ui';

const userExistsSchema = z.object({
  exists: z.boolean(),
});

const emailSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

type EmailFormType = z.infer<typeof emailSchema>;

export default function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<EmailFormType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const { colorScheme } = useColorScheme();
  const appleIconWhite = require('/assets/apple-icon-white.png');
  const appleIconBlack = require('/assets/apple-icon-black.png');

  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      const checkUser = httpsCallable(functions, 'checkUserExistsInAuth');
      const response = await checkUser({ email });
      const data = userExistsSchema.parse(response.data);
      return data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const onSubmit = async (data: EmailFormType) => {
    setIsLoading(true);
    try {
      const userExists = await checkUserExists(data.email);
      router.push({
        pathname: userExists ? '/auth/login' : '/auth/sign-up',
        params: { email: data.email },
      });
    } catch (error) {
      console.error(error);
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
            loading={isLoading}
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

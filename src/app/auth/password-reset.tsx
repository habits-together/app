import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Button, Header, ScreenContainer, Text, View } from '@/ui';

export default function PasswordReset() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();

  useEffect(() => {
    // TODO: send password reset email
    console.log('Sending password reset email to', email);
  }, [email]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex flex-1 flex-col gap-4">
          <Header leftButton={'back'} />
          <Text className="text-center text-slate-500">
            A password reset link has been sent to{'\n'}
            {email}
          </Text>
          <Button label="Back to Login" onPress={() => router.back()} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

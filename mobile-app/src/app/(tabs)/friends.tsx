import React from 'react';

import { FocusAwareStatusBar, SafeAreaView, Text } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView className="pt-16">
      <FocusAwareStatusBar />
      <Text>this is a page</Text>
    </SafeAreaView>
  );
}

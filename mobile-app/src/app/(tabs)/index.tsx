import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Post } from '@/api';
// import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

export default function Feed() {
  const { data, isPending, isError } = {
    data: [],
    isPending: false,
    isError: false,
  };
  // const { data, isPending, isError } = usePosts();
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    [],
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />
    </SafeAreaView>
  );
}

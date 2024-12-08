import * as React from 'react';
import { useState } from 'react';

import { useUserSearch } from '@/api/users/use-user-search';
import { ErrorMessage } from '@/components/error-message';
import UserCard from '@/components/user-card';
import {
  Button,
  Header,
  Input,
  LoadingSpinner,
  ScreenContainer,
  ScrollView,
  Text,
  View,
} from '@/ui';

export default function AddFriends() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending, isError, error, refetch } = useUserSearch({
    variables: { query: searchTerm },
    enabled: searchTerm.length > 0,
  });

  const handleSearch = () => {
    setSearchTerm(query);
  };

  return (
    <ScreenContainer>
      <Header title="Add Friends" leftButton="back" />
      <View className="flex flex-1 flex-col gap-4">
        <View className="flex flex-col gap-1">
          <Text className="text-sm font-medium">Search for someone...</Text>
          <View className="flex w-full flex-row gap-2">
            <View className="flex-1">
              <Input
                placeholder="Enter username..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
              />
            </View>
            <Button
              onPress={handleSearch}
              label="Search"
              className="h-fit rounded-lg"
            />
          </View>
        </View>
        <View className="flex flex-1 flex-col gap-2">
          <Text className="text-lg font-semibold">Search Results</Text>
          <ScrollView className="flex-1">
            {searchTerm.length > 0 && (
              <View className="">
                {isPending ? (
                  <LoadingSpinner />
                ) : isError ? (
                  <ErrorMessage error={error} refetch={refetch} />
                ) : data.length === 0 || data === undefined ? (
                  <Text className="text-center text-stone-400 dark:text-stone-400">
                    No users found
                  </Text>
                ) : (
                  data.map((user) => <UserCard key={user.id} data={user} />)
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
}

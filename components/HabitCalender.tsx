import React from 'react';
import { View, Text } from 'react-native';

const WeekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HabitCalender() {
    // This is an example data structure that you might use
    // The value can be an indicator of how 'active' the day was,
    // which can correspond to different shades of color.
    const activityData = new Array(56).fill(0).map((_, index) => ({
        day: index % 7,
        value: Math.floor(Math.random() * 3), // 0, 1, or 2 for example purposes
    }));

    const getColorForValue = (value: any) => {
        switch (value) {
            case 0:
                return 'bg-orange-100'; // Lightest shade
            case 1:
                return 'bg-orange-300'; // Medium shade
            case 2:
                return 'bg-orange-500'; // Darkest shade
            default:
                return 'bg-orange-100';
        }
    };

    return (
        <View className="flex flex-row flex-wrap w-full p-4 bg-orange-light rounded-lg">
            {WeekDays.map((day, index) => (
                <Text key={index} className="w-1/7 text-center text-gray-600 font-bold">
                    {day}
                </Text>
            ))}
            {activityData.map((data, index) => (
                <View key={index} className={`w-1/7 h-6 ${getColorForValue(data.value)} rounded m-0.5`} />
            ))}
        </View>
    );
};
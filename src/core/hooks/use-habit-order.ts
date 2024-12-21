/* eslint-disable max-lines-per-function */
import { useCallback, useMemo } from 'react';
import { MMKV, useMMKVString } from 'react-native-mmkv';

import { type HabitIdT } from '@/api';

const HABIT_ORDER_KEY = 'habit-order';

// Types
type HabitOrder = HabitIdT[];
type Direction = 'up' | 'down';

export function useHabitOrder() {
  const [order, setOrder] = useMMKVString(HABIT_ORDER_KEY);
  const parsedOrder = useMemo<HabitOrder>(
    () => (order ? JSON.parse(order) : []),
    [order],
  );

  const initializeOrder = useCallback(
    (habitIds: HabitIdT[]) => {
      if (!parsedOrder.length) {
        setOrder(JSON.stringify(habitIds));
      }
    },
    [parsedOrder.length, setOrder],
  );

  const canMoveHabit = useCallback(
    (habitId: HabitIdT, direction: Direction) => {
      const currentIndex = parsedOrder.indexOf(habitId);
      if (currentIndex === -1) return false;

      if (direction === 'up' && currentIndex === 0) return false;
      if (direction === 'down' && currentIndex === parsedOrder.length - 1)
        return false;

      return true;
    },
    [parsedOrder],
  );

  const moveHabit = useCallback(
    (habitId: HabitIdT, direction: Direction) => {
      if (!canMoveHabit(habitId, direction)) return;

      const currentIndex = parsedOrder.indexOf(habitId);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const newOrder = [...parsedOrder];
      [newOrder[currentIndex], newOrder[newIndex]] = [
        newOrder[newIndex],
        newOrder[currentIndex],
      ];

      setOrder(JSON.stringify(newOrder));
    },
    [parsedOrder, setOrder, canMoveHabit],
  );

  const sortHabits = useCallback(
    <T extends { id: HabitIdT }>(habits: T[]): T[] => {
      if (!parsedOrder.length) return habits;
      return [...habits].sort(
        (a, b) => parsedOrder.indexOf(a.id) - parsedOrder.indexOf(b.id),
      );
    },
    [parsedOrder],
  );

  return {
    order: parsedOrder,
    moveHabit,
    canMoveHabit,
    initializeOrder,
    sortHabits,
  };
}

export function addHabitToOrder(habitId: HabitIdT) {
  const storage = new MMKV();
  const currentOrder = storage.getString(HABIT_ORDER_KEY);
  if (!currentOrder) {
    return storage.set(HABIT_ORDER_KEY, JSON.stringify([habitId]));
  }
  const parsedOrder: HabitIdT[] = JSON.parse(currentOrder);
  return storage.set(
    HABIT_ORDER_KEY,
    JSON.stringify([habitId, ...parsedOrder]),
  );
}

import LottieView from 'lottie-react-native';
import React, { createContext, useContext } from 'react';

import { View } from '@/ui';

interface ConfettiContextType {
  playConfetti: (x: number, y: number) => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined,
);

interface ConfettiInstance {
  id: number;
  x: number;
  y: number;
}

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [confettiInstances, setConfettiInstances] = React.useState<
    ConfettiInstance[]
  >([]);

  const playConfetti = (x: number, y: number) => {
    setConfettiInstances((prev) => [
      ...prev,
      {
        id: Math.random(),
        x,
        y,
      },
    ]);
  };

  const removeConfetti = (id: number) => {
    setConfettiInstances((prev) =>
      prev.filter((instance) => instance.id !== id),
    );
  };

  const size = 1000;
  const offset = size / 2;

  return (
    <ConfettiContext.Provider value={{ playConfetti }}>
      {children}
      <View className="container pointer-events-none absolute inset-0 scale-50">
        {confettiInstances.map(({ id, x, y }) => (
          <LottieView
            key={id}
            source={require('../../assets/confetti.json')}
            autoPlay
            loop={false}
            resizeMode="contain"
            speed={1.5}
            onAnimationFinish={() => removeConfetti(id)}
            style={{
              position: 'absolute',
              top: y * 2 - 80,
              left: x * 2 - 212,
              width: size,
              height: size,
              zIndex: 1000,
              transform: [{ translateX: -offset }, { translateY: -offset }],
              pointerEvents: 'none',
            }}
          />
        ))}
      </View>
    </ConfettiContext.Provider>
  );
}

export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error('useConfetti must be used within a ConfettiProvider');
  }
  return context;
}

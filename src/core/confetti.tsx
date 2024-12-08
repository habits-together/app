import LottieView from 'lottie-react-native';
import React, { createContext, useContext } from 'react';
import { Platform } from 'react-native';

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

  return (
    <ConfettiContext.Provider value={{ playConfetti }}>
      {children}
      <View className="container pointer-events-none absolute inset-0">
        {confettiInstances.map(({ id, x, y }) => (
          <ConfettiAnimation
            key={id}
            id={id}
            x={x}
            y={y}
            removeConfetti={removeConfetti}
          />
        ))}
      </View>
    </ConfettiContext.Provider>
  );
}

/**
 * Different confetti animations for iOS and Android because of issues lol
 */
const ConfettiAnimation = ({
  id,
  x,
  y,
  removeConfetti,
}: {
  id: number;
  x: number;
  y: number;
  removeConfetti: (id: number) => void;
}) => {
  if (Platform.OS === 'ios') {
    const size = 500;
    const offset = size / 2;
    return (
      <LottieView
        key={id}
        source={require('../../assets/confetti-ios.json')}
        autoPlay={true}
        loop={false}
        resizeMode="contain"
        speed={1.5}
        onAnimationFinish={() => removeConfetti(id)}
        style={{
          position: 'absolute',
          top: y - size * 0.083,
          left: x,
          width: size,
          height: size,
          zIndex: 1000,
          transform: [{ translateX: -offset }, { translateY: -offset }],
          pointerEvents: 'none',
        }}
      />
    );
  } else if (Platform.OS === 'android') {
    const size = 500;
    const offset = size / 2;
    return (
      <LottieView
        key={id}
        source={require('../../assets/confetti-android.json')}
        autoPlay={true}
        loop={false}
        resizeMode="contain"
        speed={1}
        onAnimationFinish={() => removeConfetti(id)}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: size,
          height: size,
          zIndex: 1000,
          transform: [{ translateX: -offset }, { translateY: -offset }],
          pointerEvents: 'none',
        }}
      />
    );
  } else {
    throw new Error('Unsupported platform');
  }
};

export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error('useConfetti must be used within a ConfettiProvider');
  }
  return context;
}

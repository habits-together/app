import type { LucideIcon as LucideIconType } from 'lucide-react-native';
import React from 'react';
import type { ImageSourcePropType, PressableProps } from 'react-native';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { LucideIcon } from '@/ui/lucide-icon';

const button = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-full px-4',
    label: 'font-inter text-base',
    indicator: 'h-6 text-white',
  },

  variants: {
    variant: {
      default: {
        container: 'bg-black dark:bg-white',
        label: 'text-white dark:text-black',
        indicator: 'text-white dark:text-black',
      },
      secondary: {
        container: 'bg-primary-600',
        label: 'text-secondary-600',
        indicator: 'text-white',
      },
      outline: {
        container:
          'border border-slate-200 bg-white dark:border-stone-700 dark:bg-transparent',
        label: 'text-black dark:text-neutral-100',
        indicator: 'text-black dark:text-neutral-100',
      },
      destructive: {
        container:
          'border border-red-200 bg-white dark:border-red-500 dark:bg-red-500/5',
        label: 'font-medium text-red-500',
        indicator: 'text-red-500',
      },
      ghost: {
        container: 'bg-transparent',
        label: 'text-black underline dark:text-white',
        indicator: 'text-black dark:text-white',
      },
      link: {
        container: 'bg-transparent',
        label: 'text-black',
        indicator: 'text-black',
      },
      item: {
        container:
          'rounded-md border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800',
        label: 'text-black dark:text-neutral-100',
        indicator: 'text-black dark:text-neutral-100',
      },
    },
    size: {
      default: {
        container: 'h-12 px-4',
        label: 'text-base',
      },
      lg: {
        container: 'h-12 px-8',
        label: 'text-xl',
      },
      sm: {
        container: 'h-8 px-4',
        label: 'text-base',
        indicator: 'h-2',
      },
      icon: { container: 'h-9 w-9' },
    },
    disabled: {
      true: {
        container: 'opacity-60',
        label: 'opacity-60',
        indicator: 'opacity-60',
      },
    },
    fullWidth: {
      true: {
        container: '',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
    fullWidth: true,
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  icon?: LucideIconType;
  iconImage?: ImageSourcePropType;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      className = '',
      testID,
      textClassName = '',
      icon: Icon,
      iconImage,
      ...props
    },
    ref,
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size }),
      [variant, disabled, size],
    );

    return (
      <Pressable
        disabled={disabled || loading}
        className={styles.container({ className })}
        {...props}
        ref={ref}
        testID={testID}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {loading ? (
              <ActivityIndicator
                size="small"
                className={styles.indicator()}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <View className="flex-row items-center gap-2">
                {Icon && (
                  <LucideIcon
                    Icon={Icon}
                    size={16}
                    className={styles.label({ className: textClassName })}
                  />
                )}
                {iconImage && (
                  <Image
                    source={iconImage}
                    style={{ width: 16, height: 16 }}
                    resizeMode="contain"
                  />
                )}
                <Text
                  testID={testID ? `${testID}-label` : undefined}
                  className={styles.label({ className: textClassName })}
                >
                  {text}
                </Text>
              </View>
            )}
          </>
        )}
      </Pressable>
    );
  },
);

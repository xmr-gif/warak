import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 shadow-none',
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: 'bg-[#C9B8FF] active:bg-[#BBA7FF] shadow-sm',
        secondary: 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] active:bg-[rgba(255,255,255,0.08)]',
        outline: 'border border-[rgba(255,255,255,0.09)] bg-transparent active:bg-[rgba(255,255,255,0.04)]',
        ghost: 'bg-transparent active:bg-[rgba(255,255,255,0.06)]',
        destructive: 'bg-[#F472B6] active:bg-[#F472B6]/90',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-14 px-6 rounded-[18px]', // 56 pt height as per MVP spec
        sm: 'h-10 px-4 rounded-[14px] gap-1.5',
        lg: 'h-14 px-8 rounded-[18px]',
        icon: 'h-11 w-11 rounded-full items-center justify-center',
        pill: 'h-11 px-5 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-base font-semibold',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-[#1A1033]',
        secondary: 'text-[#F4F2FB]',
        outline: 'text-[#F4F2FB]',
        ghost: 'text-[#F4F2FB]',
        destructive: 'text-[#1A1033]',
        link: 'text-[#C9B8FF] underline',
      },
      size: {
        default: 'text-[16px]',
        sm: 'text-[14px]',
        lg: 'text-[16px]',
        icon: 'text-[15px]',
        pill: 'text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
        role="button"
        {...props}>
        {children}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

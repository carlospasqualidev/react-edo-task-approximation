/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

const badgeButtonVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-s font-semibold transition-colors transition-all duration-500 ease-in-out tracking-tight hover:scale-105',
  {
    variants: {
      variant: {
        default:
          ' bg-primary/80 border-transparent text-foreground hover:bg-primary/100',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeButtonVariants> {
  asChild?: boolean;
}

const BadgeButton = React.forwardRef<HTMLButtonElement, BadgeButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(badgeButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
BadgeButton.displayName = 'Button';

export { BadgeButton, badgeButtonVariants };

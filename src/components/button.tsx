import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'font-medium rounded-lg px-5 py-2 flex items-center shrink-0 justify-center gap-2 motion-safe:transition-all',
  variants: {
    variantColor: {
      primary: 'bg-lime-300 text-lime-950  hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
    },
    variantSize: {
      sm: 'h-9',
      md: 'h-11',
    },
  },
});

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({
  children,
  variantColor,
  variantSize,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({ variantColor, variantSize })}
    >
      {children}
    </button>
  );
}

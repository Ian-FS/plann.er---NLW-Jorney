import { ComponentProps, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: 'flex items-center text-zinc-400 group',
  variants: {
    variantType: {
      sm: 'gap-2 flex-1',
      md: 'gap-2.5 h-14 rounded-lg px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus-within:border-lime-300 ',
      MdflexGrow:
        'flex-grow gap-2.5 h-14 rounded-lg px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus-within:border-lime-300 ',
    },
    variantEdit: {
      edit: 'outline-lime-300 rounded-md border-zinc-100 text-lg font-normal',
      noedit: 'text-lg font-normal',
    },
  },
});

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  children: ReactNode;
}

export default function Input({
  children,
  variantType,
  variantEdit,
  ...props
}: InputProps) {
  return (
    <div className={inputVariants({ variantType })}>
      <span className="group-focus-within:text-white">{children}</span>
      <input
        className={`flex-1 bg-transparent outline-none text-base font-normal focus-within:text-white ${inputVariants(
          { variantEdit },
        )}`}
        {...props}
      />
    </div>
  );
}

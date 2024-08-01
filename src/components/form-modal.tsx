import { X } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const formVariants = tv({
  variants: {
    variantDate: {
      dateFit: 'w-fit',
    },
  },
});

interface FormModalProps
  extends ComponentProps<'form'>,
    VariantProps<typeof formVariants> {
  inputComponent?: ReactNode;
  buttonComponent?: ReactNode;
  titleFormModal: string;
  detailsFormModal?: ReactNode;
  onClickClose?: () => void;
}

export default function FormModal({
  detailsFormModal,
  inputComponent,
  buttonComponent,
  titleFormModal,
  onClickClose,
  variantDate,
  ...props
}: FormModalProps) {
  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center">
      <div
        className={`w-[540px] px-6 py-5 space-y-2 rounded-xl bg-zinc-900 shadow-modalConfirmation ${formVariants(
          { variantDate },
        )}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold text-lg">
              {titleFormModal}
            </h1>
            <button onClick={onClickClose}>
              <X className="size-5 hover:bg-zinc-400 rounded-md hover:text-zinc-900 motion-safe:transition-all" />
            </button>
          </div>
        </div>
        <p className="text-left text-zinc-400 text-sm font-normal">
          {detailsFormModal}
        </p>
        <form {...props} className="flex flex-col gap-4">
          <div className="space-y-2">{inputComponent}</div>
          {buttonComponent}
        </form>
      </div>
    </div>
  );
}

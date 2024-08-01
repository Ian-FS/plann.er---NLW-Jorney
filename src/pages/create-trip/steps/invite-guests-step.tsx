import { ArrowRight, UserRoundPlus } from 'lucide-react';
import Button from '../../../components/button';

type InviteGuestsStepProps = {
  openGuestModal: () => void;
  openConfirmationModal: () => void;
  guestsEmail: string[];
};

export default function InviteGuestsStep({
  guestsEmail,
  openConfirmationModal,
  openGuestModal,
}: InviteGuestsStepProps) {
  return (
    <div className="flex justify-between rounded-xl bg-zinc-900 px-4 h-16 items-center shadow-boxCustonShape gap-5">
      <button
        type="button"
        onClick={openGuestModal}
        className="flex items-center gap-2 w-full group "
      >
        <UserRoundPlus className="size-5 text-zinc-400 group-focus-within:text-white" />
        {guestsEmail.length > 0 ? (
          <span className="bg-transparent text-lg grow text-left text-zinc-100">
            {`${guestsEmail.length} pessoa(s) convidada(s)`}
          </span>
        ) : (
          <span className="bg-transparent text-lg grow text-left text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <Button
        onClick={openConfirmationModal}
        variantSize="sm"
        variantColor="primary"
      >
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

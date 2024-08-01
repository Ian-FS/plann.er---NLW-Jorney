import { X, AtSign, Plus } from 'lucide-react';
import Button from '../../components/button';
import Input from '../../components/input';

type InviteGuestsModalProps = {
  closeGuestModal: React.MouseEventHandler<HTMLButtonElement>;
  guestsEmail: string[];
  setGuestsEmail: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function InviteGuestsModal({
  closeGuestModal,
  guestsEmail,
  setGuestsEmail,
}: InviteGuestsModalProps) {
  function addGuestEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newEmail = data.get('email')?.toString();

    if (newEmail && !guestsEmail.includes(newEmail)) {
      setGuestsEmail([...guestsEmail, newEmail]);
      event.currentTarget.reset();
    }
  }

  function removeGuestEmail(removedEmail: string) {
    const newGuestsEmail = guestsEmail.filter(
      (email) => removedEmail !== email,
    );
    setGuestsEmail(newGuestsEmail);
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[640px] bg-zinc-900 px-6 py-5 space-y-3 rounded-xl shadow-boxCustonShape">
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-white font-semibold">
              Selecionar convidados
            </h1>
            <button onClick={closeGuestModal}>
              <X className="size-5 text-zinc-400 hover:bg-zinc-400 rounded-md hover:text-zinc-900 motion-safe:transition-all"></X>{' '}
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div>
          <div className="flex gap-2 flex-wrap">
            {guestsEmail.map((guestEmail) => (
              <div
                key={guestEmail}
                className="flex items-center w-fit gap-[10px] px-[10px] py-[6px] bg-zinc-800 rounded-[6px]"
              >
                <span className="text-zinc-300 text-base">{guestEmail}</span>
                <button
                  type="button"
                  onClick={() => removeGuestEmail(guestEmail)}
                >
                  <X className="size-5 hover:bg-zinc-400 rounded-md hover:text-zinc-900 motion-safe:transition-all" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-800 h-[1px]"></div>

        <form
          onSubmit={addGuestEmail}
          className="flex items-center bg-zinc-950 h-14 w-[592px] px-4 py-[10px] rounded-lg space-x-2"
        >
          <Input
            variantType="sm"
            children={<AtSign className="size-5" />}
            placeholder="Digite o e-mail do convidado?"
            name="email"
            type="email"
          />
          <Button type="submit" variantColor="primary" variantSize="sm">
            Convidar <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

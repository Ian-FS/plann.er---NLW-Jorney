import { useState } from 'react';
import InviteGuestsModal from './invite-guests-model';
import ConfirmTripModal from './confirm-trip-modal';
import DestinationAndDateStep from './steps/destination-and-date-step';
import InviteGuestsStep from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';

export function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isOpenRangeDate, setIsOpenRangeDate] = useState(false);
  const [isLoadingCreateTrip, setIsLoadingCreateTrip] = useState(false);

  const [guestsEmail, setGuestsEmail] = useState<string[]>([]);
  const [local, setLocal] = useState<string | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  function openGuestInput() {
    if (!local || !range) return;
    setIsGuestInputOpen(true);
  }
  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }
  function openGuestModal() {
    setIsGuestModalOpen(true);
  }
  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }
  function openConfirmationModal() {
    if (!local || !range?.from || !range.to) return;
    setIsConfirmationModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmationModalOpen(false);
  }
  function handleOpenAndCloseRangeDate() {
    if (isGuestInputOpen) return;
    setIsOpenRangeDate((prevStat) => !prevStat);
  }

  function openLoadingModal() {
    setIsLoadingCreateTrip(true);
  }
  function closeLoadingModal() {
    setIsLoadingCreateTrip(false);
  }
  function resetFormOwnerNameAndEmail() {
    setOwnerName('');
    setOwnerEmail('');
  }

  function handleAddLocalTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newLocal = data.get('local')?.toString();
    console.log(newLocal);
    if (newLocal) {
      setLocal(newLocal);
    }
  }

  const navigate = useNavigate();

  async function createTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ownerName.length < 3 || ownerEmail.length < 3) return;
    if (!range?.from || !range?.to) return;
    openLoadingModal();

    const res = await api.post('/trips', {
      destination: local,
      starts_at: range.from,
      ends_at: range.to,
      emails_to_invite: guestsEmail,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });
    const { tripId } = await res.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-square bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img className="w-min" src="/Logo.svg" alt="logo" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            handleAddLocalTrip={handleAddLocalTrip}
            range={range}
            setRange={setRange}
            local={local}
            setLocal={setLocal}
            handleOpenAndCloseRangeDate={handleOpenAndCloseRangeDate}
            isOpenRangeDate={isOpenRangeDate}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep
              guestsEmail={guestsEmail}
              openConfirmationModal={openConfirmationModal}
              openGuestModal={openGuestModal}
            />
          )}

          {isGuestModalOpen && (
            <InviteGuestsModal
              closeGuestModal={closeGuestModal}
              guestsEmail={guestsEmail && guestsEmail}
              setGuestsEmail={setGuestsEmail}
            />
          )}

          {isConfirmationModalOpen && (
            <ConfirmTripModal
              closeConfirmTripModal={closeConfirmTripModal}
              createTrip={createTrip}
              local={local}
              range={range}
              ownerEmail={ownerEmail}
              ownerName={ownerName}
              setOwnerEmail={setOwnerEmail}
              setOwnerName={setOwnerName}
              isLoadingCreateTrip={isLoadingCreateTrip}
              closeLoadingModal={closeLoadingModal}
              resetFormOwnerNameAndEmail={resetFormOwnerNameAndEmail}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{' '}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{' '}
          e{' '}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}

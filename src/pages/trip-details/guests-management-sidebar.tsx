import { UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../components/button';
import Guest from '../../components/guest';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface GuestsManagementSidebarProps {
  handleOpenCloseConfirmationModal: () => void;
}
interface ParticipantsProps {
  id: string;
  name?: string;
  email: string;
  is_confirmed: boolean;
}

export default function GuestsManagementSidebar({
  handleOpenCloseConfirmationModal,
}: GuestsManagementSidebarProps) {
  const [participants, setParticipants] = useState<Array<ParticipantsProps>>();

  const { tripId } = useParams();

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((res) => {
      setParticipants(res.data.participants);
    });
  }, [tripId]);

  return (
    <div className="rounded-b-xl flex flex-col gap-6">
      <h2 className="text-zinc-50 text-xl font-semibold">Convidados</h2>
      <div className="flex flex-col gap-5">
        {participants &&
          participants.map((participant, index) => (
            <Guest
              key={participant.id}
              email={participant.email}
              name={participant.name}
              isConfirmed={participant.is_confirmed}
              id={participant.id}
              index={index}
            />
          ))}
      </div>
      <Button
        onClick={handleOpenCloseConfirmationModal}
        variantColor="secondary"
        variantSize="md"
      >
        <UserCog className="size-5 group-hover:text-white" />
        Gerenciar convidados
      </Button>
    </div>
  );
}

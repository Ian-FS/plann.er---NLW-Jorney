import { Mail, User } from 'lucide-react';
import Button from '../../components/button';
import Input from '../../components/input';
import FormModal from '../../components/form-modal';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

interface ConfirmParticipationModalProps {
  handleOpenCloseConfirmParticipation: () => void;
  destination: string;
  endsAt: string;
  startsAt: string;
}
interface ParticipantProps {
  email: string;
  name: string;
}

export default function ConfirmParticipationModal({
  handleOpenCloseConfirmParticipation,
  destination,
  endsAt,
  startsAt,
}: ConfirmParticipationModalProps) {
  const { tripId } = useParams();
  const [participant, setParticipant] = useState<ParticipantProps>({
    email: '',
    name: '',
  });

  async function inviteSomeOneToTheTrip() {
    const newParticipant = {
      email: participant.email,
      name: participant.name,
    };
    if (newParticipant.email === '' || newParticipant.name === '') return;

    await api.post(`/trips/${tripId}/invites`, newParticipant);
  }

  return (
    <FormModal
      titleFormModal="Confirmar participação"
      onClickClose={handleOpenCloseConfirmParticipation}
      detailsFormModal={
        <>
          Você foi convidado(a) para participar de uma viagem para{' '}
          <span className="text-zinc-100 font-semibold">{destination}</span> nas
          datas de{' '}
          <span className="text-zinc-100 font-semibold">
            {startsAt &&
              format(startsAt, " d 'de' LLLL", {
                locale: ptBR,
              })}{' '}
            {endsAt && format(endsAt, "' a' d 'de' LLLL", { locale: ptBR })}
          </span>
          .
          <br />
          <br />
          Para confirmar sua presença na viagem, preencha os dados abaixo:
        </>
      }
      inputComponent={
        <>
          <Input
            variantType="md"
            children={<User className="size-5" />}
            placeholder="Seu nome completo"
            value={participant.name}
            onChange={(event) =>
              setParticipant((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
          />
          <Input
            variantType="md"
            children={<Mail className="size-5" />}
            placeholder="Seu e-mail"
            value={participant.email}
            onChange={(event) =>
              setParticipant((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
          />
        </>
      }
      buttonComponent={
        <>
          <Button
            variantColor="primary"
            variantSize="md"
            onClick={inviteSomeOneToTheTrip}
          >
            Confirmar minha presença
          </Button>
        </>
      }
    />
  );
}

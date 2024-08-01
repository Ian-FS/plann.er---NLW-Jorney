import { User, Mail, Loader } from 'lucide-react';
import Button from '../../components/button';
import Input from '../../components/input';
import FormModal from '../../components/form-modal';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type ConfirmTripModalProps = {
  closeConfirmTripModal: () => void;
  local: string | undefined;
  range: DateRange | undefined;
  ownerName: string;
  ownerEmail: string;
  setOwnerName: (param: string) => void;
  setOwnerEmail: (param: string) => void;
  createTrip: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoadingCreateTrip: boolean;
  closeLoadingModal: () => void;
  resetFormOwnerNameAndEmail: () => void;
};

export default function ConfirmTripModal({
  closeConfirmTripModal,
  local,
  range,
  ownerEmail,
  ownerName,
  setOwnerEmail,
  setOwnerName,
  createTrip,
  isLoadingCreateTrip,
  resetFormOwnerNameAndEmail,
}: ConfirmTripModalProps) {
  return (
    <>
      <FormModal
        titleFormModal="Confirmar criação de viagem"
        onSubmit={createTrip}
        onClickClose={() => {
          if (isLoadingCreateTrip) return;
          closeConfirmTripModal();
          resetFormOwnerNameAndEmail();
        }}
        detailsFormModal={
          <>
            Para concluir a criação da viagem para{' '}
            <span className="text-zinc-100 font-bold">{local}</span> nas datas
            de{' '}
            <span className="text-zinc-100 font-bold">
              {range?.from &&
                range?.to &&
                `${format(range?.from, "dd' de 'LLLL", {
                  locale: ptBR,
                })} a ${format(range?.to, "dd' de 'LLLL' de 'uuuu", {
                  locale: ptBR,
                })}`}
            </span>
            {', '}
            preencha seus dados abaixo:
          </>
        }
        inputComponent={
          <>
            <Input
              disabled={isLoadingCreateTrip}
              variantType="md"
              children={<User className="size-5" />}
              placeholder="Seu nome completo"
              value={ownerName}
              onChange={(event) => setOwnerName(event.target.value)}
            />
            <Input
              disabled={isLoadingCreateTrip}
              variantType="md"
              children={<Mail className="size-5" />}
              placeholder="Seu e-mail pessoal"
              value={ownerEmail}
              type="email"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </>
        }
        buttonComponent={
          isLoadingCreateTrip ? (
            <Button disabled variantColor="secondary" variantSize="md">
              Processando...
              <Loader className="size-5 animate-spin" />
            </Button>
          ) : (
            <Button variantColor="primary" variantSize="md">
              Confirmar criação da viagem
            </Button>
          )
        }
      ></FormModal>
    </>
  );
}

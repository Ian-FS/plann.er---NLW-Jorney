import { Calendar, MapPin, Settings2 } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import InputRangeDate from '../../components/input-range-date';
import { DateRange } from 'react-day-picker';
import FormModal from '../../components/form-modal';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface DataProps {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
  isConfirmed: boolean;
}

interface ChangeDestinationAndDateHeaderProps {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  dataTrip: DataProps;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangeDestinationAndDateHeader({
  setRange,
  range,
  dataTrip,
  setIsUpdate,
}: ChangeDestinationAndDateHeaderProps) {
  const [isInputEdit, setIsInputEdit] = useState(false);
  const [isOpenModalDate, setIsOpenModalDate] = useState(false);
  const [destination, setDestination] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const { tripId } = useParams();

  async function updateDestinationAndDateTrip() {
    const newDestinatinationAndDate = {
      destination: destination ? destination : dataTrip.destination,
      starts_at: range ? range.from : startsAt,
      ends_at: range ? range.to : endsAt,
    };

    console.log(newDestinatinationAndDate);

    await api.put(`trips/${tripId}`, newDestinatinationAndDate).then((res) => {
      console.log(res.request);
    });

    setIsUpdate(true);
  }

  function handleEnableAndDisableEdit() {
    setDestination(dataTrip.destination);
    setStartsAt(dataTrip.starts_at);
    setEndsAt(dataTrip.ends_at);

    setIsInputEdit((isInputEdit) => !isInputEdit);
  }
  function handleChangeDestination(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setDestination(value);
    console.log(dataTrip);
  }

  function formatDate(startDate: Date | string, endDate: Date | string) {
    if (startDate && endDate) {
      return `${format(startDate, " d 'de' LLLL", {
        locale: ptBR,
      })} ${format(endDate, "' a' d 'de' LLLL", { locale: ptBR })}`;
    }
    return '';
  }

  return (
    <div className="h-16 bg-zinc-900 rounded-xl pl-6 pr-4 flex gap-5 items-center shadow-boxCustonShape">
      <div className="flex items-center gap-5 border-r border-zinc-800 pr-5 flex-1 justify-between">
        {isInputEdit ? (
          <Input
            onChange={handleChangeDestination}
            variantType="sm"
            variantEdit="edit"
            children={<MapPin className="size-5" />}
            name="destination"
            value={destination}
          />
        ) : (
          <Input
            variantType="sm"
            variantEdit="noedit"
            children={<MapPin className="size-5" />}
            name="destination"
            disabled
            value={dataTrip.destination || ''}
          />
        )}
        {isInputEdit ? (
          <>
            <Input
              type="button"
              onClick={() => setIsOpenModalDate(true)}
              variantType="sm"
              variantEdit="edit"
              children={<Calendar className="size-5" />}
              name="date"
              value={
                !range
                  ? formatDate(dataTrip.starts_at, dataTrip.ends_at)
                  : range?.from &&
                    range?.to &&
                    formatDate(range.from, range?.to)
              }
            />
            {isOpenModalDate && (
              <FormModal
                titleFormModal="Escolha a data de viagem"
                detailsFormModal="Selecione a data inicial e final: "
                inputComponent={
                  <InputRangeDate range={range} setRange={setRange} />
                }
                onClickClose={() => setIsOpenModalDate(false)}
                variantDate="dateFit"
              />
            )}
          </>
        ) : (
          <Input
            variantType="sm"
            variantEdit="noedit"
            children={<Calendar className="size-5" />}
            name="date"
            disabled
            value={formatDate(dataTrip.starts_at, dataTrip.ends_at)}
          />
        )}
      </div>
      {isInputEdit ? (
        <Button
          onClick={() => {
            updateDestinationAndDateTrip();
            handleEnableAndDisableEdit();
          }}
          variantColor="primary"
          variantSize="sm"
        >
          Confirmar alteração
        </Button>
      ) : (
        <Button
          onClick={handleEnableAndDisableEdit}
          variantColor="secondary"
          variantSize="sm"
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  );
}

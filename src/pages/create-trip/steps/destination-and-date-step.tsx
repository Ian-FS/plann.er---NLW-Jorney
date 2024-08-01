import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react';
import React from 'react';
import Button from '../../../components/button';
import Input from '../../../components/input';
import 'react-day-picker/dist/style.css';
import InputRangeDate from '../../../components/input-range-date';
import FormModal from '../../../components/form-modal';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type DestinationAndDateStepProps = {
  handleAddLocalTrip: (event: React.FormEvent<HTMLFormElement>) => void;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  handleOpenAndCloseRangeDate: () => void;
  isGuestInputOpen: boolean;
  isOpenRangeDate: boolean;
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setLocal: React.Dispatch<React.SetStateAction<string | undefined>>;
  local: string | undefined;
};

export default function DestinationAndDateStep({
  closeGuestInput,
  openGuestInput,
  handleAddLocalTrip,
  isGuestInputOpen,
  range,
  setRange,
  setLocal,
  local,
  handleOpenAndCloseRangeDate,
  isOpenRangeDate,
}: DestinationAndDateStepProps) {
  return (
    <form
      onSubmit={handleAddLocalTrip}
      className="flex rounded-xl bg-zinc-900 px-4 h-16 items-center shadow-boxCustonShape gap-5"
    >
      <Input
        value={local || ''} // Adicionado
        onChange={(e) => setLocal(e.target.value)} // Adicionado
        variantType="sm"
        children={<MapPin className="size-5" />}
        placeholder="Para onde você vai?"
        name="local"
        disabled={isGuestInputOpen}
        type="text"
      />
      <button
        type="button"
        onClick={handleOpenAndCloseRangeDate}
        className="flex items-center gap-2 group "
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-base font-normal grow text-left text-zinc-400">
          {range && range.from && range.to
            ? `${format(range.from, " d 'de' LLL", { locale: ptBR })} ${format(
                range.to,
                "' a' d 'de' LLL",
                { locale: ptBR },
              )}`
            : 'Quando?'}
        </span>
      </button>
      <div className="h-6 w-[1px] bg-zinc-800" />
      {isOpenRangeDate && (
        <FormModal
          titleFormModal="Escolha a data de viagem"
          detailsFormModal="Selecione a data inicial e final: "
          inputComponent={<InputRangeDate range={range} setRange={setRange} />}
          onClickClose={handleOpenAndCloseRangeDate}
          variantDate="dateFit"
        />
      )}
      {isGuestInputOpen ? (
        <Button
          onClick={closeGuestInput}
          variantSize="sm"
          variantColor="secondary"
        >
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button type="submit" onClick={openGuestInput} variantColor="primary">
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </form>
  );
}

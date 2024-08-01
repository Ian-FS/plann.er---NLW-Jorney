import { ptBR } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';

interface InputRangeDateProps {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export default function InputRangeDate({
  range,
  setRange,
}: InputRangeDateProps) {
  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={setRange}
      locale={ptBR}
    />
  );
}

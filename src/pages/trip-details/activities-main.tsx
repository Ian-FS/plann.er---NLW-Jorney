import { Plus } from 'lucide-react';
import Button from '../../components/button';
import DayActivity from './day-activity';

interface ActivityProps {
  title: string;
  occurs_at: string;
}
interface DayProps {
  date: string;
  activities: ActivityProps[] | undefined;
}

interface ActivitiesMainProps {
  daysList: DayProps[] | undefined;
  setDaysList: React.Dispatch<React.SetStateAction<DayProps[] | undefined>>;
  handleOpenCloseRegisterActivityModal: () => void;
}

export default function ActivitiesMain({
  daysList,
  handleOpenCloseRegisterActivityModal,
}: ActivitiesMainProps) {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex justify-between">
        <h1 className="text-zinc-50 text-3xl font-semibold">Atividades</h1>
        <Button
          onClick={handleOpenCloseRegisterActivityModal}
          variantColor="primary"
          variantSize="md"
        >
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {daysList &&
          daysList.map((dayActivity, index) => (
            <DayActivity
              key={index}
              activities={dayActivity.activities}
              date={dayActivity.date}
            />
          ))}
      </div>
    </div>
  );
}

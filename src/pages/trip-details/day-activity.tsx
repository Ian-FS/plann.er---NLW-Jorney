import { useState } from 'react';
import Activity from '../../components/activity';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface activityProps {
  title: string;
  occurs_at: string | Date;
}
interface activitiesDayProps {
  date: string;
  activities: activityProps[] | undefined;
}

export default function DayActivity({ activities, date }: activitiesDayProps) {
  const [isCheckActivity, setIsCheckActivity] = useState<Array<boolean>>(
    Array(activities?.length).fill(false),
  );

  // function handleCheckActivity(index: number) {
  //   setIsCheckActivity((prevStats) => [
  //     ...prevStats,
  //     (prevStats[index] = !prevStats[index]),
  //   ]);
  // }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <span className="text-xl text-zinc-300 font-semibold">
          {formatDate(date, "'Dia 'd")}
        </span>
        <span className="text-xs text-zinc-500 font-normal">
          {formatDate(date, 'EEEE', { locale: ptBR })}
        </span>
      </div>
      {activities && activities?.length > 0 ? (
        activities.map((activity, index) => (
          <Activity
            key={index}
            title={activity.title}
            isCheckActivity={isCheckActivity}
            setIsCheck={setIsCheckActivity}
            occurs_at={activity.occurs_at}
          />
        ))
      ) : (
        <div className="text-zinc-500 text-sm font-normal">
          Nenhuma atividade cadastrada nessa data.
        </div>
      )}
    </div>
  );
}

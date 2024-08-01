import { format } from 'date-fns';
import { CircleCheck, CircleDashed } from 'lucide-react';

interface ActivityProps {
  title: string;
  occurs_at: string | Date;
  isCheckActivity: boolean[];
  setIsCheck: React.Dispatch<React.SetStateAction<Array<boolean>>>;
  key: number;
}

export default function Activity({
  occurs_at,
  title,
  isCheckActivity,
}: ActivityProps) {
  return (
    <div className="bg-zinc-900 h-10 rounded-xl flex items-center gap-3 px-4 shadow-boxCustonShape">
      <button
      // onClick={() => setIsCheck((prevStat) => [...prevStat, prevStat[key]])}
      >
        {isCheckActivity ? (
          <CircleCheck className="size-5 text-lime-300 flex-shrink" />
        ) : (
          <CircleDashed className="size-5 text-zinc-400 flex-shrink" />
        )}
      </button>
      <div className="text-zinc-100 text-base font-normal flex-grow">
        {title}
      </div>
      <span className="text-zinc-400 font-normal flex-shrink">
        {format(occurs_at, "kk':'mm")}
      </span>
    </div>
  );
}

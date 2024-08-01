import { CircleCheck, CircleDashed } from 'lucide-react';

interface GuestProps {
  name?: string;
  email: string;
  id: string;
  isConfirmed: boolean;
  index: number;
}

export default function Guest({
  name,
  email,
  id,
  isConfirmed,
  index,
}: GuestProps) {
  return (
    <div className="flex items-center justify-between" key={id}>
      <div className="flex flex-col gap-1.5">
        {name ? (
          <h3 className="text-zinc-100 text-base font-medium">{name}</h3>
        ) : (
          <h3 className="text-zinc-100 text-base font-medium">{`Convidado ${index}`}</h3>
        )}
        <span className="text-zinc-400 text-sm font-normal">{email}</span>
      </div>
      <span className="motion-safe:transition-all">
        {isConfirmed ? (
          <CircleCheck className="size-5 text-lime-300" />
        ) : (
          <CircleDashed className="size-5 text-zinc-400" />
        )}
      </span>
    </div>
  );
}

import { Link2 } from 'lucide-react';

interface LinksProps {
  id: string;
  title: string;
  url: string;
}
export default function Link({ id, title, url }: LinksProps) {
  return (
    <div
      className="rounded-md flex items-center justify-between group"
      key={id}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="font-medium text-base text-zinc-100">{title}</h3>
        <a href="#" className="w-60 font-normal text-xs text-zinc-400 truncate">
          {url}
        </a>
      </div>
      <Link2 className="size-5 text-zinc-400 group-hover:text-white motion-safe:transition-all" />
    </div>
  );
}

import { Plus } from 'lucide-react';
import Button from '../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Link from '../../components/link';

interface ImportanteLinksSidebarProps {
  handleOpenCloseRegisterLinkModal: () => void;
}
interface LinksProps {
  id: string;
  title: string;
  url: string;
}

export default function ImportanteLinksSidebar({
  handleOpenCloseRegisterLinkModal,
}: ImportanteLinksSidebarProps) {
  const [links, setLinks] = useState<Array<LinksProps>>([]);
  const { tripId } = useParams();
  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((res) => setLinks(res.data.links));
  }, [tripId]);

  return (
    <div className="rounded-b-xl flex flex-col gap-6">
      <h2 className="font-semibold text-zinc-50 text-xl">Links importantes</h2>
      <div className="flex flex-col gap-5">
        {links.length > 0 ? (
          links.map((link, index) => (
            <Link id={link.id} title={link.title} url={link.url} key={index} />
          ))
        ) : (
          <div className="text-zinc-500 text-sm font-normal">
            Nenhum link cadastrado.
          </div>
        )}
      </div>
      <Button
        onClick={handleOpenCloseRegisterLinkModal}
        variantColor="secondary"
        variantSize="md"
      >
        <Plus className="size-5 group-hover:text-white" />
        Cadastrar novo link
      </Button>
    </div>
  );
}

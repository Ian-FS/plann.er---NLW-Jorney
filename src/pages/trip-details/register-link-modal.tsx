import { Link2, Tag } from 'lucide-react';
import Button from '../../components/button';
import Input from '../../components/input';
import FormModal from '../../components/form-modal';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { useState } from 'react';

interface RegisterLinkModalProps {
  handleOpenCloseRegisterLinkModal: () => void;
}

interface LinksProps {
  title: string;
  url: string;
}

export default function RegisterLinkModal({
  handleOpenCloseRegisterLinkModal,
}: RegisterLinkModalProps) {
  const { tripId } = useParams();
  const [link, setLink] = useState<LinksProps>({
    title: '',
    url: '',
  });

  async function createLink() {
    const newLink = {
      title: link?.title,
      url: link?.url,
    };
    if (newLink.title === '' || newLink.url === '') return;
    await api
      .post(`/trips/${tripId}/links`, newLink)
      .then((res) => console.log(res.status));
  }
  return (
    <FormModal
      titleFormModal="Cadastrar link"
      onClickClose={handleOpenCloseRegisterLinkModal}
      detailsFormModal="Todos os convidados podem visualizar os links importantes."
      inputComponent={
        <>
          <Input
            variantType="md"
            children={<Tag className="size-5" />}
            placeholder="Título do link"
            value={link?.title}
            onChange={(event) =>
              setLink((prevState) => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />
          <Input
            type="url"
            variantType="md"
            children={<Link2 className="size-5" />}
            placeholder="URL"
            value={link?.url}
            onChange={(event) =>
              setLink((prevState) => ({
                ...prevState,
                url: event.target.value,
              }))
            }
          />
        </>
      }
      buttonComponent={
        <Button variantColor="primary" variantSize="md" onClick={createLink}>
          Salvar link
        </Button>
      }
    />
  );
}

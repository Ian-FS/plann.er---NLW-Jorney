import { Calendar, Tag } from 'lucide-react';
import Button from '../../components/button';
import Input from '../../components/input';
import FormModal from '../../components/form-modal';
import { useState } from 'react';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';

interface RegisterActivityModalProps {
  handleOpenCloseRegisterActivityModal: () => void;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterActivityModal({
  handleOpenCloseRegisterActivityModal,
}: RegisterActivityModalProps) {
  const [title, setTitle] = useState('');
  const [occurs_at, setOccurs_at] = useState('');

  const { tripId } = useParams();
  async function createActivity() {
    const newActivity = {
      occurs_at,
      title,
    };

    await api.post(`/trips/${tripId}/activities`, newActivity).then((res) => {
      console.log(res.status);
    });

    // handleOpenCloseRegisterActivityModal();
    // setIsCreate(true);
  }

  return (
    <FormModal
      titleFormModal="Cadastrar atividade"
      detailsFormModal="Todos os convidados podem visualizar as atividades."
      onClickClose={handleOpenCloseRegisterActivityModal}
      inputComponent={
        <>
          <Input
            variantType="md"
            children={<Tag className="size-5" />}
            placeholder="Qual a atividade"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <Input
            className="text-left w-full bg-transparent [filter]"
            type="datetime-local"
            variantType="md"
            children={<Calendar className="size-5" />}
            name="date"
            onChange={(event) => setOccurs_at(event.target.value)}
            value={occurs_at}
          />
        </>
      }
      buttonComponent={
        <>
          <Button
            onClick={createActivity}
            variantColor="primary"
            variantSize="md"
          >
            Salvar atividade
          </Button>
        </>
      }
    />
  );
}

import { useEffect, useState } from 'react';
import ConfirmParticipationModal from './confirm-participation-modal';
import ChangeDestinationAndDateHeader from './change-destination-and-date-header';
import ActivitiesMain from './activities-main';
import ImportanteLinksSidebar from './importante-links-sidebar';
import GuestsManagementSidebar from './guests-management-sidebar';
import RegisterActivityModal from './register-activity-modal';
import RegisterLinkModal from './register-link-modal';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { DateRange } from 'react-day-picker';

interface DataProps {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
  isConfirmed: boolean;
}

interface ActivityProps {
  title: string;
  occurs_at: string;
}
interface DayProps {
  date: string;
  activities: ActivityProps[] | undefined;
}

export default function TripDetailsPage() {
  const [isRegisterActivityModal, setIsRegisterActivityModal] = useState(false);
  const [isRegisterLinkModal, setIsRegisterLinkModal] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [range, setRange] = useState<DateRange>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [dataTrip, setDataTrip] = useState<DataProps>({
    id: '',
    destination: '',
    starts_at: '',
    ends_at: '',
    emails_to_invite: [],
    owner_name: '',
    owner_email: '',
    isConfirmed: false,
  });

  const [daysList, setDaysList] = useState<Array<DayProps> | undefined>([]);
  function handleOpenCloseRegisterActivityModal() {
    setIsRegisterActivityModal(
      (isRegisterActivityModal) => !isRegisterActivityModal,
    );
  }
  function handleOpenCloseRegisterLinkModal() {
    setIsRegisterLinkModal((isRegisterLinkModal) => !isRegisterLinkModal);
  }
  function handleOpenCloseConfirmationModal() {
    setIsConfirmationModal((isConfirmationModal) => !isConfirmationModal);
  }

  const { tripId } = useParams();

  useEffect(() => {
    api
      .get(`trips/${tripId}`)
      .then((res) => res.data)
      .then((data) => {
        const trip: DataProps = data.trip;
        setDataTrip(trip);
        setIsUpdate(false);
        // setIsCreate(false);
      });
  }, [tripId, isUpdate]);

  useEffect(() => {
    api.get(`trips/${tripId}/activities`).then((res) => {
      setDaysList(res.data.activities);
      // setIsCreate(false);
    });
  }, [tripId, isUpdate]);

  return (
    <div className="max-w-6xl mx-auto my-10 space-y-8">
      <ChangeDestinationAndDateHeader
        range={range}
        setRange={setRange}
        dataTrip={dataTrip}
        setIsUpdate={setIsUpdate}
      />
      <div className="px-6 flex gap-16">
        <ActivitiesMain
          handleOpenCloseRegisterActivityModal={
            handleOpenCloseRegisterActivityModal
          }
          daysList={daysList}
          setDaysList={setDaysList}
        />
        <div className="flex flex-col w-80 gap-6">
          <ImportanteLinksSidebar
            handleOpenCloseRegisterLinkModal={handleOpenCloseRegisterLinkModal}
          />
          <span className="bg-zinc-800 h-[1px]" />
          <GuestsManagementSidebar
            handleOpenCloseConfirmationModal={handleOpenCloseConfirmationModal}
          />
        </div>
      </div>
      {isRegisterActivityModal && (
        <RegisterActivityModal
          handleOpenCloseRegisterActivityModal={
            handleOpenCloseRegisterActivityModal
          }
          setIsCreate={setIsCreate}
        />
      )}
      {isRegisterLinkModal && (
        <RegisterLinkModal
          handleOpenCloseRegisterLinkModal={handleOpenCloseRegisterLinkModal}
        />
      )}
      {isConfirmationModal && (
        <ConfirmParticipationModal
          handleOpenCloseConfirmParticipation={handleOpenCloseConfirmationModal}
          destination={dataTrip.destination}
          endsAt={dataTrip.ends_at}
          startsAt={dataTrip.starts_at}
        />
      )}
    </div>
  );
}

import React, { ChangeEventHandler, useState } from 'react';
import { setHours, setMinutes } from 'date-fns';
import { DayPicker } from 'react-day-picker';

interface DateTimePickerProps {
  selected: Date | undefined;
  setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>;
  timeValue: string;
  setTimeValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function DateTimePicker({
  selected,
  setSelected,
  setTimeValue,
  timeValue,
}: DateTimePickerProps) {
  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelected(newDate);
  };

  return (
    <div>
      <form style={{ marginBlockEnd: '1em' }}>
        <label>
          Set the time:{' '}
          <input type="time" value={timeValue} onChange={handleTimeChange} />
        </label>
      </form>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDaySelect}
        footer={`Selected date: ${
          selected ? selected.toLocaleString() : 'none'
        }`}
      />
    </div>
  );
}

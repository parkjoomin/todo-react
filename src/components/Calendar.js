import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Calendar.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);
    const daysWithOffset = [...Array(firstDayOfMonth).fill(null), ...daysArray];

    setCalendarDays(daysWithOffset);
  }, [currentMonth, currentYear]);

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateChange(newDate);

    // TodoList로 이동 및 클릭한 날짜 정보 전달
    navigate(`/todo-list`, { state: { date: newDate } });
  };

  return (
    <div className="calendar">
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => (day ? handleDateClick(day) : null)}
            className={day === selectedDate.getDate() ? 'selected' : ''}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

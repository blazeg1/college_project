import React, { useState } from 'react';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (date && description) {
      setAppointments([...appointments, { date, description }]);
      setDate('');
      setDescription('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Appointments</h1>
        </div>
        <div className="text-center">
          <form onSubmit={handleAddAppointment} className="mb-6">
            <div className="mb-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Schedule Appointment
            </button>
          </form>
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment, index) => (
                  <li key={index} className="mb-2">
                    <strong>{appointment.date}:</strong> {appointment.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have no appointments scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
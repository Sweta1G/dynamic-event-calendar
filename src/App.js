// import React, { useState, useEffect } from 'react';
// import Calendar from './components/Calender';
// import EventModal from './components/EventModal';
// import EventList from './components/EventList';
// import './App.css';
// const App = () => {
//   const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState(null);

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const handleAddEvent = () => {
//     // Reset currentEvent to null to clear previous event data
//     setCurrentEvent(null);
//     // Open the modal
//     setIsModalOpen(true);
//   };

//   const handleEditEvent = (event) => {
//     // Set the current event for editing
//     setCurrentEvent(event);
//     setIsModalOpen(true);
//   };

//   const handleSaveEvent = (event) => {
//     if (currentEvent) {
//       // Update existing event
//       setEvents(events.map(e => e === currentEvent ? { ...event, date: selectedDate } : e));
//     } else {
//       // Add new event
//       setEvents([...events, { ...event, date: selectedDate }]);
//     }
//     // Close the modal
//     setIsModalOpen(false);
//     // Reset currentEvent to ensure clean state for next addition
//     setCurrentEvent(null);
//   };

//   const handleDeleteEvent = (event) => {
//     setEvents(events.filter(e => e !== event));
//   };

//   const handleCloseModal = () => {
//     // Reset currentEvent when closing the modal
//     setCurrentEvent(null);
//     setIsModalOpen(false);
//   };

//   const filteredEvents = events.filter(event => {
//     const eventDate = new Date(event.date);
//     return eventDate.toDateString() === selectedDate.toDateString();
//   });

//   return (
//     <div className="app">
//       <Calendar
//         selectedDate={selectedDate}
//         onDateClick={setSelectedDate}
//       />
//       <button onClick={handleAddEvent}>Add Event</button>
//       <EventList
//         events={filteredEvents}
//         onEdit={handleEditEvent}
//         onDelete={handleDeleteEvent}
//       />
//       <EventModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSave={handleSaveEvent}
//         event={currentEvent}
//       />
//     </div>
//   );
// };

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import Calender from './components/Calender';
import EventList from './components/EventList';
import EventModal from './components/EventModal';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

const App = () => {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    if (currentEvent) {
      setEvents(events.map(e => e === currentEvent ? { ...event, date: selectedDate } : e));
    } else {
      setEvents([...events, { ...event, id: uuidv4(), date: selectedDate }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e !== event));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedEvents = Array.from(events);
    const [movedEvent] = reorderedEvents.splice(result.source.index, 1);
    reorderedEvents.splice(result.destination.index, 0, movedEvent);

    setEvents(reorderedEvents);
  };

  const handleExport = (format) => {
    const monthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === selectedDate.getMonth() && eventDate.getFullYear() === selectedDate.getFullYear();
    });

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(monthEvents, null, 2)], { type: 'application/json' });
      saveAs(blob, `events-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}.json`);
    } else if (format === 'csv') {
      const csvContent = [
        ['Name', 'Start Time', 'End Time', 'Description', 'Category', 'Date'],
        ...monthEvents.map(event => [event.name, event.startTime, event.endTime, event.description, event.category, event.date])
      ].map(e => e.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      saveAs(blob, `events-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}.csv`);
    }
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="app">
      <Calender
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />
      <button onClick={handleAddEvent}>Add Event</button>
      {filteredEvents.length > 0 && (
        <EventList
          events={filteredEvents}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onDragEnd={handleDragEnd}
        />
      )}
      <div className="export-buttons">
        <button onClick={() => handleExport('json')}>Export as JSON</button>
        <button onClick={() => handleExport('csv')}>Export as CSV</button>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={currentEvent}
      />
    </div>
  );
};

export default App;
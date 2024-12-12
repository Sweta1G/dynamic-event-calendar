// import React, { useState, useEffect } from 'react';

// const EventModal = ({ isOpen, onClose, onSave, event }) => {
//   const [eventName, setEventName] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     if (event) {
//       setEventName(event.name);
//       setStartTime(event.startTime);
//       setEndTime(event.endTime);
//       setDescription(event.description);
//     } else {
//       setEventName('');
//       setStartTime('');
//       setEndTime('');
//       setDescription('');
//     }
//   }, [event]);

//   const handleSave = () => {
//     onSave({
//       name: eventName,
//       startTime,
//       endTime,
//       description,
//     });
//     setEventName(null)
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
//         <input
//           type="text"
//           placeholder="Event Name"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//         />
//         <input
//           type="time"
//           placeholder="Start Time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//         <input
//           type="time"
//           placeholder="End Time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <div className="modal-buttons">
//           <button onClick={handleSave}>Save</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventModal;

// src/components/EventModal.js
import React, { useState, useEffect } from 'react';

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('work');

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description);
      setCategory(event.category);
    } else {
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
      setCategory('work');
    }
  }, [event]);

  const handleSave = () => {
    onSave({
      name: eventName,
      startTime,
      endTime,
      description,
      category,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
        </select>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
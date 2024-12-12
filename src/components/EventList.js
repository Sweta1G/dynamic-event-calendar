// import React from 'react';
// import './EventList.css';


// const EventList = ({ events, onEdit, onDelete }) => {
//   return (
//     <div className="event-list">
//       <h2>Events</h2>
//       {events.length === 0 ? (
//         <p>No events for this day.</p>
//       ) : (
//         events.map((event, index) => (
//           <div key={index} className="event">
//             <h3>{event.name}</h3>
//             <p>{event.startTime} - {event.endTime}</p>
//             <p>{event.description}</p>
//             <button onClick={() => onEdit(event)}>Edit</button>
//             <button onClick={() => onDelete(event)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EventList;

// src/components/EventList.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './EventList.css';

const EventList = ({ events, onEdit, onDelete, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="events">
        {(provided) => (
          <div className="event-list" {...provided.droppableProps} ref={provided.innerRef}>
            <h2>Events</h2>
            {events.length === 0 ? (
              <p>No events for this day.</p>
            ) : (
              events.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`event ${event.category}`}
                    >
                      <h3>{event.name}</h3>
                      <p>{event.startTime} - {event.endTime}</p>
                      <p>{event.description}</p>
                      <button onClick={() => onEdit(event)}>Edit</button>
                      <button onClick={() => onDelete(event)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EventList;
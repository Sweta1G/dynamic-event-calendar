# Dynamic Event Calendar Application

## Objective

Build a **Dynamic Event Calendar Application** to evaluate skills in advanced React.js logic, clean UI design, and deployment capabilities.

## Features

### Calendar View
- Display a calendar grid for the current month with all days properly aligned.
- Allow users to switch between months using "Previous" and "Next" buttons.

### Event Management
- Add events by clicking on a day.
- Edit or delete events from a selected day.
- Each event includes:
  - Event name
  - Start time and end time
  - Optional description

### Event List
- Display a list of all events for the selected day in a modal or side panel.

### Data Persistence
- Use **localStorage** to persist events between page refreshes.

### UI Requirements
- Clean and modern UI using **shadcn** for components.
- Display days in a grid with clear separation for weekends and weekdays.
- Highlight the current day and selected day visually.

### Complex Logic
- Automatically handle month transitions (e.g., from Jan 31 to Feb 1).
- Prevent overlapping events (e.g., two events at the same time).
- Allow filtering of events by keyword.

### Bonus Features
- Add drag-and-drop functionality to reschedule events between days.
- Implement color coding for events (e.g., work, personal, others).
- Allow users to export the event list for a specific month as a **JSON** or **CSV** file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sweta1G/dynamic-event-calendar.git
   cd dynamic-event-calendar
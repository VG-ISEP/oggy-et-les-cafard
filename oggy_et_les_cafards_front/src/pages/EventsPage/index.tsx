import React, { useState, useEffect } from 'react';
import { Event } from '../../types/Event';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import './style.css';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await eventService.getEvents();
      setEvents(fetchedEvents as Event[]);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleJoinEvent = async (eventId: string) => {
    if (!currentUser) {
      toast.error("You must be logged in to join an event.");
      return;
    }
    const success = await eventService.joinEvent(eventId, currentUser.id);
    if (success) {
      toast.success("Successfully joined the event!");
      fetchEvents(); // Refresh events to show the change
    } else {
      toast.error("Could not join the event. You may have already joined.");
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    if (!currentUser) return;
    const success = await eventService.leaveEvent(eventId, currentUser.id);
    if (success) {
      toast.success("Successfully left the event!");
      fetchEvents(); // Refresh events to show the change
    } else {
      toast.error("Could not leave the event.");
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map(event => {
          const isParticipant = currentUser && event.participants.includes(currentUser.id);
          return (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Participants:</strong> {event.participants.length}</p>
              {isParticipant ? (
                <button onClick={() => handleLeaveEvent(event.id)} className="event-button leave">Leave Event</button>
              ) : (
                <button onClick={() => handleJoinEvent(event.id)} className="event-button join" disabled={!currentUser}>Join Event</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
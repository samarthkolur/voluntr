'use client';

import { DashboardNav } from '@/components/DashboardNav';
import { Sidebar } from '@/components/Sidebar';
import { EventCard, Event } from '@/components/EventCard';
import { useEffect, useState } from 'react';

export default function VolunteerDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterest, setSelectedInterest] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleInterestChange = (interest: string) => {
    setSelectedInterest(interest);
  };

  const filteredEvents =
    selectedInterest === 'all'
      ? events
      : events.filter((event) => event.cause.toLowerCase() === selectedInterest);

  return (
    <div>
      <DashboardNav />
      <div className='flex'>
        <Sidebar onInterestChange={handleInterestChange} />
        <main className='flex-1 p-10 ml-80'>
          <h1 className='text-2xl font-bold mb-6'>Events</h1>
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div>
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

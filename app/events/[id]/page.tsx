'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardNav } from '@/components/DashboardNav';
import { Event } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${id}`);
          if (response.ok) {
            const data = await response.json();
            setEvent(data.event);
          }
        } catch (error) {
          console.error('Failed to fetch event:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    setApplyMessage('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: id }),
      });

      const data = await response.json();
      if (response.ok) {
        setApplyMessage('Applied successfully!');
      } else {
        setApplyMessage(data.message || 'Failed to apply.');
      }
    } catch (error) {
      setApplyMessage('An error occurred.');
      console.error('Apply error:', error);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div>
      <DashboardNav />
      <div className='p-10'>
        <Card>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
            <p className='mt-4'>
              <strong>Cause:</strong> {event.cause}
            </p>
            <p className='mt-2'>
              <strong>Location:</strong> {event.location.address}
            </p>
            <p className='mt-2'>
              <strong>Volunteers Needed:</strong> {event.volunteersNeeded}
            </p>
            <p className='mt-2'>
              <strong>Status:</strong> {event.status}
            </p>
          </CardContent>
          <CardFooter className='flex items-center'>
            {applyMessage && <p className='mr-4 text-sm'>{applyMessage}</p>}
            <Button onClick={handleApply} disabled={isApplying}>
              {isApplying ? 'Applying...' : 'Apply Now'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

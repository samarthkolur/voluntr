'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';

export interface Event {
  _id: string;
  ngoId: string;
  title: string;
  description: string;
  cause: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  date: string;
  volunteersNeeded: number;
  volunteersJoined: string[];
  status: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');

  const handleApply = async () => {
    setIsApplying(true);
    setApplyMessage('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: event._id }),
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

  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
        <p className='mt-2'>
          <strong>Cause:</strong> {event.cause}
        </p>
        <p className='mt-2'>
          <strong>Location:</strong> {event.location.address}
        </p>
        <p className='mt-2'>
          <strong>Volunteers Needed:</strong> {event.volunteersNeeded}
        </p>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <Link href={`/events/${event._id}`}>
          <Button variant='outline'>View Details</Button>
        </Link>
        <div className='flex items-center'>
          {applyMessage && <p className='mr-4 text-sm'>{applyMessage}</p>}
          <Button onClick={handleApply} disabled={isApplying}>
            {isApplying ? 'Applying...' : 'Apply'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

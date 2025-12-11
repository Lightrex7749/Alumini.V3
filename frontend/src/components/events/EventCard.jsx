import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const getEventTypeBadgeColor = (type) => {
    const colors = {
      'workshop': 'bg-purple-100 text-purple-700',
      'webinar': 'bg-blue-100 text-blue-700',
      'conference': 'bg-red-100 text-red-700',
      'networking': 'bg-green-100 text-green-700',
      'meetup': 'bg-yellow-100 text-yellow-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const formatEventDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  const isSpotsAvailable = event.max_attendees > event.current_attendees_count;
  const spotsLeft = event.max_attendees - event.current_attendees_count;

  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group border-gray-200 bg-white"
      onClick={() => navigate(`/events/${event.id}`)}
      data-testid={`event-card-${event.id}`}
    >
      {/* Event Banner */}
      {event.banner_image && (
        <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 group-hover:opacity-0 transition-opacity duration-300"></div>
          <img
            src={event.banner_image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      <CardContent className="p-4 relative">
        {/* Gradient accent for cards without banner */}
        {!event.banner_image && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
        )}
        
        {/* Event Type Badge */}
        <div className="flex items-center justify-between mb-2">
          <Badge className={getEventTypeBadgeColor(event.event_type)}>
            {event.event_type}
          </Badge>
          {event.is_virtual && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Video className="h-3 w-3" />
              Virtual
            </Badge>
          )}
        </div>

        {/* Event Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-3">
          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{formatEventDate(event.start_date)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {event.is_virtual ? 'Virtual Event' : event.location}
            </span>
          </div>

          {/* Attendees */}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {event.current_attendees_count} / {event.max_attendees} attendees
            </span>
          </div>
        </div>

        {/* Spots Status */}
        {isSpotsAvailable ? (
          <div className="text-xs text-green-600 mb-3">
            {spotsLeft} spots remaining
          </div>
        ) : (
          <div className="text-xs text-red-600 mb-3">
            Event is full
          </div>
        )}

        {/* View Details Button */}
        <Button 
          className="w-full" 
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
          data-testid={`view-event-details-${event.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;

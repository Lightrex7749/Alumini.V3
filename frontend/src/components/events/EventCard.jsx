import { Calendar, MapPin, Users, Video, ChevronDown, ChevronUp, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

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
    <CardContainer className="w-full">
      <CardBody className="w-full h-auto">
        <Card 
          className="overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          data-testid={`event-card-${event.id}`}
        >
          {/* Event Banner */}
          {event.banner_image && (
            <CardItem translateZ="10" className="w-full">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <img
                  src={event.banner_image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </CardItem>
          )}

          <CardContent className="p-4 relative">
            {/* Gradient accent for cards without banner */}
            {!event.banner_image && (
              <CardItem translateZ="5" className="w-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
              </CardItem>
            )}
            
            {/* Event Type Badge */}
            <CardItem translateZ="30" className="w-full">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getEventTypeBadgeColor(event.event_type)}>
                  {event.event_type}
                </Badge>
                {event.is_virtual && (
                  <Badge variant="outline" className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-300">
                    <Video className="h-3 w-3" />
                    Virtual
                  </Badge>
                )}
              </div>
            </CardItem>

            {/* Event Title */}
            <CardItem translateZ="35" className="w-full">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors dark:text-gray-100">
                {event.title}
              </h3>
            </CardItem>

            {/* Event Description */}
            <CardItem translateZ="25" className="w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {event.description}
              </p>
            </CardItem>

            {/* Event Details - Always Visible */}
            <CardItem translateZ="20" className="w-full">
              <div className="space-y-2 mb-3">
                {/* Date & Time */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                  <span className="truncate">{formatEventDate(event.start_date)}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                  <span className="truncate">
                    {event.is_virtual ? 'Virtual Event' : event.location}
                  </span>
                </div>

                {/* Attendees */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                  <span>
                    {event.current_attendees_count} / {event.max_attendees} attendees
                  </span>
                </div>
              </div>
            </CardItem>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <CardItem translateZ="15" className="w-full">
                    <div className="space-y-2 mb-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      {/* Full Description */}
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        <p className="font-medium mb-1">About this event:</p>
                        <p>{event.description}</p>
                      </div>

                      {/* Additional Details */}
                      {event.duration && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                          <span>Duration: {event.duration}</span>
                        </div>
                      )}

                      {event.registration_fee && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                          <span>Fee: ${event.registration_fee}</span>
                        </div>
                      )}
                    </div>
                  </CardItem>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spots Status */}
            <CardItem translateZ="20" className="w-full">
              {isSpotsAvailable ? (
                <div className="text-xs text-green-600 dark:text-green-400 mb-3 font-medium">
                  ✓ {spotsLeft} spots remaining
                </div>
              ) : (
                <div className="text-xs text-red-600 dark:text-red-400 mb-3 font-medium">
                  ✗ Event is full
                </div>
              )}
            </CardItem>

            {/* Action Buttons */}
            <CardItem translateZ="40" className="w-full">
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events/${event.id}`);
                  }}
                  data-testid={`view-event-details-${event.id}`}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="dark:border-gray-600 dark:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardItem>
          </CardContent>
        </Card>
      </CardBody>
    </CardContainer>
  );
};

export default EventCard;

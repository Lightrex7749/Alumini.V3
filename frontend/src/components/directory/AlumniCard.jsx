import { MapPin, Briefcase, CheckCircle2, Eye, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

const AlumniCard = ({ profile, onViewProfile }) => {
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  return (
    <CardContainer className="w-full">
      <CardBody className="w-full h-auto">
        <Card
          data-testid={`alumni-card-${profile.id}`}
          className="relative overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer h-full"
          onClick={() => onViewProfile(profile)}
        >
          <CardItem translateZ="5" className="w-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
          </CardItem>
          
          <CardContent className="p-5">
            <CardItem translateZ="35" className="w-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-16 w-16 border-2 border-gray-100 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-all duration-300">
                    <AvatarImage src={profile.photo_url} alt={profile.name} />
                    <AvatarFallback className="text-base bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  {profile.is_verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-snug">
                    {profile.headline || profile.current_role || 'Alumni Member'}
                  </p>
                </div>
              </div>
            </CardItem>

            <CardItem translateZ="25" className="w-full">
              <div className="space-y-2 mb-4">
                {profile.current_company && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                    <span className="truncate">{profile.current_company}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                )}
              </div>
            </CardItem>

            {profile.skills && profile.skills.length > 0 && (
              <CardItem translateZ="20" className="w-full">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500 border-gray-300 dark:border-gray-600">
                        +{profile.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardItem>
            )}

            <CardItem translateZ="30" className="w-full">
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  {profile.batch_year && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                      {profile.batch_year}
                    </Badge>
                  )}
                  {profile.willing_to_mentor && (
                    <Badge className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                      <Award className="h-3 w-3 mr-1" />
                      Mentor
                    </Badge>
                  )}
                </div>

                <Button
                  data-testid={`view-profile-${profile.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProfile(profile);
                  }}
                  size="sm"
                  className="h-8 px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
              </div>
            </CardItem>
          </CardContent>
        </Card>
      </CardBody>
    </CardContainer>
  );
};

export default AlumniCard;

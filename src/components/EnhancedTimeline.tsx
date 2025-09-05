import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  Users, 
  Target,
  Calendar,
  MapPin,
  ExternalLink,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'work' | 'certification' | 'project';
  location?: string;
  achievements: string[];
  skills: string[];
  details?: {
    duration?: string;
    company?: string;
    website?: string;
    highlights?: string[];
  };
  icon: typeof GraduationCap;
  color: string;
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    date: '2024',
    title: 'Full Stack Web Development',
    subtitle: 'Personal Projects & Learning',
    description: 'Focused on modern web development with React, TypeScript, and cloud technologies',
    type: 'project',
    location: 'Remote',
    achievements: [
      'Built 10+ responsive web applications',
      'Mastered React ecosystem and TypeScript',
      'Implemented CI/CD pipelines',
      'Created RESTful APIs and databases'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    details: {
      duration: '12 months',
      highlights: [
        'Portfolio website with 3D animations',
        'E-commerce platform with payment integration',
        'Real-time chat application',
        'Task management system'
      ]
    },
    icon: Code,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    date: '2023',
    title: 'JavaScript & React Certification',
    subtitle: 'FreeCodeCamp',
    description: 'Comprehensive certification covering modern JavaScript and React development',
    type: 'certification',
    achievements: [
      'Completed 300+ hours of coursework',
      'Built 5 certification projects',
      'Learned responsive web design',
      'Mastered JavaScript algorithms'
    ],
    skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
    details: {
      duration: '6 months',
      company: 'FreeCodeCamp',
      website: 'https://freecodecamp.org',
      highlights: [
        'JavaScript Algorithms and Data Structures',
        'Responsive Web Design',
        'Front End Development Libraries',
        'APIs and Microservices'
      ]
    },
    icon: Award,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '3',
    date: '2022-2023',
    title: 'Computer Science Studies',
    subtitle: 'Self-Taught Programming',
    description: 'Intensive self-study program covering computer science fundamentals',
    type: 'education',
    achievements: [
      'Completed CS50 Harvard course',
      'Studied data structures and algorithms',
      'Built strong programming foundation',
      'Learned multiple programming languages'
    ],
    skills: ['Python', 'C++', 'Java', 'Data Structures', 'Algorithms', 'SQL'],
    details: {
      duration: '18 months',
      highlights: [
        'CS50: Introduction to Computer Science',
        'Data Structures and Algorithms course',
        'Database design and SQL',
        'Object-oriented programming principles'
      ]
    },
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '4',
    date: '2021-2022',
    title: 'Career Transition',
    subtitle: 'From Business to Technology',
    description: 'Strategic transition into software development with focused learning plan',
    type: 'work',
    location: 'India',
    achievements: [
      'Completed career transition planning',
      'Built first programming projects',
      'Established learning routine',
      'Connected with developer community'
    ],
    skills: ['HTML', 'CSS', 'JavaScript Basics', 'Git', 'Problem Solving'],
    details: {
      duration: '12 months',
      highlights: [
        'First "Hello World" program',
        'Completed first website project',
        'Joined programming communities',
        'Developed problem-solving mindset'
      ]
    },
    icon: Target,
    color: 'from-orange-500 to-red-500'
  }
];

interface EnhancedTimelineProps {
  className?: string;
}

export function EnhancedTimeline({ className }: EnhancedTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'work': return Briefcase;
      case 'certification': return Award;
      case 'project': return Code;
      default: return Briefcase;
    }
  };

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
            Professional Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            An interactive timeline showcasing my growth from career transition to becoming a skilled developer
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500"
          />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineData.map((event, index) => {
              const Icon = event.icon;
              const isHovered = hoveredEvent === event.id;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {/* Timeline Node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-6 top-6 -translate-x-1/2"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.3 : 0
                      }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${event.color} -z-10`}
                    />
                  </motion.div>

                  {/* Event Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {event.date}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs bg-gradient-to-r ${event.color} text-white border-0`}
                              >
                                {event.type}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {event.title}
                            </h3>
                            <p className="text-primary font-medium mb-2">{event.subtitle}</p>
                            {event.location && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                            )}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Skills Preview */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {event.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{event.skills.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Key Achievement */}
                        <div className="text-sm text-muted-foreground">
                          <strong>Key Achievement:</strong> {event.achievements[0]}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${selectedEvent.color} flex items-center justify-center`}>
                          <selectedEvent.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Badge variant="secondary">{selectedEvent.date}</Badge>
                          <Badge variant="outline" className="ml-2">{selectedEvent.type}</Badge>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {selectedEvent.title}
                      </h3>
                      <p className="text-primary text-lg font-medium mb-2">
                        {selectedEvent.subtitle}
                      </p>
                      {selectedEvent.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {selectedEvent.location}
                          {selectedEvent.details?.duration && (
                            <>
                              <Calendar className="w-4 h-4 ml-4" />
                              {selectedEvent.details.duration}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedEvent(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Technologies & Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvent.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  {selectedEvent.details?.highlights && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Project Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedEvent.details.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* External Link */}
                  {selectedEvent.details?.website && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button asChild className="w-full">
                        <a 
                          href={selectedEvent.details.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
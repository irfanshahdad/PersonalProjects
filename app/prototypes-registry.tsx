// Prototypes Registry
// Add your prototype components here

import InterviewTracker from './prototypes/components/InterviewTracker';

export interface Prototype {
  id: string;
  name: string;
  description?: string;
  component: React.ComponentType;
}

export function getPrototypes(): Prototype[] {
  return [
    {
      id: 'interview-tracker',
      name: 'Interview Tracker App',
      description: 'A comprehensive interview management app for job seekers to track interviews, rounds, and progress across multiple companies.',
      component: InterviewTracker,
    },
    // Add your prototypes here:
    // {
    //   id: 'your-prototype-id',
    //   name: 'Your Prototype Name',
    //   description: 'Description of your prototype',
    //   component: YourComponent,
    // },
  ];
}

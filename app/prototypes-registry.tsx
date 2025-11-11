// Prototypes Registry
// Add your prototype components here

export interface Prototype {
  id: string;
  name: string;
  description?: string;
  component: React.ComponentType;
}

export function getPrototypes(): Prototype[] {
  return [
    // Add your prototypes here:
    // {
    //   id: 'your-prototype-id',
    //   name: 'Your Prototype Name',
    //   description: 'Description of your prototype',
    //   component: YourComponent,
    // },
  ];
}

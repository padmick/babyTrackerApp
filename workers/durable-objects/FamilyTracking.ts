import { FamilyState } from '../types';

export class FamilyTracking {
  private state: DurableObjectState;
  private family: FamilyState;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.family = { members: [], children: [], tasks: [] };
  }

  async fetch(request: Request) {
    // Load state on every request
    this.family = await this.state.storage.get('family') || {
      members: [],
      children: [],
      tasks: []
    };

    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    console.log('Request path:', url.pathname);
    console.log('Current family state:', JSON.stringify(this.family));

    switch (pathParts[0]) {
      case 'members':
        if (request.method === 'GET') {
          return new Response(JSON.stringify(this.family.members));
        } else if (request.method === 'POST') {
          const data = await request.json();
          this.family.members.push(data);
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(data), { status: 201 });
        }
        return new Response('Method Not Allowed', { status: 405 });

      case 'children':
        if (request.method === 'GET' && pathParts.length === 2) {
          const childId = pathParts[1];
          console.log('Fetching child with ID:', childId);
          const child = this.family.children.find(child => child.id === childId);
          if (child) {
            console.log('Child found:', child);
            return new Response(JSON.stringify(child));
          }
          console.error('Child not found:', childId);
          return new Response('Child not found', { status: 404 });
        } else if (request.method === 'POST') {
          const data = await request.json();
          console.log('Adding new child:', data);
          this.family.children.push(data);
          await this.state.storage.put('family', this.family);
          console.log('Updated family state:', JSON.stringify(this.family));
          return new Response(JSON.stringify(data), { status: 201 });
        } else if (request.method === 'GET' && pathParts.length === 3 && pathParts[2] === 'latest') {
          const childId = pathParts[1];
          const latestEntries = {
            feeding: this.family.children.find(child => child.id === childId)?.feedingEntries?.[0],
            journal: this.family.children.find(child => child.id === childId)?.journalEntries?.[0],
          };
          return new Response(JSON.stringify(latestEntries));
        }
        return new Response('Method Not Allowed', { status: 405 });

      case 'tasks':
        if (request.method === 'GET') {
          return new Response(JSON.stringify(this.family.tasks));
        } else if (request.method === 'POST') {
          const data = await request.json();
          this.family.tasks.push(data);
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(data), { status: 201 });
        }
        return new Response('Method Not Allowed', { status: 405 });

      default:
        if (request.method === 'GET') {
          return new Response(JSON.stringify(this.family));
        } else if (request.method === 'POST' && url.pathname === '/') {
          const data = await request.json();
          this.family = data;
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(this.family), { 
            status: 201,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        return new Response('Not Found', { status: 404 });
    }
  }
}
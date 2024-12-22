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
    switch (url.pathname) {
      case '/members':
        if (request.method === 'GET') {
          return new Response(JSON.stringify(this.family.members));
        } else if (request.method === 'POST') {
          const data = await request.json();
          this.family.members.push(data);
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(data), { status: 201 });
        }
        return new Response('Method Not Allowed', { status: 405 });

      case '/children':
        if (request.method === 'GET') {
          return new Response(JSON.stringify(this.family.children));
        } else if (request.method === 'POST') {
          const data = await request.json();
          this.family.children.push(data);
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(data), { status: 201 });
        }
        return new Response('Method Not Allowed', { status: 405 });

      case '/tasks':
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
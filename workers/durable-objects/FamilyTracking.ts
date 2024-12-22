import { FamilyState } from '../types';

export class FamilyTracking {
  private state: DurableObjectState;
  private family: FamilyState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    // Load state on every request
    this.family = await this.state.storage.get('family') || {
      members: [],
      children: [],
      tasks: []
    };

    switch (request.method) {
      case 'GET':
        switch (request.url) {
          case '/members':
            return new Response(JSON.stringify(this.family.members));
          case '/children':
            return new Response(JSON.stringify(this.family.children));
          case '/tasks':
            return new Response(JSON.stringify(this.family.tasks));
          default:
            return new Response(JSON.stringify(this.family));
        }

      case 'POST':
        try {
          const data = await request.json();
          // Handle root path initialization
          if (request.url === 'https://dummy-url/') {
            this.family = data;
            await this.state.storage.put('family', this.family);
            return new Response(JSON.stringify(this.family), { 
              status: 201,
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
          
          switch (request.url) {
            case '/members':
              this.family.members.push(data);
              break;
            case '/children':
              this.family.children.push(data);
              break;
            case '/tasks':
              this.family.tasks.push(data);
              break;
            default:
              return new Response('Not Found', { status: 404 });
          }
          await this.state.storage.put('family', this.family);
          return new Response(JSON.stringify(data), { status: 201 });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

      default:
        return new Response('Method Not Allowed', { status: 405 });
    }
  }
} 
import { FamilyTracking } from './durable-objects/FamilyTracking';
import { Env } from './types';

export { FamilyTracking };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-ID',
};

async function verifyFirebaseToken(token: string | null, env: Env) {
  if (!token) return null;
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );
    
    if (!response.ok) {
      console.error('Firebase verification failed:', await response.text());
      return null;
    }
    const data = await response.json();
    return data.users[0];
  } catch (error) {
    console.error('Firebase verification error:', error);
    return null;
  }
}

async function handleFamilyRoutes(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const user = await verifyFirebaseToken(request.headers.get('Authorization')?.replace('Bearer ', ''), env);
    
    if (!user) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders,
      });
    }

    if (request.method === 'POST') {
      console.log('Creating new family for user:', user.localId);
      
      // Create a new family
      const familyId = env.FAMILY_TRACKING.newUniqueId();
      console.log('Generated family ID:', familyId.toString());
      
      const familyObject = env.FAMILY_TRACKING.get(familyId);
      
      // Initialize the family with the creator as the first member
      const initData = {
        members: [{
          id: user.localId,
          email: user.email,
          role: 'owner'
        }],
        children: [],
        tasks: []
      };
      
      console.log('Initializing family with data:', JSON.stringify(initData));
      
      const response = await familyObject.fetch(new Request('https://dummy-url/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user.localId,
        },
        body: JSON.stringify(initData)
      }));

      const responseText = await response.text();
      console.log('Durable Object response:', response.status, responseText);

      if (!response.ok) {
        return new Response(`Failed to create family: ${responseText}`, { 
          status: 500,
          headers: corsHeaders 
        });
      }

      return new Response(JSON.stringify({ 
        id: familyId.toString(),
        message: 'Family created successfully'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Family creation error:', error);
    return new Response(`Internal Server Error: ${error.message}`, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}

async function handleUserRoutes(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const userId = pathParts[2];
    
    const user = await verifyFirebaseToken(
      request.headers.get('Authorization')?.replace('Bearer ', ''),
      env
    );
    
    if (!user) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders,
      });
    }

    if (request.method === 'GET') {
      // For now, just return the basic user info
      return new Response(JSON.stringify({
        id: user.localId,
        email: user.email,
        families: user.families || []
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('User route error:', error);
    return new Response(`Internal Server Error: ${error.message}`, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}

async function handleChildrenRoutes(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const user = await verifyFirebaseToken(request.headers.get('Authorization')?.replace('Bearer ', ''), env);

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    // Handle GET requests for individual child
    if (request.method === 'GET' && pathParts.length >= 3) {
      const childId = pathParts[2];
      
      // First, get the familyId from the query parameters
      const params = new URLSearchParams(url.search);
      const familyId = params.get('familyId');
      
      if (!familyId) {
        return new Response('Family ID is required', { 
          status: 400, 
          headers: corsHeaders 
        });
      }

      // Use the familyId to get the correct Durable Object instance
      const familyObject = env.FAMILY_TRACKING.get(env.FAMILY_TRACKING.idFromString(familyId));

      // Handle /api/children/{childId}/latest
      if (pathParts.length === 4 && pathParts[3] === 'latest') {
        const response = await familyObject.fetch(new Request(`https://dummy-url/children/${childId}/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-ID': user.localId,
          }
        }));
        return new Response(await response.text(), {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Handle /api/children/{childId}
      const response = await familyObject.fetch(new Request(`https://dummy-url/children/${childId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user.localId,
        }
      }));
      return new Response(await response.text(), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle POST request (existing code)
    if (request.method === 'POST') {
      const data = await request.json();
      const { familyId, ...childData } = data;
      console.log('Creating child with family ID:', familyId);

      const familyObject = env.FAMILY_TRACKING.get(env.FAMILY_TRACKING.idFromString(familyId));
      const childId = env.FAMILY_TRACKING.newUniqueId().toString();
      
      const response = await familyObject.fetch(new Request('https://dummy-url/children', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user.localId,
        },
        body: JSON.stringify({
          id: childId,
          ...childData,
          familyId,
          createdBy: user.localId
        })
      }));

      const responseData = await response.text();
      console.log('Child creation response:', responseData);

      return new Response(responseData, {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  } catch (error) {
    console.error('Error in handleChildrenRoutes:', error);
    return new Response(`Internal Server Error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

export default {
  async fetch(request: Request, env: Env) {
    try {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      const url = new URL(request.url);
      const pathParts = url.pathname.split('/').filter(Boolean);

      if (pathParts[0] === 'api') {
        switch (pathParts[1]) {
          case 'families':
            return handleFamilyRoutes(request, env);
          case 'users':
            return handleUserRoutes(request, env);
          case 'children':
            return handleChildrenRoutes(request, env);
          default:
            return new Response('Not Found', { 
              status: 404,
              headers: corsHeaders 
            });
        }
      }

      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders 
      });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Internal Server Error: ${error.message}`, { 
        status: 500,
        headers: corsHeaders 
      });
    }
  }
}
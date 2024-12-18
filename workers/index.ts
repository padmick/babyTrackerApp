export interface Env {
  FAMILY_TRACKING: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env) {
    try {
      const url = new URL(request.url);
      const familyId = url.searchParams.get('familyId');

      if (!familyId) {
        return new Response('Family ID is required', { status: 400 });
      }

      // Create a new Durable Object stub
      const id = env.FAMILY_TRACKING.idFromName(familyId);
      const familyObj = env.FAMILY_TRACKING.get(id);

      // Forward the request to the Durable Object
      return familyObj.fetch(request);
    } catch (err) {
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
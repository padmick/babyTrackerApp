// Add this method to the FamilyTracking class

private async handleInvite(request: Request) {
  if (request.method === 'POST') {
    const { email } = await request.json();
    const userId = request.headers.get('X-User-ID');
    
    // Generate a unique invitation token
    const token = nanoid();
    
    // Store the invitation
    await this.state.storage.put(`invite:${token}`, {
      email,
      invitedBy: userId,
      createdAt: new Date().toISOString(),
    });
    
    // Send invitation email using Cloudflare Email Routing
    const inviteUrl = `${new URL(request.url).origin}/accept-invite?token=${token}`;
    
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email }],
        }],
        from: {
          email: this.env.AUTH_EMAIL,
          name: 'Family Tracker',
        },
        subject: 'Invitation to Family Tracker',
        content: [{
          type: 'text/html',
          value: `
            <h1>You've been invited to Family Tracker</h1>
            <p>Click the link below to join and start collaborating:</p>
            <a href="${inviteUrl}">Accept Invitation</a>
          `,
        }],
      }),
    });
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response('Method not allowed', { status: 405 });
}
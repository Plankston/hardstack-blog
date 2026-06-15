interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const method = context.request.method;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // GET /api/views?slugs=slug1,slug2,slug3
  if (method === 'GET') {
    const slugs = searchParams.get('slugs')?.split(',').filter(Boolean) || [];
    if (slugs.length === 0) {
      return Response.json({ views: {} }, { headers });
    }

    const placeholders = slugs.map(() => '?').join(',');
    const { results } = await context.env.DB.prepare(
      `SELECT slug, count FROM views WHERE slug IN (${placeholders})`
    ).bind(...slugs).all<{ slug: string; count: number }>();

    const views: Record<string, number> = {};
    for (const row of results || []) {
      views[row.slug] = row.count;
    }

    return Response.json({ views }, { headers });
  }

  // POST /api/views { slug: "xxx" }
  if (method === 'POST') {
    const body = await context.request.json<{ slug?: string }>();
    const slug = body?.slug;

    if (!slug) {
      return Response.json({ error: 'slug required' }, { status: 400, headers });
    }

    // Insert or increment view count
    await context.env.DB.prepare(
      `INSERT INTO views (slug, count) VALUES (?, 1)
       ON CONFLICT (slug) DO UPDATE SET count = count + 1`
    ).bind(slug).run();

    // Return updated count
    const row = await context.env.DB.prepare(
      `SELECT count FROM views WHERE slug = ?`
    ).bind(slug).first<{ count: number }>();

    return Response.json({ count: row?.count || 0 }, { headers });
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405, headers });
};

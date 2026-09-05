// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Check if the incoming request already has a Request ID (e.g., from an API Gateway or Cloudflare) assuming its hosted on such a platform but seeing as I don't ever intend on doing that for this project I think this  line is redundant
    const existingRequestId = request.headers.get('x-request-id');

    // 2. Use existing or generate a new UUID
    const requestId = existingRequestId || crypto.randomUUID();

    // 3. Clone the request headers and add the x-request-id
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);

    // 4. Pass the modified headers to downstream route handlers
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // 5. Optionally expose the Request ID in the response headers back to the client
    response.headers.set('x-request-id', requestId);

    return response;
}

// Ensure middleware only runs on API routes (adjust matcher as needed)
export const config = {
    matcher: '/api/:path*',
};
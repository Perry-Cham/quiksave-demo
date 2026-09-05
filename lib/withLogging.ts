import { requestContext } from './logger';
import { NextRequest } from 'next/server';
import { getLogger } from './logger';

export default function withLogging(handler: (req: NextRequest, ctx: any) => Promise<Response>) {
    return async (req: NextRequest, ctx: any) => {
        const logger = getLogger().child().withContext({
            requestId: req.headers.get('x-request-id') || 'unknown',
            method: req.method,
            url: req.url,
        });

        requestContext.run({ logger }, () => handler(req, ctx));
    }
} 
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

interface ApiHandlerOptions {
    requestSchema?: z.ZodType;
    responseSchema?: z.ZodType;
    requireAuth?: boolean;
}

export function withValidation(options: ApiHandlerOptions) {
    return (handler: (data: any, ctx: any) => Promise<any>) => {
        return async (request: NextRequest, context: any) => {
            const requestId = crypto.randomUUID();

            try {
                // Validate request if schema provided
                let validatedData = null;
                if (options.requestSchema) {
                    const body = request.method !== 'GET'
                        ? await request.json().catch(() => ({}))
                        : {};

                    validatedData = options.requestSchema.parse(body);

                }

                // Validate response if schema provided
                let response = await handler(validatedData, context);

                if (options.responseSchema && response instanceof NextResponse) {
                    const responseBody = await response.json();
                    const validation = options.responseSchema.parse(responseBody);
                    if (validation instanceof z.ZodError) {
                        console.error('Response validation failed:', validation.issues);
                        // In development, fail loudly

                    }
                }

                return response;
            } catch (error) {
                if (error instanceof z.ZodError) {
                    if (process.env.NODE_ENV === 'development') {
                        return NextResponse.json(
                            {
                                success: false,
                                error: {
                                    code: 'RESPONSE_VALIDATION_ERROR',
                                    message: 'Server response validation failed',
                                    details: error.issues,
                                },
                            },
                            { status: 500 }
                        );
                    }
                    return NextResponse.json(
                        {
                            success: false,
                            error: {
                                code: 'VALIDATION_ERROR',
                                message: 'Invalid request',
                                details: error.issues,
                            },
                            requestId,
                        },
                        { status: 400 }
                    );


                }
                console.error(`[${requestId}] API Error:`, error);
                return NextResponse.json(
                    {
                        success: false,
                        error: {
                            code: 'INTERNAL_ERROR',
                            message: 'Internal server error',
                        },
                        requestId,
                    },
                    { status: 500 }
                );
            }
        };
    };
}
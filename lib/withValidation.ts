import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';
import { errorResponse, ErrorCodes } from "@/lib/api-response";

interface ApiHandlerOptions {
    requestSchema?: z.ZodType;
    request?: NextRequest;
    responseSchema?: z.ZodType;
    requireAuth?: boolean;
}

export function withValidation({ requestSchema, responseSchema, requireAuth }: ApiHandlerOptions) {
    return (handler: (data: any, ctx: any) => Promise<any>) => {
        return async (request: NextRequest, context: any) => {
            //Extract request headers to get request-id
            const rheaders = await headers();
            const requestId = rheaders.get("x-request-id");

            //If its a protected route make sure the user has a valid session
            if (requireAuth) {
                const session = await auth.api.getSession({
                    headers: await headers(),
                });
                if (!session) {
                    return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401, undefined, requestId || crypto.randomUUID());
                }
            }

            //Do the actual request validation
            try {
                // Validate request if schema provided
                let validatedData = null;
                if (requestSchema) {
                    const body = request.method !== 'GET'
                        ? await request.json().catch(() => ({}))
                        : {};

                    validatedData = requestSchema.parse(body);
                }

                // Validate response if schema provided
                let response = await handler(validatedData, context);

                if (responseSchema && response instanceof NextResponse) {
                    const responseBody = await response.json();
                    const validation = responseSchema.parse(responseBody);
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
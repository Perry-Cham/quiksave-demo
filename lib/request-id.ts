import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateRequestId(request: NextRequest) {
    request.headers.set("x-request-id", crypto.randomUUID());
}
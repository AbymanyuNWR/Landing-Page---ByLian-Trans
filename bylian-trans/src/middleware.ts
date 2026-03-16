import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { rateLimit } from "@/lib/ratelimit";

const { auth } = NextAuth(authConfig);

const RATE_LIMIT_CONFIG = {
  api: { limit: 60, window: 60 },
  auth: { limit: 5, window: 60 },
  default: { limit: 120, window: 60 },
};

export default auth(async (request: any) => {
  try {
    const { pathname } = request.nextUrl;
    const ip = request.ip ?? "127.0.0.1";
    const isLoggedIn = !!request.auth;

    // 1. RATE LIMITING (Task #1)
    let limit = RATE_LIMIT_CONFIG.default.limit;
    let window = RATE_LIMIT_CONFIG.default.window;

    if (pathname.startsWith("/api")) {
      limit = RATE_LIMIT_CONFIG.api.limit;
      window = RATE_LIMIT_CONFIG.api.window;
    } else if (pathname.startsWith("/auth") || pathname.startsWith("/daftar") || pathname.startsWith("/masuk")) {
      limit = RATE_LIMIT_CONFIG.auth.limit;
      window = RATE_LIMIT_CONFIG.auth.window;
    }

    const rlResult = await rateLimit(ip, limit, window);

    if (!rlResult.success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": rlResult.reset.toString(),
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Reset": rlResult.reset.toString(),
        },
      });
    }

    // 2. AUTHENTICATION & RBAC (Task #8)
    const isAdminRoute = pathname.startsWith("/admin");
    const isUserRoute = pathname.startsWith("/akun");
    const isAuthRoute = pathname.startsWith("/masuk") || pathname.startsWith("/daftar");

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return NextResponse.next();
    }

    if (isAdminRoute) {
      if (!isLoggedIn) {
        return Response.redirect(new URL("/masuk", request.nextUrl));
      }
      const role = request.auth?.user?.role;
      if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
          return Response.redirect(new URL("/", request.nextUrl));
      }
    }

    if (isUserRoute && !isLoggedIn) {
      return Response.redirect(new URL("/masuk", request.nextUrl));
    }

    // 3. SECURITY HEADERS & CORS (Task #3, #4, #5)
    const response = NextResponse.next();
    const headers = response.headers;

    const origin = request.headers.get("origin");
    const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"];
    
    if (origin && allowedOrigins.includes(origin)) {
      headers.set("Access-Control-Allow-Origin", origin);
    }
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    headers.set("X-DNS-Prefetch-Control", "on");
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "origin-when-cross-origin");
    headers.set("X-XSS-Protection", "1; mode=block");

    headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: blob: res.cloudinary.com; font-src 'self' fonts.gstatic.com; connect-src 'self' *.upstash.io *.google-analytics.com;"
    );

    return response;
  } catch (error: any) {
    // 5. ERROR SHIELDING (Task #5)
    console.error("Middleware Critical Error:", error.message);
    if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    return new NextResponse("Service Unavailable", { status: 503 });
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

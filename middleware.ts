import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	// Get the pathname of the request
	const path = request.nextUrl.pathname;

	// Check if the path starts with /protected
	const isProtectedRoute = path.startsWith("/protected");

	if (isProtectedRoute) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		// If there is no token, redirect to the signin page
		if (!token) {
			const url = new URL("/auth/signin", request.url);
			url.searchParams.set("callbackUrl", path);
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
	matcher: ["/protected/:path*"],
};

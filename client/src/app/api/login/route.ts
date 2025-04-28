import { LoginFormData } from "@/app/login/page";
import { EXTERNAL_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body: LoginFormData = await req.json();

        type RegisterResponse = {
            success: string;
        } | ErrorResponse;

        const responseJson = await fetchRequest<LoginFormData, RegisterResponse>({
            url: `${EXTERNAL_URL}auth/login`,
            method: "POST",
            body,
        });

        if ("success" in responseJson) {
            const response = NextResponse.json({ message: "Registered successfully" });

            // Set cookie expiration (1 day) if "remember" is true
            const expiresDate = body.remember
                ? new Date(Date.now() + 60 * 60 * 24 * 1000) // 1 day = 86400s = 86400000ms
                : undefined;

            response.cookies.set("token", responseJson.success, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                expires: expiresDate,
            });

            return response;
        } else {
            return NextResponse.json(
                { message: responseJson.message || "Registration failed" },
                { status: responseJson.statusCode }
            );
        }
    } catch (err) {
        const error = err as ErrorResponse;
        return NextResponse.json(
            { message: error.message },
            { status: error.statusCode }
        );
    }
}
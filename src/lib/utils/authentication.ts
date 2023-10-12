import type { VerifiedUserWrapper } from "$lib/services/api/types/authentication";
import type { VerifiedUser } from "$lib/types/authentication";
import { error } from "@sveltejs/kit";

export const fetchUserInfo = async (cookie: string): Promise<VerifiedUser | null > => {
    const headers: HeadersInit = {};
    headers.Accept = 'application/json';
    headers.cookie = cookie;

    const response: Response = await fetch(`http://127.0.0.1:8000/auth/verify/`, {
        headers,
        credentials: 'include',
    });

    if (response.status >= 400) {
        throw error(response.status, response.statusText);
    }

    const data: VerifiedUserWrapper = await response.json();

    console.log("fetchUserInfo", data);

    return data?.user ?? null;
}
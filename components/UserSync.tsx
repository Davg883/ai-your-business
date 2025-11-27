"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useRef } from "react";

export function UserSync() {
    const { user, isLoaded, isSignedIn } = useUser();
    const syncUser = useMutation(api.users.syncUser);
    const hasSynced = useRef(false);

    useEffect(() => {
        if (isLoaded && isSignedIn && user && !hasSynced.current) {
            hasSynced.current = true;

            syncUser({
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress || "",
                name: user.fullName || user.firstName || undefined,
                imageUrl: user.imageUrl || undefined,
            })
                .then(() => console.log("User synced to Convex:", user.id))
                .catch((error) => {
                    console.error("Failed to sync user:", error);
                    hasSynced.current = false;
                });
        }
        if (isLoaded && !isSignedIn) {
            hasSynced.current = false;
        }
    }, [isLoaded, isSignedIn, user, syncUser]);

    return null;
}

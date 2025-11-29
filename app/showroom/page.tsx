"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HeroDualPersonality } from "@/components/sections/HeroDualPersonality";
import { AgentsGrid } from "@/components/sections/AgentsGrid";

export default function ShowroomPage() {
    return (
        <AppShell>
            <HeroDualPersonality />
            <AgentsGrid />
        </AppShell>
    );
}


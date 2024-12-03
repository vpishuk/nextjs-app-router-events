"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createContext } from "react";

export type AppRouterEvent = "beforeNavigate";
export type AppRouterEventData = {
    href: string;
};

type AppRouterEventsContextValue = AppRouterInstance & {
    subscribe: (
        event: AppRouterEvent,
        handler: (data?: AppRouterEventData) => boolean | Promise<boolean>
    ) => () => void;
};
export const AppRouterEventsContext = createContext<AppRouterEventsContextValue>({
    subscribe: () => () => {},
    push: () => {},
    refresh: () => {},
    replace: () => {},
    back: () => {},
    forward: () => {},
    prefetch: () => {}
});

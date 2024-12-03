"use client";

import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { AppRouterEvent, AppRouterEventData, AppRouterEventsContext } from "./AppRouterEventsContext";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Route } from "next";

export const AppRouterEventsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    const [listeners, setListeners] = useState<
        Record<string, Array<((data?: AppRouterEventData) => boolean | Promise<boolean>) | undefined>>
    >({});

    const executeListeners = useCallback(async (name: AppRouterEvent, data?: AppRouterEventData) => {
        const eventListeners = listeners[name] ?? [];
        if (eventListeners.length <= 0) {
            return true;
        }

        const shallProceed = true;

        for (const handler of eventListeners) {
            if (handler) {
                const result = await handler(data);
                if (result === false) {
                    return result;
                }
            }
        }

        return shallProceed;
    }, []);

    const subscribe = useCallback(
        (name: AppRouterEvent, handler: (data?: AppRouterEventData) => boolean | Promise<boolean>) => {
            listeners[name] = listeners[name] || [];
            const i = listeners[name].length;
            listeners[name].push(handler);
            setListeners({
                ...listeners
            });

            return () => {
                setListeners((oldListeners) => {
                    const actionListeners = oldListeners[name] || [];
                    if (actionListeners[i]) {
                        actionListeners[i] = undefined;

                        return {
                            ...oldListeners,
                            [name]: actionListeners
                        };
                    }
                    return { ...oldListeners };
                });
            };
        },
        []
    );

    const back = useCallback(async () => {
        const shallProceed = await executeListeners("beforeNavigate");
        if (shallProceed) {
            router.back();
        }
    }, [router.back, executeListeners]);

    const forward = useCallback(async () => {
        const shallProceed = await executeListeners("beforeNavigate");
        if (shallProceed) {
            router.forward();
        }
    }, [router.forward, executeListeners]);

    const refresh = useCallback(async () => {
        const shallProceed = await executeListeners("beforeNavigate");
        if (shallProceed) {
            router.refresh();
        }
    }, [router.refresh, executeListeners]);

    const replace = useCallback(
        async (href: string, options?: NavigateOptions) => {
            const shallProceed = await executeListeners("beforeNavigate", { href });
            if (shallProceed) {
                router.replace(href as Route, options);
            }
        },
        [router.replace, executeListeners]
    );

    const prefetch = useCallback(
        async (href: string) => {
            const shallProceed = await executeListeners("beforeNavigate");
            if (shallProceed) {
                router.prefetch(href as Route);
            }
        },
        [router.prefetch, executeListeners]
    );

    const push = useCallback(
        async (href: string, options?: NavigateOptions) => {
            const shallProceed = await executeListeners("beforeNavigate", { href });
            if (shallProceed) {
                router.push(href as Route, options);
            }
        },
        [router.push, executeListeners]
    );

    const value = useMemo(
        () => ({ back, forward, subscribe, refresh, replace, prefetch, push }),
        [subscribe, back, forward, refresh, replace, prefetch, push]
    );

    return <AppRouterEventsContext.Provider value={value}>{children}</AppRouterEventsContext.Provider>;
};

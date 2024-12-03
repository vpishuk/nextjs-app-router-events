import { useContext } from "react";
import { AppRouterEventsContext } from "./AppRouterEventsContext";

export const useAppRouterEvents = () => {
    return useContext(AppRouterEventsContext);
};

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const {isLoading, error, data: setting} = useQuery({
        queryKey: ["setting"],
        queryFn: getSettings
    });
    return {isLoading, setting, error}
}
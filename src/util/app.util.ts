import { format } from "date-fns";

export function formatDate(dateTime: string): string {
    return format(new Date(dateTime), "dd/MM/yyyy");
}

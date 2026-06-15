/**
 * Parses date string in DD.MM.YYYY format and time string in HH:mm format
 * and returns a standard JavaScript Date object.
 */
export function parseEventDateTime(dateStr: string, timeStr: string): Date {
  const [day, month, year] = dateStr.split(".").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  // Assuming Vietnamese timezone (+07:00) for standard calculations
  return new Date(year, month - 1, day, hour, minute);
}

/**
 * Formats a Date object into Google Calendar ISO 8601 basic format (UTC):
 * YYYYMMDDTHHmmssZ
 */
export function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Generates a Google Calendar link for a wedding event.
 */
export function generateGoogleCalendarLink(event: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  durationHours?: number;
}): string {
  const duration = event.durationHours ?? 3; // default event duration is 3 hours
  const endDate = new Date(event.startDate.getTime() + duration * 60 * 60 * 1000);

  const startStr = formatGoogleDate(event.startDate);
  const endStr = formatGoogleDate(endDate);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an iCalendar (ICS) Data URI for Apple Calendar / Outlook.
 */
export function generateIcsDataUri(event: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  durationHours?: number;
}): string {
  const duration = event.durationHours ?? 3;
  const endDate = new Date(event.startDate.getTime() + duration * 60 * 60 * 1000);

  const formatIcalDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const sanitizeText = (str: string) => {
    return str.replace(/[,;]/g, "\\$&").replace(/\n/g, "\\n");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Landing Page//NONSGML Event//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:wedding-event-${event.title.replace(/\s+/g, "-")}-${event.startDate.getTime()}@wedding`,
    `DTSTAMP:${formatIcalDate(new Date())}`,
    `DTSTART:${formatIcalDate(event.startDate)}`,
    `DTEND:${formatIcalDate(endDate)}`,
    `SUMMARY:${sanitizeText(event.title)}`,
    `DESCRIPTION:${sanitizeText(event.description)}`,
    `LOCATION:${sanitizeText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}

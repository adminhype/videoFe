/** Defines the visual style of the toast notification. */
export type ToastType = 'success' | 'error';

/** Represents the data structure of a single toast message. */
export interface ToastMessage {
    /** The text to display. */
    text: string;
    /** The visual style (e.g., green for success, red for error). */
    type: ToastType;
}
export type ToastType = 'success' | 'error';

export interface ToastMessage {
    text: string;
    type: ToastType;
    }
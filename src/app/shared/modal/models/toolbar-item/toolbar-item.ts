export interface IToolbarItem {
    disabled?: boolean;
    html?: string;
    location?: string;
    options?: { [key: string]: any };
    template?: any;
    text?: string;
    toolbar?: string;
    visible?: boolean;
    widget?: string;
}

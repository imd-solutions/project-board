export interface Button {
    topCss?: string;
    title: string;
    icon?: string;
    css: string;
    size?: string;
    width?: string;
    undisable?: boolean;
    multiline?: boolean;
    btnSide?: boolean;
    method: Method;
}

interface Method {
    name: string;
    action?: string;
    additional?: string;
}

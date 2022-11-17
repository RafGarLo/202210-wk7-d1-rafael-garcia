export type Table = {
    id: string | number;
    name: string;
    material: string;
    recycled: boolean;
}

export type ProtoTable = {
    name?: string | number;
    material?: string;
    recycled?: boolean;
}

export type Table = {
    id: string;
    name: string;
    material: string;
    recycled: boolean;
}

export type ProtoTable = {
    name?: string;
    material?: string;
    recycled?: boolean;
}

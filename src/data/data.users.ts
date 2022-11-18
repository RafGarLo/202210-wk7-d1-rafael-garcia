export type id = string;

export interface UsersData<T> {
    post: (data: Partial<T>) => Promise<T>;
}

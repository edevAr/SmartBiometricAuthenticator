export declare abstract class EntityBase<TId = string> {
    readonly id: TId;
    protected constructor(id: TId);
}

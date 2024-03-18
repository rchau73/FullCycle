import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type InvoiceItemsProp = {
    id?: Id;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemsProp) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._price = props.price;
        this.validate();
    }

    get name() : string{ return this._name; }
    get price(): number {return this._price; }

    validate(): boolean {
        if (this._name.length === 0) {
            throw new Error ("Item Name is required");
        }  
        if (this._price < 0) {
            throw new Error("Item Price must be greater equal than zero");
        }
        return true;
    }
}
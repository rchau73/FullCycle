import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "./invoice_items";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
        this.validate();
    }

    get name(): string { return this._name; }

    get document(): string { return this._document; }

    get address(): Address { return this._address; }

    get items(): InvoiceItems[] { return this._items; }

    totalValue(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

    validate(): boolean {
        if (this._name.length === 0) {
            throw new Error ("Invoice Name is required");
        }
        if (this._document.length === 0) {
            throw new Error("Invoice Document is required");
        }
        if (this._items.length === 0) {
            throw new Error("Invoice Items are required");
        }  
        if (this.totalValue() === 0) {
            throw new Error('Invoice amount should not be Zero');
        }
        return true;
    }

}
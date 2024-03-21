import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoice_items";

describe("Invoice Items Unit Tests", () => {

    it("should throw error when name is empty", () => {
        expect(() => {
            let items = new InvoiceItems({
                id: new Id("1"),
                name: "",
                price: 10,
            });
        }).toThrowError("Item Name is required");
    });

    it("should throw error when any price is less then zero", () => {
        expect(() => {
            let items = new InvoiceItems({
                id: new Id("1"),
                name: "Test Item",
                price: -10,
            });
        }).toThrowError("Item Price must be greater equal than zero");
    });

    it("should successfully create an item", () => {
        let item = new InvoiceItems({
            id: new Id("1"),
            name: "Test Item",
            price: 10,
        });
        expect(item.id.id).toBe("1");
        expect(item.name).toBe( "Test Item" );
        expect(item.price).toEqual(10);
    });

    it("should successfully create an item even when has zero price", () => {
        let item = new InvoiceItems({
            id: new Id("1"),
            name: "Test Item",
            price: 0,
        });
        expect(item.id.id).toBe("1");
        expect(item.name).toBe( "Test Item" );
        expect(item.price).toEqual(0);
    });
});
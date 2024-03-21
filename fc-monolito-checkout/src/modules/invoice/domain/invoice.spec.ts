import Invoice from "./invoice.entity";
import InvoiceItems from "./invoice_items";

describe("Invoice Unit Tests", () => {
    let item = new InvoiceItems({
        name: "Item 1",
        price: 10,
    });
    let item2 = new InvoiceItems({
        name: "Item 2",
        price: 50,
    });
    let itemZero = new InvoiceItems({
        name: "Item 1",
        price: 0,
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let invoice = new Invoice({
                name: "",
                document: "My document has nothing!",
                street: "Miro Vettorazzo",
                number: "200",
                complement: "casa 99",
                city: "São Bernardo do Campo",
                state: "São Paulo",
                zipCode: "09820135",
                items: [item],
            });
        }).toThrowError("Invoice Name is required");
    });

    it("should throw error when document is empty", () => {
        expect(() => {
            let invoice = new Invoice({
                name: "Invoice #1",
                document: "",
                street: "Miro Vettorazzo",
                number: "200",
                complement: "casa 99",
                city: "São Bernardo do Campo",
                state: "São Paulo",
                zipCode: "09820135",
                items: [item],
            });
        }).toThrowError("Invoice Document is required");
    });

    it("should throw error when there are no items", () => {
        expect(() => {
            let invoice = new Invoice({
                name: "Invoice #1",
                document: "My document has nothing!",
                street: "Miro Vettorazzo",
                number: "200",
                complement: "casa 99",
                city: "São Bernardo do Campo",
                state: "São Paulo",
                zipCode: "09820135",
                items: [],
            });
        }).toThrowError("Invoice Items are required");
    });

    it("should throw error when items prices are not greater then zero", () => {
        expect(() => {
            let invoice = new Invoice({
                name: "Invoice #1",
                document: "My document has nothing!",
                street: "Miro Vettorazzo",
                number: "200",
                complement: "casa 99",
                city: "São Bernardo do Campo",
                state: "São Paulo",
                zipCode: "09820135",
                items: [itemZero],
            });
        }).toThrowError("Invoice amount should not be Zero");
    });

    it("should create successfully an invoice with multiple items", () => {
        let invoice = new Invoice({
            name: "Invoice #2",
            document: "My document has nothing!",
            street: "Miro Vettorazzo",
            number: "200",
            complement: "casa 99",
            city: "São Bernardo do Campo",
            state: "São Paulo",
            zipCode: "09820135",
            items: [item, item2],
        }); 
        expect(invoice.id.id).toBeDefined();
        expect(invoice.totalValue()).toBe(60);
        expect(invoice.name).toBe("Invoice #2");
        expect(invoice.document).toBe("My document has nothing!");
        expect(invoice.street).toEqual("Miro Vettorazzo");
        expect(invoice.items[0]).toEqual(item);
        expect(invoice.items[1]).toEqual(item2);
    });
});
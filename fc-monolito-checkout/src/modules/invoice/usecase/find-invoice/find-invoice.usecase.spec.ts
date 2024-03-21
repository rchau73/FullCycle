import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice_items";
import FindInvoiceUseCase from "./find-invoice.usecase";
import { FindInvoiceUseCaseInputDto } from "./find-invoice.usecase.dto";
 
const item = new InvoiceItems ({
    id: new Id("1"),
    name: "Product Test 001",
    price: 10,
});

const item2 = new InvoiceItems ({
    id: new Id("2"),
    name: "Product Test 002",
    price: 50,
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "#0001/24",
    document: "Document test 001",
    street: "Miro Vettorazzo",
    number: "200",
    complement: "casa 99",
    city: "São Bernardo do Campo",
    state: "São Paulo",
    zipCode: "09820135",
    items: [item, item2],
}); 

const MockRepository = () => {
    return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Find-Invoice Usecase unit test", () => {

    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase (repository)
  
        const input : FindInvoiceUseCaseInputDto = { id: "1" }

        const output =  await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toBe(input.id);
        expect(output.name).toEqual(invoice.name);
        expect(output.document).toEqual(invoice.document);
        expect(output.address.street).toEqual(invoice.street);
        expect(output.address.number).toEqual(invoice.number);
        expect(output.address.complement).toEqual(invoice.complement);
        expect(output.address.city).toEqual(invoice.city);
        expect(output.address.state).toEqual(invoice.state);
        expect(output.address.zipCode).toEqual(invoice.zipCode);
        expect(output.items.length).toEqual(invoice.items.length);
        expect(output.total).toEqual(60);
        expect(output.createdAt).toBeDefined();
    });
});
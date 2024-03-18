import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice_items";
import FindInvoiceUseCase from "./find-invoice.usecase";
import { FindInvoiceUseCaseInputDto } from "./find-invoice.usecase.dto";

const address = new Address(
    "Miro Vettorazzo",
    "200",
    "casa 99", 
    "São Bernardo do Campo", 
    "São Paulo", 
    "09820135");
  
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
    address: address,
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
    
        console.log(input);
        const output =  await usecase.execute(input);
        console.log(output);

        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toBe(input.id);
        expect(output.name).toEqual(invoice.name);
        expect(output.document).toEqual(invoice.document);
        expect(output.address.street).toEqual(invoice.address.street);
        expect(output.address.number).toEqual(invoice.address.number);
        expect(output.address.complement).toEqual(invoice.address.complement);
        expect(output.address.city).toEqual(invoice.address.city);
        expect(output.address.state).toEqual(invoice.address.state);
        expect(output.address.zipCode).toEqual(invoice.address.zipCode);
        expect(output.items.length).toEqual(invoice.items.length);
        expect(output.total).toEqual(60);
        expect(output.createdAt).toBeDefined();
    });
});
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice_items";
import GenerateInvoiceUseCase from "./generate-invoice.usecase"
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.usecase.dto";

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
  name: "#0001/24",
  document: "Document test 001",
  address: address,
  items: [item, item2],
}); 

const MockRepository = () => {
    return {
      generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
      find: jest.fn()
    }
  }
  
  describe("Generate Invoice use case unit test", () => {
  
    it("should generate an Invoice", async () => {
  
      const repository = MockRepository()
      const usecase = new GenerateInvoiceUseCase (repository)
  
      const input : GenerateInvoiceUseCaseInputDto = {
        name: invoice.name,
        document: invoice.document,
        street: address.street,
        number: address.number,
        complement: address.complement, 
        city: address.city, 
        state: address.state, 
        zipCode: address.zipCode,
        items: [
            {
                id: item.id.id,
                name: item.name,
                price: item.price,
            },
            {
                id: item2.id.id,
                name: item2.name,
                price: item2.price,
            }
        ],
      }
  
      const output =  await usecase.execute(input);
  
      expect(repository.generate).toHaveBeenCalled();
      expect(output.id).toBeDefined();
      expect(output.name).toEqual(input.name);
      expect(output.document).toEqual(input.document);
      expect(output.street).toEqual(input.street);
      expect(output.number).toEqual(input.number);
      expect(output.complement).toEqual(input.complement);
      expect(output.city).toEqual(input.city);
      expect(output.state).toEqual(input.state);
      expect(output.zipCode).toEqual(input.zipCode);
      expect(output.items.length).toEqual(input.items.length);
      expect(output.total).toEqual(60);
  
    })
  })
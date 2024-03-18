import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice_items";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";

describe("Invoice repository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([
        InvoiceModel,
        InvoiceItemModel,
      ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
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
    id: new Id("123"),
    name: "#0001/24",
    document: "Document test 001",
    address: address,
    items: [item, item2],
    }); 

    it("should create a new invoice", async () => {
    
      const invoiceRepository = new InvoiceRepository();
      const result = await invoiceRepository.generate(invoice);

      expect(result.id.id).toEqual(invoice.id.id);
      expect(result.name).toBe(invoice.name);
      expect(result.document).toBe(invoice.document);
      expect(result.address.street).toBe(invoice.address.street);
      expect(result.address.number).toBe(invoice.address.number);
      expect(result.address.city).toBe(invoice.address._city);
      expect(result.address.complement).toBe(invoice.address.complement);
      expect(result.address.state).toBe(invoice.address._state);
      expect(result.address.zipCode).toBe(invoice.address._zipCode);
      expect(result.items.length).toBe(invoice.items.length);
      expect(result.totalValue() ).toBe(60);
    });
  
    it("should find an invoice", async () => {

      const invoiceRepository = new InvoiceRepository();
      await invoiceRepository.generate(invoice);
  
      const result = await invoiceRepository.find("123");
  
      expect(result.id.id).toEqual(invoice.id.id);
      expect(result.name).toBe(invoice.name);
      expect(result.document).toBe(invoice.document);
      expect(result.address.street).toBe(invoice.address.street);
      expect(result.address.number).toBe(invoice.address.number);
      expect(result.address.city).toBe(invoice.address._city);
      expect(result.address.complement).toBe(invoice.address.complement);
      expect(result.address.state).toBe(invoice.address._state);
      expect(result.address.zipCode).toBe(invoice.address._zipCode);
      expect(result.items.length).toBe(invoice.items.length);
      expect(result.totalValue() ).toBe(60);

    });
  
    it("should throw an error if invoice is not found", async () => {
      const invoiceRepository = new InvoiceRepository();
      await invoiceRepository.generate(invoice);
  
      expect(async () => {
        await invoiceRepository.find("999");
      }).rejects.toThrow("Invoice not found");
    });
});
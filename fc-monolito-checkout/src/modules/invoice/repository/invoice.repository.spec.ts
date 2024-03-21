import { Sequelize } from "sequelize-typescript";
import InvoiceItems from "../domain/invoice_items";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";

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
    street: "Miro Vettorazzo",
    number: "200",
    complement: "casa 99",
    city: "São Bernardo do Campo",
    state: "São Paulo",
    zipCode: "09820135",
    items: [item, item2],
    }); 

    it("should create a new invoice", async () => {
    
      const invoiceRepository = new InvoiceRepository();
      const result = await invoiceRepository.generate(invoice);

      expect(result.id.id).toEqual(invoice.id.id);
      expect(result.name).toBe(invoice.name);
      expect(result.document).toBe(invoice.document);
      expect(result.street).toBe(invoice.street);
      expect(result.number).toBe(invoice.number);
      expect(result.city).toBe(invoice.city);
      expect(result.complement).toBe(invoice.complement);
      expect(result.state).toBe(invoice.state);
      expect(result.zipCode).toBe(invoice.zipCode);
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
      expect(result.street).toBe(invoice.street);
      expect(result.number).toBe(invoice.number);
      expect(result.city).toBe(invoice.city);
      expect(result.complement).toBe(invoice.complement);
      expect(result.state).toBe(invoice.state);
      expect(result.zipCode).toBe(invoice.zipCode);
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
import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice_items";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import { FindInvoiceFacadeInputDto, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Generate Invoice FACADE unit test", () => {
  
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
        name: "#0001/24",
        document: "Document test 001",
        address: address,
        items: [item, item2],
      }); 
      
    it("should generate an Invoice", async () => {
  
      /*const repository = new InvoiceRepository();
      const usecase = new GenerateInvoiceUseCase(repository);
      const facade = new InvoiceFacade({
        generateUsecase: usecase,
        findUsecase: undefined,
      });*/
      const facade = InvoiceFacadeFactory.create();

      const input : GenerateInvoiceFacadeInputDto = {
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
  
      const output =  await facade.generate(input);

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

    it("should find an Invoice", async () => {
  
       /* const repository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUseCase(repository);
        const findUsecase = new FindInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
          generateUsecase: generateUsecase,
          findUsecase: findUsecase,
        });*/
        const facade = InvoiceFacadeFactory.create();
  
        const input : GenerateInvoiceFacadeInputDto = {
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
    
        const savedInvoice =  await facade.generate(input);
        let invoiceKey : FindInvoiceFacadeInputDto = { id : savedInvoice.id };

        const output =  await facade.find(invoiceKey);

        console.log(output)

        expect(output.id).toEqual(invoiceKey.id);
        expect(output.name).toEqual(input.name);
        expect(output.document).toEqual(input.document);
        expect(output.address.street).toEqual(input.street);
        expect(output.address.number).toEqual(input.number);
        expect(output.address.complement).toEqual(input.complement);
        expect(output.address.city).toEqual(input.city);
        expect(output.address.state).toEqual(input.state);
        expect(output.address.zipCode).toEqual(input.zipCode);
        expect(output.items.length).toEqual(input.items.length);
        expect(output.total).toEqual(60);
    
      })
})
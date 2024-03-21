import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice_items";
import { FindInvoiceFacadeInputDto, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";

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
        street: "Miro Vettorazzo",
        number: "200",
        complement: "casa 99",
        city: "São Bernardo do Campo",
        state: "São Paulo",
        zipCode: "09820135",
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
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement, 
        city: invoice.city, 
        state: invoice.state, 
        zipCode: invoice.zipCode,
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
          street: invoice.street,
          number: invoice.number,
          complement: invoice.complement, 
          city: invoice.city, 
          state: invoice.state, 
          zipCode: invoice.zipCode,
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
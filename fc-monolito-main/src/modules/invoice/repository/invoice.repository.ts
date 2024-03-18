import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice_items";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {

    const output = await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      items: input.items.map((item) => ({
        id: item.id.id,
        invoice_id: input.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      total: input.totalValue(),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }, 
    {
        include: [{ model: InvoiceItemModel }],
    });

    const invoiceItems: InvoiceItems[] = [];
    output.items.map(item => {
        const invoiceItem = new InvoiceItems({id: new Id(item.id), name: item.name, price: item.price, createdAt: item.createdAt, updatedAt: item.updatedAt});
        invoiceItems.push(invoiceItem);
    });

    const address = new Address(
        output.street,
        output.number,
        output.complement,
        output.city,
        output.state,
        output.zipCode,
    );

    const invoice = new Invoice({
        id: new Id(output.id),
        name: output.name,
        document: output.document,
        address: address,
        items: invoiceItems,
        createdAt: output.createdAt,
        updatedAt: output.updatedAt,
    });

    return invoice;
  }
  async find(id: string): Promise<Invoice> {
    let invoiceModel;
    try{
        invoiceModel = await InvoiceModel.findOne({
            where: {
                id,
            },
            include: [{ model: InvoiceItemModel }],
            rejectOnEmpty: true,
        })
    }
    catch (error){
        throw new Error("Invoice not found")
    }

    const invoiceItems: InvoiceItems[] = [];
    invoiceModel.items.map(item => {
        const invoiceItem = new InvoiceItems({id: new Id(item.id), name: item.name, price: item.price});
        invoiceItems.push(invoiceItem);
    });

    const address = new Address(
        invoiceModel.street,
        invoiceModel.number,
        invoiceModel.complement,
        invoiceModel.city,
        invoiceModel.state,
        invoiceModel.zipCode,
    );

    const invoice = new Invoice({
        id: new Id(invoiceModel.id),
        name: invoiceModel.name,
        document: invoiceModel.document,
        address: address,
        items: invoiceItems,
    });

    return invoice;
  }
}

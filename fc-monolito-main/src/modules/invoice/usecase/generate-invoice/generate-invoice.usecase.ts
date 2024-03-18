import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice_items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository : InvoiceGateway;

    constructor(invoiceRepository : InvoiceGateway) {
        this._invoiceRepository  = invoiceRepository;
    }

    async execute( input: GenerateInvoiceUseCaseInputDto ) : Promise<GenerateInvoiceUseCaseOutputDto> {

        const address = new Address(
            input.street, 
            input.number, 
            input.complement, 
            input.city, 
            input.state, 
            input.zipCode);

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: address,
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                });
            }),
        }); 

        const output = await this._invoiceRepository.generate(invoice)

        return {
            id: output.id.id,
            name: output.name,
            document: output.document,
            street: output.address.street,
            number: output.address.number,
            complement: output.address.complement,
            city: output.address.city,
            state: output.address.state,
            zipCode: output.address.zipCode,
            items: output.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                };
            }),
            total: output.totalValue(),
        }
    }
}
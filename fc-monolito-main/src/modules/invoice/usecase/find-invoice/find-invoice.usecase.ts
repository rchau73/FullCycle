import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository : InvoiceGateway;

    constructor(invoiceRepository : InvoiceGateway) {
        this._invoiceRepository  = invoiceRepository;
    }

    async execute( input: FindInvoiceUseCaseInputDto ) : Promise<FindInvoiceUseCaseOutputDto> {

        const output = await this._invoiceRepository.find(input.id);

        return {
            id: output.id.id,
            name: output.name,
            document: output.document,
            address: {
                street: output.address.street,
                number: output.address.number,
                complement: output.address.complement,
                city: output.address.city,
                state: output.address.state,
                zipCode: output.address.zipCode,
            },
            items: output.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                };
            }),
            total: output.totalValue(),
            createdAt: output.createdAt,
        }
    }
}
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
                street: output.street,
                number: output.number,
                complement: output.complement,
                city: output.city,
                state: output.state,
                zipCode: output.zipCode,
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
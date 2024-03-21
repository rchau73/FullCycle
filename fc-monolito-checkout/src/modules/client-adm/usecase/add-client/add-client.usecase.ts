import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";

export default class AddClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(_ClientRepository: ClientGateway) {
    this._clientRepository = _ClientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      email: input.email,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };

    const client = new Client(props);
    this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      document: client.document,
      email: client.email,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}

import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase {
  constructor(private readonly repository: ClientGateway) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.repository.find(input.id);

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

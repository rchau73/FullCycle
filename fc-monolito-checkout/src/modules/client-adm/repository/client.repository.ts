import Id from "../../@shared/domain/value-object/id.value-object";
import ProductGateway from "../../product-adm/gateway/product.gateway";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
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
    });
  }
  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({
      where: { id },
    });

    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }

    return new Client({
      id: new Id(id),
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
    });
  }
}

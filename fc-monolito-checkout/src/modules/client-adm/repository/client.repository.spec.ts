import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      document: "0000",
      email: "x@x.com",
      street: "Address 1",
      number: "200",
      complement: "",
      city: "Chicago",
      state: "Michigan",
      zipCode: "0000",
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: client.id.id },
    });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.street).toBe(client.street);
  });

  it("should find a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      document: "0000",
      email: "x@x.com",
      street: "Address 1",
      number: "200",
      complement: "",
      city: "Chicago",
      state: "Michigan",
      zipCode: "0000",
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const result = await repository.find("1");

    expect(result).toBeDefined();
    expect(result.id.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.street).toBe(client.street);
  });
});

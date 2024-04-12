import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client usecase unit test", () => {
  it("should add a Client", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      id: "1",
      name: "Client 1",
      document: "0000",
      email: "x@x.com",
      street: "Address 1",
      number: "200",
      complement: "",
      city: "Chicago",
      state: "Michigan",
      zipCode: "0000",
    };

    const result = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.street).toBe(input.street);
  });
});
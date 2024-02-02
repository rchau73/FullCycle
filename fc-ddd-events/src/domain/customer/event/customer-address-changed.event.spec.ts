import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerFactory from "../factory/customer.factory";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import WhenCustomerAddressIsChangedHandler from "./handler/When-customer-address-is-changed.handler";
import Address from "../value-object/address";

describe("Customer Address Change events tests", () => {

    it("should notify all event handlers when a address is changed", () => {
        const eventDispatcher = new EventDispatcher();

        // Registra o handler
        const eventHandler = new WhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        // Cria um Cliente e o seu evento de criação
        let address = new Address("Street", 1, "13330-250", "São Paulo");
        const customer = CustomerFactory.createWithAddress("Joao e Maria", address);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);

        address = new Address("Rua Miro", 200, "09820-135", "São Paulo");
        customer.changeAddress(address);
        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

        // Quando o notify for executado os dois handlers devem ser chamados
        eventDispatcher.notify(customerAddressChangedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
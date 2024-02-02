import EventDispatcher from "../../@shared/event/event-dispatcher";
import FirstEventWhenCustomerIsCreatedHandler from "./handler/First-event-when-customer-is-created.handler";
import SecondEventWhenCustomerIsCreatedHandler from "./handler/Second-event-when-customer-is-created.handler";
import CustomerFactory from "../factory/customer.factory";
import CustomerCreatedEvent from "./customer-created.event";

describe("Customer Created events tests", () => {

    it("should notify all event handlers when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();

        // Registra o Primeiro handler
        const eventHandler1 = new FirstEventWhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        // Registra o Segundo handler
        const eventHandler2 = new SecondEventWhenCustomerIsCreatedHandler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        // Cria um Cliente e o seu evento de criação
        const customer = CustomerFactory.create("Roberto Chau");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        // Quando o notify for executado os dois handlers devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

});
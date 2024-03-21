import Entity from "../../@shared/entity/entity.abstract";
import Address from "../value-object/address";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity {
  private _name: string = "";
  private _address: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      this.notification.addError({
        message: "Address is mandatory to activate a customer",
        context: "customer",
      });
    }
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

}

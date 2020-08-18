/**
 * Interface for User Business Logic */


interface ISendInBlueBusiness<T> {
    new(...args: any) : T;
}
export = ISendInBlueBusiness;
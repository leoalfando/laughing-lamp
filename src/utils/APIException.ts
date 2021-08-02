
export default class APIException extends Error {
  constructor(message) {
    super(message);
    this.name = "Exception Error";
  }
}

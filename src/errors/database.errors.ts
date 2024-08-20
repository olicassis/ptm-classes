export class ResourceNotCreatedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotCreatedError'
  }
}

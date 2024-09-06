export class ResourceNotCreatedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotCreatedError'
  }
}

export class ResourceNotUpdatedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotUpdatedError'
  }
}

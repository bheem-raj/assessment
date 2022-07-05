export class Constant {
    //PORT
    static readonly PORT: string|number = 3000

    //secret key for token encryption.
    static readonly secret_key: string = 'secret_key_jwt_token'
    static readonly jwt_key: string = 'secrets'

    //mongodb.
    static readonly MONGO_URI: string = 'mongodb://localhost'
    static readonly MONGO_PORT: number = 27017
    static readonly DB_NAME: string = "assessment"

    //pagination
    static readonly DEFAULT_PAGE_SIZE: number = 10
    static readonly DEFAULT_PAGE_NUMBER: number = 1

    static readonly limit: number = 1
    static readonly startIndex: number = 0
}
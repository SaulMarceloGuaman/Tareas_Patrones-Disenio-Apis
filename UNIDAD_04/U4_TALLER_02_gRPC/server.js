import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

const PROTO_FILE = './proto/user.proto'

async function main() {
    const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true,
    })

    const userProto = grpc.loadPackageDefinition(packageDefinition)
    const server = new grpc.Server()

    let users = []

    server.addService(userProto.UserService.service, {
        getUsers: (_, callback) => {
            console.log(users);
            callback(null, { Users: users })
        },
        addUser: (call, callback) => {
            const user = call.request
            users.push(user)
            callback(null, user)
        }
    });

    await server.bindAsync(
        '127.0.0.1:3043',
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start()
            console.log('Server RPC on port 3043')
        }
    )
}

main()
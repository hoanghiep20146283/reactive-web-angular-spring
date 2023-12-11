import { IncomingMessage } from "http";
import { ChatMessage, SystemNotice, User, WsMessage, LoginMessage, UserListMessage } from "types";
import { WebSocket } from "ws";

let currId = 1;

export class UserManager {
    private sockets = new Map<WebSocket, User>();
    add(socket: WebSocket, request: IncomingMessage) {
        const fullUrl = new URL(request.headers.host + request.url);
        console.log(`fullUrl: ${fullUrl}`);
        const name = fullUrl.searchParams.get('name');
        const user: User = {
            name,
            id: currId++,
        }

        const systemNotice: SystemNotice = {
            event: 'SystemNotice',
            contents: `${name} has joined the chat`,
        }

        this.sendSystemNotice(systemNotice);

        const loginMessage: LoginMessage = {
            user,
            event: 'login'
        };
        socket.send(JSON.stringify(loginMessage));
        this.sockets.set(socket, user);
        this.sendUserListToAll();
    }

    remove(socket: WebSocket) {
        const name = this.sockets.get(socket).name;

        const systemNotice: SystemNotice = {
            event: 'SystemNotice',
            contents: `${name} has left the chat`,
        }

        this.sendSystemNotice(systemNotice);
        this.sendUserListToAll();
        this.sockets.delete(socket);
    }

    send(socket: WebSocket, message: WsMessage) {
        const data = JSON.stringify(message);
        socket.send(data);
    }

    sendSystemNotice(message: SystemNotice) {
        const data = JSON.stringify(message);
        console.log(`Number of sockets: ${this.sockets.size}`);
        Array.from(this.sockets.keys()).forEach(socket => {
            if (socket.readyState == WebSocket.OPEN) {
                socket.send(data);
            }
        })
    }

    sendAll(message: ChatMessage) {
        const data = JSON.stringify(message);
        console.log(`Number of sockets: ${this.sockets.size}`);
        Array.from(this.sockets.keys()).forEach(socket => {
            if (socket.readyState == WebSocket.OPEN) {
                socket.send(data);
            }
        })
    }

    sendUserListToAll() {
        const userListMessage: UserListMessage = {
            event: 'userList',
            users: Array.from(this.sockets.values())
        }
        Array.from(this.sockets.keys()).forEach(socket => {
            if (socket.readyState == WebSocket.OPEN) {
                socket.send(JSON.stringify(userListMessage));
            }
        })
    }
}
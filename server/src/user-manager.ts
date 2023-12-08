import { IncomingMessage } from "http";
import { ChatMessage, SystemNotice, User, WsMessage } from "types";
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
        this.sockets.set(socket, user);
    }

    remove(socket: WebSocket) {
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
}
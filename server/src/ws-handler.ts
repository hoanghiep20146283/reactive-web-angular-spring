import { Socket } from 'dgram';
import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer, ServerOptions, RawData } from 'ws'
import { UserManager } from './user-manager';
import { ChatMessage, WsMessage } from 'types';

export class WsHandler {
    private wsServer: WebSocketServer;
    private userManager: UserManager;

    initialize(options: ServerOptions) {
        this.userManager = new UserManager();
        this.wsServer = new WebSocketServer(options);
        this.wsServer.on('listening', () => console.log(`Server listening on port: ${options.port}`));
        this.wsServer.on('connection', (socket, request) => this.onSocketConnected(socket, request))
    }

    private onSocketConnected(socket: WebSocket, request: IncomingMessage) {
        console.log('New Websocket connection!');
        this.userManager.add(socket, request);
        socket.on('message', data => this.onSocketMessage(socket, data));
        socket.on('close', (code, reason) => this.onSocketClose(socket, code, reason));
    }

    private onSocketMessage(socket: WebSocket, data: RawData) {
        console.log(`Data: ${data}`);
        const payload: ChatMessage = JSON.parse(`${data}`);
        console.log(`Received: ${JSON.stringify(payload)}`);
        this.userManager.sendAll(payload);
    }

    private onSocketClose(socket: WebSocket, code: number, reason: Buffer) {
        console.log(`Client has disconnected; code=${code}, reason=${reason}`);
        this.userManager.remove(socket);
    }
}
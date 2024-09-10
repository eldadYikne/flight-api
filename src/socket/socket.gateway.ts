import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: 'https://flight-front.onrender.com/#/',
    // origin: 'http://localhost:4200',
    credentials: true,
  },
})
export class SocketGateway {
  private readonly logger = new Logger(SocketGateway.name);
  @WebSocketServer() io: Server;
  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    return {
      event: 'pong',
      data,
    };
  }
  @SubscribeMessage('ping')
  handelUpdateFlights(client: any, data: any) {
    this.logger.log(`Message updateFlights from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    return {
      event: 'pong',
      data,
    };
  }
  emitFlights(flightData: any) {
    this.logger.log('Emitting flight created event');
    this.io.emit('pong', flightData);
  }
}

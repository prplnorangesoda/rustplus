import { EventEmitter } from "node:events";

declare module "@liamcottle/rustplus.js" {
  declare const RustPlus: typeof RustPlusClass;
  export = RustPlus;
  type ValidEvents = {
    connecting: [];
    connected: [];
    message: [data: AppMessage];
  };
  declare class RustPlusClass extends EventEmitter<ValidEvents> {
    /**
     * @param server The ip address or hostname of the Rust Server
     * @param port The port of the Rust Server (app.port in server.cfg)
     * @param playerId SteamId of the Player
     * @param playerToken Player Token from Server Pairing
     * @param useFacepunchProxy True to use secure websocket via Facepunch's proxy, or false to directly connect to Rust Server
     *
     * Events emitted by the RustPlus class instance
     * - connecting: When we are connecting to the Rust Server.
     * - connected: When we are connected to the Rust Server.
     * - message: When an AppMessage has been received from the Rust Server.
     * - request: When an AppRequest has been sent to the Rust Server.
     * - disconnected: When we are disconnected from the Rust Server.
     * - error: When something goes wrong.
     */
    constructor(
      ip: string,
      port: string,
      playerId: string,
      playerToken: string,
      useFacepunchProxy: boolean = false
    );

    /**
     * Send a message to Team Chat
     * @param message the message to send to team chat
     * @param callback
     */
    sendTeamMessage(message: string, callback?: (resp: any) => void);
    /**
     * Disconnect from the Rust Server.
     */
    disconnect(): void;
    /**
     * This sets everything up and then connects to the Rust Server via WebSocket.
     */
    connect(): void;
    /**
     * Check if RustPlus is connected to the server.
     * @returns {boolean}
     */
    isConnected(): boolean;
    /**
     * Send a Request to the Rust Server with an optional callback when a Response is received.
     * @param data this should contain valid data for the AppRequest packet in the rustplus.proto schema file
     * @param callback
     */
    sendRequest(data: any, callback: (response: AppResponse) => any): void;
    /**
     * Send a Request to the Rust Server and return a Promise
     * @param data this should contain valid data for the AppRequest packet defined in the rustplus.proto schema file
     * @param timeoutMilliseconds milliseconds before the promise will be rejected. Defaults to 10 seconds.
     */
    sendRequestAsync(
      data: any,
      timeoutMilliseconds: number = 10000
    ): Promise<AppResponse>;
    /**
     * Get the Map
     */
    getMap(callback: (data: AppMessage) => any): void;

    /**
     * Get the ingame time
     */
    getTime(callback: (data: AppMessage) => any): void;

    /**
     * Get all map markers
     */
    getMapMarkers(callback: (data: AppMessage) => any): void;

    /**
     * Get the server info
     */
    getInfo(callback: (data: AppMessage) => any): void;

    /**
     * Get team info
     */
    getTeamInfo(
      callback: (
        data: AppMessage & { response: AppResponse & { teamInfo: AppTeamInfo } }
      ) => any
    ): void;
  }
}

import { ServerOptions } from "ws"
import { WsHandler } from "./ws-handler";

function main() {
  const options: ServerOptions = {port: 8081};
  const handler = new WsHandler();
  handler.initialize(options);
}

main()
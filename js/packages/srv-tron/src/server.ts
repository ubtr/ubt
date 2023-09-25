import log from "./log";
import { createClients } from "./tronchains";
import { Server, ServerCredentials, setLogger } from "@grpc/grpc-js";
import { adaptService } from "@protobuf-ts/grpc-backend";
import { UbtNetworkServiceImpl } from "./impl/UbtNetworkService";
import { UbtBlockServiceImpl } from "./impl/UbtBlockService";
import { UbtConstructionServiceImpl } from "./impl/UbtConstructionService";
import { UbtNetworkService } from "@ubt/sdk/dist/gen/services/network";
import { UbtBlockService } from "@ubt/sdk/dist/gen/services/block";
import { UbtConstructService } from "@ubt/sdk/dist/gen/services/construct";
import { UbtCurrencyService } from "@ubt/sdk/dist/gen/services/currencies";
import { UbtCurrencyServiceImpl } from "./impl/UbtCurrencyServices";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 50051;

let isString = (value?: any) => typeof value === 'string' || value instanceof String;

function eraseTimestamp(msg?: any) {
  if (msg !== null && msg !== undefined && isString(msg)) {
    const tsEnd = msg.indexOf(' | ') + 3;
    if (tsEnd < msg.length) {
      return msg.substring(tsEnd);
    }
  }
  return msg;
}

function setupGrpcLogging() {
  const grpcLog = log.child({name: "grpc"});
  setLogger({
    debug: (msg?: any, ...args: any[]) => {
      if (grpcLog.isLevelEnabled("debug")) {
        grpcLog.debug(eraseTimestamp(msg), ...args)
      }
    },
    error: (msg?: any, ...args: any[]) => {
      if (grpcLog.isLevelEnabled("error")) {
        grpcLog.error(eraseTimestamp(msg), ...args)
      }
    },
    info: (msg?: any, ...args: any[]) => {
      if (grpcLog.isLevelEnabled("info")) {
        grpcLog.info(eraseTimestamp(msg), ...args)
      }
    }, 
    warn: (msg?: any, ...args: any[]) => {
      if (grpcLog.isLevelEnabled("warn")) {
        grpcLog.warn(eraseTimestamp(msg), ...args)
      }
    },
  });
}

function registerSignalHandler(handler: () => Promise<void>) {
  ['SIGHUP', 'SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      log.info(`Process received a ${signal} signal`);
      await handler();
    });
  });
}

async function main() {
  setupGrpcLogging();

  const tronClients = createClients();

  const server = new Server();
  
  server.addService(...adaptService(UbtNetworkService, new UbtNetworkServiceImpl(tronClients)));
  server.addService(...adaptService(UbtBlockService, new UbtBlockServiceImpl(tronClients)));
  server.addService(...adaptService(UbtConstructService, new UbtConstructionServiceImpl(tronClients)));
  server.addService(...adaptService(UbtCurrencyService, new UbtCurrencyServiceImpl(tronClients)));

  registerSignalHandler(async () => {
    server.tryShutdown((err) => {
      if (err) {
        log.error("Failed to gracefully shutdown: %s", err)
        server.forceShutdown();
        log.warn("Server forcibly stopped");
      } else {
        log.info("Server gracefully stopped");
      }
      process.exit(1);
    })
  });

  server.bindAsync(`${HOST}:${PORT}`, ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err) {
      log.error(`Server startup error: ${err.message}`);
    } else {
      log.info(`Server started on: ${HOST}:${port}`);
      server.start();
    }
  });
}



main();

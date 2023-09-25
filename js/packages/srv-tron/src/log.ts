import logger from "pino";

process.env["GRPC_NODE_TRACE"] = "all";
process.env["GRPC_NODE_VERBOSITY"] = "DEBUG";

export default logger({level: (process.env.LOG_LEVEL || "info").toLowerCase()});

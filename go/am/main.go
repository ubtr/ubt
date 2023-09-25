package main

import (
	"log"
	"log/slog"
	"net"
	"os"
	"strings"
	ubt_api "ubt/sdk/api/gen"

	_ "ubt/sdk/blockchain/tron"

	"github.com/urfave/cli/v2"
	"google.golang.org/grpc"
)

func slogLevelFromString(lvl string) (programLevel slog.Level) {
	switch strings.ToUpper(lvl) {
	case "DEBUG":
		programLevel = slog.LevelDebug
	case "INFO":
		programLevel = slog.LevelInfo
	case "WARN":
		programLevel = slog.LevelWarn
	case "ERROR":
		programLevel = slog.LevelError
	default:
		log.Fatalf("Invalid log level %s", lvl)
	}
	return programLevel
}

func main() {
	app := &cli.App{
		Name:            "ubt-am",
		Usage:           "UBT Account Manager",
		HideHelpCommand: true,
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "log",
				Value: "INFO",
				Usage: "Log level",
			},
			&cli.StringFlag{
				Name:  "listen",
				Value: ":50052",
				Usage: "Host+port to listen",
			},
			&cli.StringFlag{
				Name:  "db",
				Value: "am.db",
				Usage: "Database connection string",
			},
		},
		Action: func(cCtx *cli.Context) error {
			var lvl = slogLevelFromString(cCtx.String("log"))
			h := slog.NewJSONHandler(os.Stderr, &slog.HandlerOptions{Level: lvl})
			slog.SetDefault(slog.New(h))

			lis, err := net.Listen("tcp", cCtx.String("listen"))
			if err != nil {
				log.Fatalf("failed to listen: %v", err)
			}
			tronSrv := initAMServier(cCtx.String("db"))

			s := grpc.NewServer()
			ubt_api.RegisterUbtAccountManagerServer(s, tronSrv)
			log.Printf("server listening at %v", lis.Addr())

			if err := s.Serve(lis); err != nil {
				log.Fatalf("failed to serve: %v", err)
			}
			return nil
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

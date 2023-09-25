package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/ybbus/jsonrpc/v3"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	ubt_api "ubt/sdk/api/gen"
	"ubt/sdk/blockchain/tron"
)

func hex2int(hexStr string) (uint64, error) {
	// remove 0x suffix if found in the input string
	cleaned := strings.Replace(hexStr, "0x", "", -1)

	// base 16 for hexadecimal
	result, err := strconv.ParseUint(cleaned, 16, 64)
	if err != nil {
		return 0, err
	}
	return uint64(result), nil
}

func hex2uint64OrZero(hexStr string) uint64 {
	result, err := hex2int(hexStr)
	if err != nil {
		return 0
	}
	return result
}

type UInt64HexString uint64

func (v UInt64HexString) AsNumber() uint64 {
	return uint64(v)
}

func (v UInt64HexString) MarshalJSON() ([]byte, error) {
	return json.Marshal(fmt.Sprintf("0x%x", v))
}

func (v *UInt64HexString) UnmarshalJSON(data []byte) error {
	var hexStr string
	if err := json.Unmarshal(data, &hexStr); err != nil {
		return err
	}

	log.Printf("UnmarshalJSON: %s", hexStr)

	result, err := hex2int(hexStr)
	if err != nil {
		return err
	}
	*v = UInt64HexString(result)
	return nil
}

type TronServer struct {
	ubt_api.UnimplementedUbtNetworkServiceServer
	rpcClient jsonrpc.RPCClient
}

func (srv *TronServer) GetNetwork(ctx context.Context, netId *ubt_api.NetworkId) (*ubt_api.Network, error) {
	if netId.Type != tron.CODE_STR {
		return nil, status.Errorf(codes.Unimplemented, "method GetNetwork not implemented")
	}
}

type NodeSyncInfo struct {
	StartingBlock UInt64HexString
	CurrentBlock  UInt64HexString
	HighestBlock  UInt64HexString
}

type TronNodeInfo struct {
	Listening bool
	ChainId   string
	Version   string

	SyncInfo NodeSyncInfo

	PeerCount        UInt64HexString
	GenesisBlockHash string
}

func (srv *TronServer) Test(ctx context.Context) {
	var nodeInfo = TronNodeInfo{}

	srv.rpcClient.CallFor(ctx, &nodeInfo.Version, "web3_clientVersion")

	srv.rpcClient.CallFor(ctx, &nodeInfo.Listening, "net_listening")

	srv.rpcClient.CallFor(ctx, &nodeInfo.SyncInfo, "eth_syncing")

	srv.rpcClient.CallFor(ctx, &(nodeInfo.ChainId), "eth_chainId")

	srv.rpcClient.CallFor(ctx, &nodeInfo.PeerCount, "net_peerCount")

	srv.rpcClient.CallFor(ctx, &nodeInfo.GenesisBlockHash, "net_version")

	var nodeInfoJson, _ = json.Marshal(nodeInfo)

	log.Printf("Node info: %s", nodeInfoJson)
}

func (srv *TronServer) Test2(ctx context.Context) {
	var nodeInfo = TronNodeInfo{}

	srv.rpcClient.CallFor(ctx, &nodeInfo.Version, "web3_clientVersion")

	srv.rpcClient.CallFor(ctx, &nodeInfo.Listening, "net_listening")

	srv.rpcClient.CallFor(ctx, &nodeInfo.SyncInfo, "eth_syncing")

	srv.rpcClient.CallFor(ctx, &(nodeInfo.ChainId), "eth_chainId")

	srv.rpcClient.CallFor(ctx, &nodeInfo.PeerCount, "net_peerCount")

	srv.rpcClient.CallFor(ctx, &nodeInfo.GenesisBlockHash, "net_version")

	var nodeInfoJson, _ = json.Marshal(nodeInfo)

	log.Printf("Node info: %s", nodeInfoJson)
}

func initTronServer() *TronServer {
	rpcClient := jsonrpc.NewClient("https://trx.getblock.io/7c26de7f-4679-4edc-9881-2b34e74bd566/testnet/fullnode/jsonrpc")
	var srv = TronServer{rpcClient: rpcClient}
	return &srv
}

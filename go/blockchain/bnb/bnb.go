package bnb

import (
	"github.com/ubtr/ubt/go/blockchain"
	"github.com/ubtr/ubt/go/blockchain/eth"
)

const CODE_STR = "BNB"
const CODE_NUM = 714

var Instance blockchain.Blockchain

func init() {
	Instance = blockchain.Blockchain(eth.Instance)
	Instance.Type = CODE_STR
	Instance.TypeNum = CODE_NUM

	blockchain.Blockchains[CODE_STR] = Instance
}

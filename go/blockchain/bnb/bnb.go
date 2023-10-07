package bnb

import (
	"github.com/ubtools/ubt/go/blockchain"
	"github.com/ubtools/ubt/go/blockchain/eth"
)

const CODE_STR = "BNB"
const CODE_NUM = 714

var Instance = blockchain.Blockchain{
	Type:             CODE_STR,
	TypeNum:          CODE_NUM,
	KeyGenerator:     eth.Instance.KeyGenerator,
	AddressValidator: eth.Instance.AddressValidator,
	Signer:           eth.Instance.Signer,
	Verifier:         eth.Instance.Verifier,
}

func init() {
	blockchain.Blockchains[CODE_STR] = Instance
}

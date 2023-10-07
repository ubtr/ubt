package eth

import (
	"crypto/ecdsa"
	"crypto/rand"
	"io"

	b "github.com/ubtools/ubt/go/blockchain"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

const CODE_STR = "ETH"
const CODE_NUM = 60

func AddressFromPublicKey(publicKey []byte) common.Address {
	address := common.BytesToAddress(crypto.Keccak256(publicKey[1:])[12:])
	return address
}

// generate random key pair
func RandomKey(rnd io.Reader) (*b.KeyPair, error) {
	if rnd == nil {
		rnd = rand.Reader
	}
	k, err := ecdsa.GenerateKey(crypto.S256(), rnd)
	if err != nil {
		return nil, err
	}
	pubKBytes := crypto.FromECDSAPub(&k.PublicKey)
	return &b.KeyPair{
		Address:    AddressFromPublicKey(pubKBytes).String(),
		PrivateKey: crypto.FromECDSA(k),
		PublicKey:  pubKBytes,
	}, nil
}

func SignData(data []byte, pk []byte) ([]byte, error) {
	parsedPk, err := crypto.ToECDSA(pk)
	if err != nil {
		return nil, err
	}
	return crypto.Sign(data, parsedPk)
}

func VerifyData(data []byte, sig []byte, pk []byte) bool {
	return crypto.VerifySignature(pk, data, sig[:64])
}

var Instance = b.Blockchain{
	Type:             CODE_STR,
	TypeNum:          CODE_NUM,
	KeyGenerator:     RandomKey,
	AddressValidator: common.IsHexAddress,
	Signer:           SignData,
	Verifier:         VerifyData,
}

func init() {
	b.Blockchains[CODE_STR] = Instance
}

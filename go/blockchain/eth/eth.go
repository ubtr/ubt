package eth

import (
	"crypto/ecdsa"
	"crypto/rand"
	"errors"
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

func RecoverAddress(publicKey []byte, privateKey []byte) (address string, err error) {
	if publicKey == nil {
		if privateKey == nil {
			return "", errors.New("publicKey and privateKey cannot both be nil")
		}
		publicKey, err = PublicKeyFromPrivateKey(privateKey)
		if err != nil {
			return
		}
	}
	return AddressFromPublicKey(publicKey).String(), nil
}

func PublicKeyFromPrivateKey(privateKey []byte) ([]byte, error) {
	parsedPk, err := crypto.ToECDSA(privateKey)
	if err != nil {
		return nil, err
	}

	return crypto.FromECDSAPub(&parsedPk.PublicKey), nil
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
	Type:            CODE_STR,
	TypeNum:         CODE_NUM,
	GenerateAccount: RandomKey,
	ValidateAddress: common.IsHexAddress,
	RecoverAddress:  RecoverAddress,
	Sign:            SignData,
	Verify:          VerifyData,
}

func init() {
	b.Blockchains[CODE_STR] = Instance
}

package tron

import (
	"crypto/ecdsa"
	"crypto/sha256"
	"io"
	"log/slog"

	b "github.com/ubtools/ubt/go/blockchain"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/shengdoushi/base58"
)

const CODE_STR = "TRX"
const CODE_NUM = 195
const TronBytePrefix = byte(0x41)

type Address []byte

func (a Address) String() string {
	h256h0 := sha256.New()
	h256h0.Write(a)
	h0 := h256h0.Sum(nil)

	h256h1 := sha256.New()
	h256h1.Write(h0)
	h1 := h256h1.Sum(nil)

	inputCheck := a
	inputCheck = append(inputCheck, h1[:4]...)

	return base58.Encode(inputCheck, base58.BitcoinAlphabet)
}

func AddressFromPublicKey(publicKey ecdsa.PublicKey) Address {
	address := crypto.PubkeyToAddress(publicKey)

	addressTron := make([]byte, 0)
	addressTron = append(addressTron, TronBytePrefix)
	addressTron = append(addressTron, address.Bytes()...)
	return addressTron
}

func RandomKey(rand io.Reader) (*b.KeyPair, error) {
	k, err := crypto.GenerateKey()
	if err != nil {
		return nil, err
	}
	k.Public()
	return &b.KeyPair{
		Address:    AddressFromPublicKey(k.PublicKey).String(),
		PrivateKey: crypto.FromECDSA(k),
		PublicKey:  crypto.FromECDSAPub(&k.PublicKey),
	}, nil
}

func SignData(data []byte, pk []byte) ([]byte, error) {
	parsedPk, err := crypto.ToECDSA(pk)
	if err != nil {
		return nil, err
	}
	return crypto.Sign(data, parsedPk)
}

func init() {
	slog.Debug("Init tron")
	b.Blockchains[CODE_STR] = b.Blockchain{
		Type:         CODE_STR,
		TypeNum:      CODE_NUM,
		KeyGenerator: RandomKey,
		Signer:       SignData,
	}
}

package blockchain

import "io"

type Signer func(data []byte, pk []byte) ([]byte, error)
type Verifier func([]byte, []byte, []byte) bool
type KeyGenerator func(rand io.Reader) (*KeyPair, error)
type AddressValidator func(string) bool

type KeyPair struct {
	Address    string
	PublicKey  []byte
	PrivateKey []byte
}

func (k KeyPair) String() string {
	return k.Address
}

var Blockchains map[string]Blockchain = make(map[string]Blockchain)

func GetBlockchain(t string) *Blockchain {
	if b, found := Blockchains[t]; !found {
		return nil
	} else {
		return &b
	}
}

type Blockchain struct {
	Type             string
	TypeNum          uint
	Signer           Signer
	Verifier         Verifier
	KeyGenerator     KeyGenerator
	AddressValidator AddressValidator
}

func (b *Blockchain) String() string {
	return b.Type
}

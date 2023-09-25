package blockchain

import "io"

type Signer func(data []byte, pk []byte) ([]byte, error)
type KeyGenerator func(rand io.Reader) (*KeyPair, error)

//type Signer interface {
//}

type KeyPair struct {
	Address    string
	PublicKey  []byte
	PrivateKey []byte
}

func (k KeyPair) String() string {
	return k.Address
}

type BlockchainManager interface {
	GetSigner(string) Signer
	GetKeyGenerator(string) KeyGenerator
}

type BlockchainManagerRegistry struct {
	Signers       map[string]Signer
	KeyGenerators map[string]KeyGenerator
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
	Type         string
	TypeNum      uint
	Signer       Signer
	KeyGenerator KeyGenerator
}

func (b *Blockchain) String() string {
	return b.Type
}

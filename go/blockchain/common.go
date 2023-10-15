package blockchain

import "io"

type Signer func(data []byte, privateKey []byte) ([]byte, error)
type Verifier func(data []byte, signature []byte, publicKey []byte) bool
type KeyGenerator func(rand io.Reader) (*KeyPair, error)
type AddressValidator func(addr string) bool
type AddressFromKeys func(publicKey []byte, privateKey []byte) (string, error)

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
	Type            string
	TypeNum         uint
	Sign            Signer
	Verify          Verifier
	GenerateAccount KeyGenerator
	ValidateAddress AddressValidator
	RecoverAddress  AddressFromKeys
}

func (b *Blockchain) String() string {
	return b.Type
}

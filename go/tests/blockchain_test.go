package tests

import (
	"testing"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ubtools/ubt/go/blockchain"
	_ "github.com/ubtools/ubt/go/blockchain/bnb"
	_ "github.com/ubtools/ubt/go/blockchain/eth"
	_ "github.com/ubtools/ubt/go/blockchain/trx"
)

var staticRandom = &staticRandomReader{}

type staticRandomReader struct{}

func (r *staticRandomReader) Read(p []byte) (n int, err error) {
	for i := range p {
		p[i] = 0x01
	}
	return len(p), nil
}

var testBlockchainAddresses = map[string]string{
	"ETH": "0x1a642f0E3c3aF545E7AcBD38b07251B3990914F1",
	"BNB": "0x1a642f0E3c3aF545E7AcBD38b07251B3990914F1",
	"TRX": "TCNkawTmcQgYSU8nP8cHswT1QPjharxJr7",
}

func runTestAddressFromPublicKey(b blockchain.Blockchain, t *testing.T) {
	k, err := b.KeyGenerator(staticRandom)
	if err != nil {
		t.Errorf("expected no error, got %s", err)
	}

	if b.AddressValidator(k.Address) != true {
		t.Errorf("expected address to be valid, got invalid")
	}
	if k.Address != testBlockchainAddresses[b.Type] {
		t.Errorf("expected address of %s, got %s", testBlockchainAddresses[b.Type], k.Address)
	}

}

func TestBlockchainsRegistered(t *testing.T) {
	if len(blockchain.Blockchains) != 3 {
		t.Errorf("expected 3 blockchains, got %d", len(blockchain.Blockchains))
	}
}

func TestKeyGeneration(t *testing.T) {
	for _, b := range blockchain.Blockchains {
		t.Run(b.Type, func(t *testing.T) {
			runTestAddressFromPublicKey(b, t)
		})
	}
}

func runTestSignVerify(b blockchain.Blockchain, t *testing.T) {
	k, err := b.KeyGenerator(staticRandom)
	if err != nil {
		t.Errorf("expected no error, got %s", err)
	}

	data := []byte("hello world")
	dataHash := crypto.Keccak256Hash(data).Bytes()
	sig, err := b.Signer(dataHash, k.PrivateKey)
	if err != nil {
		t.Errorf("expected no error, got %s", err)
	}

	if len(sig) != 65 {
		t.Errorf("expected signature length of 65, got %d", len(sig))
	}

	ok := b.Verifier(dataHash, sig, k.PublicKey)
	if !ok {
		t.Errorf("expected signature to be valid, got invalid")
	}
}

func TestSignVerify(t *testing.T) {
	for _, b := range blockchain.Blockchains {
		t.Run(b.Type, func(t *testing.T) {
			runTestSignVerify(b, t)
		})
	}
}

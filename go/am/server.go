package main

import (
	"context"
	"crypto/rand"
	"errors"
	ubt_api "ubt/sdk/api/gen"

	"ubt/sdk/blockchain"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

type Account struct {
	Name        *string `gorm:"index"`
	NetworkType string
	Address     string `gorm:"primaryKey"`
	PK          []byte
}

func initAMServier(dsn string) *AMServer {
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Account{})

	var srv = AMServer{db: db}
	return &srv
}

type AMServer struct {
	ubt_api.UnimplementedUbtAccountManagerServer
	db *gorm.DB
}

func (s *AMServer) CreateAccount(ctx context.Context, req *ubt_api.CreateAccountRequest) (*ubt_api.CreateAccountResponse, error) {
	bc := blockchain.GetBlockchain(req.NetworkType)
	if bc == nil {
		return nil, errors.New("NO SUCH NETWORK")
	}
	kp, err := bc.KeyGenerator(rand.Reader)
	if err != nil {
		return nil, err
	}
	s.db.Save(&Account{
		Name:        &req.Name,
		NetworkType: req.NetworkType,
		PK:          kp.PrivateKey,
		Address:     kp.Address,
	})
	return &ubt_api.CreateAccountResponse{
		Address: kp.Address,
	}, nil
}

func (s *AMServer) HasAccount(ctx context.Context, req *ubt_api.HasAccountRequest) (*ubt_api.HasAccountResponse, error) {
	var exist bool
	if req.Name != "" {
		res := s.db.Where("name = ?", req.Name).First(&Account{})
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			exist = false
		} else if res.Error != nil {
			return nil, res.Error
		}
	} else {
		res := s.db.First(&Account{}, req.Address)

		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			exist = false
		} else if res.Error != nil {
			return nil, res.Error
		}
	}

	return &ubt_api.HasAccountResponse{
		Exists: exist,
	}, nil
}

func (s *AMServer) ListAccounts(context.Context, *ubt_api.ListAccountsRequest) (*ubt_api.ListAccountsResponse, error) {
	var accounts []Account
	res := s.db.Find(&accounts)
	if res.Error != nil {
		return nil, res.Error
	}

	var r []*ubt_api.ListAccountsResponse_Account
	for _, a := range accounts {
		r = append(r, &ubt_api.ListAccountsResponse_Account{Name: *a.Name, Address: a.Address})
	}

	return &ubt_api.ListAccountsResponse{
		Accounts: r,
	}, nil
}

func (s *AMServer) SignPayload(ctx context.Context, req *ubt_api.SignPayloadRequest) (*ubt_api.SignPayloadResponse, error) {
	bc := blockchain.GetBlockchain(req.NetworkType)
	if bc == nil {
		return nil, errors.New("NO SUCH NETWORK")
	}
	var account Account

	if req.Name != "" {
		res := s.db.Where("name = ?", req.Name).First(&account)
		if res.Error != nil {
			return nil, res.Error
		}
	} else {
		res := s.db.First(&account, req.Address)
		if res.Error != nil {
			return nil, res.Error
		}
	}

	signature, err := bc.Signer(req.Data, account.PK)

	return &ubt_api.SignPayloadResponse{Signature: signature}, err
}

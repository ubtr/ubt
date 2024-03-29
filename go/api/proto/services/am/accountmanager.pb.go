// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        (unknown)
// source: services/am/accountmanager.proto

package am

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// Account Manager basically provide a box which stores private keys and allows to sign payloads using them
// Accounts are identified by address and optionally by name
// Name can be formatted as a path to allow for nested namespaces which then can be used to filter accounts
type CreateAccountRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ChainType  string `protobuf:"bytes,1,opt,name=chain_type,json=chainType,proto3" json:"chain_type,omitempty"`
	PrivateKey []byte `protobuf:"bytes,2,opt,name=private_key,json=privateKey,proto3" json:"private_key,omitempty"` // if not specified will be generated randomly based on chain type
	// Optional unique name associated with account.
	// Can be separated by / to make nested namespaces like "bob/eth/invoices/1"
	Name string `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *CreateAccountRequest) Reset() {
	*x = CreateAccountRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateAccountRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateAccountRequest) ProtoMessage() {}

func (x *CreateAccountRequest) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateAccountRequest.ProtoReflect.Descriptor instead.
func (*CreateAccountRequest) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{0}
}

func (x *CreateAccountRequest) GetChainType() string {
	if x != nil {
		return x.ChainType
	}
	return ""
}

func (x *CreateAccountRequest) GetPrivateKey() []byte {
	if x != nil {
		return x.PrivateKey
	}
	return nil
}

func (x *CreateAccountRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type CreateAccountResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Address   string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"` // address of the created account
	Name      string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	PublicKey []byte `protobuf:"bytes,3,opt,name=public_key,json=publicKey,proto3" json:"public_key,omitempty"`
}

func (x *CreateAccountResponse) Reset() {
	*x = CreateAccountResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateAccountResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateAccountResponse) ProtoMessage() {}

func (x *CreateAccountResponse) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateAccountResponse.ProtoReflect.Descriptor instead.
func (*CreateAccountResponse) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{1}
}

func (x *CreateAccountResponse) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

func (x *CreateAccountResponse) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CreateAccountResponse) GetPublicKey() []byte {
	if x != nil {
		return x.PublicKey
	}
	return nil
}

type SignPayloadRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ChainType string `protobuf:"bytes,1,opt,name=chain_type,json=chainType,proto3" json:"chain_type,omitempty"`
	Data      []byte `protobuf:"bytes,2,opt,name=data,proto3" json:"data,omitempty"`       // data to sign
	Address   string `protobuf:"bytes,3,opt,name=address,proto3" json:"address,omitempty"` // address or name must be specified
	Name      string `protobuf:"bytes,4,opt,name=name,proto3" json:"name,omitempty"`       // if specified use it to lookup existing account by name
}

func (x *SignPayloadRequest) Reset() {
	*x = SignPayloadRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SignPayloadRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SignPayloadRequest) ProtoMessage() {}

func (x *SignPayloadRequest) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SignPayloadRequest.ProtoReflect.Descriptor instead.
func (*SignPayloadRequest) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{2}
}

func (x *SignPayloadRequest) GetChainType() string {
	if x != nil {
		return x.ChainType
	}
	return ""
}

func (x *SignPayloadRequest) GetData() []byte {
	if x != nil {
		return x.Data
	}
	return nil
}

func (x *SignPayloadRequest) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

func (x *SignPayloadRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type SignPayloadResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signature []byte `protobuf:"bytes,1,opt,name=signature,proto3" json:"signature,omitempty"`
}

func (x *SignPayloadResponse) Reset() {
	*x = SignPayloadResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SignPayloadResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SignPayloadResponse) ProtoMessage() {}

func (x *SignPayloadResponse) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SignPayloadResponse.ProtoReflect.Descriptor instead.
func (*SignPayloadResponse) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{3}
}

func (x *SignPayloadResponse) GetSignature() []byte {
	if x != nil {
		return x.Signature
	}
	return nil
}

type GetStoredAccountRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Address string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"` // lookup by address; will lookup by address if both address and name are specified
	Name    string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`       // lookup by name
}

func (x *GetStoredAccountRequest) Reset() {
	*x = GetStoredAccountRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetStoredAccountRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetStoredAccountRequest) ProtoMessage() {}

func (x *GetStoredAccountRequest) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetStoredAccountRequest.ProtoReflect.Descriptor instead.
func (*GetStoredAccountRequest) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{4}
}

func (x *GetStoredAccountRequest) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

func (x *GetStoredAccountRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type GetStoredAccountResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Address   string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	Name      string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	PublicKey []byte `protobuf:"bytes,3,opt,name=public_key,json=publicKey,proto3" json:"public_key,omitempty"` // may be empty depending on implementation and chain type
}

func (x *GetStoredAccountResponse) Reset() {
	*x = GetStoredAccountResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetStoredAccountResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetStoredAccountResponse) ProtoMessage() {}

func (x *GetStoredAccountResponse) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetStoredAccountResponse.ProtoReflect.Descriptor instead.
func (*GetStoredAccountResponse) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{5}
}

func (x *GetStoredAccountResponse) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

func (x *GetStoredAccountResponse) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *GetStoredAccountResponse) GetPublicKey() []byte {
	if x != nil {
		return x.PublicKey
	}
	return nil
}

type ListAccountsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NameFilter string `protobuf:"bytes,1,opt,name=name_filter,json=nameFilter,proto3" json:"name_filter,omitempty"` // starts with filter. e.g "bob" will return "bob/eth/1" and "bob/eth/2"
}

func (x *ListAccountsRequest) Reset() {
	*x = ListAccountsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListAccountsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListAccountsRequest) ProtoMessage() {}

func (x *ListAccountsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListAccountsRequest.ProtoReflect.Descriptor instead.
func (*ListAccountsRequest) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{6}
}

func (x *ListAccountsRequest) GetNameFilter() string {
	if x != nil {
		return x.NameFilter
	}
	return ""
}

type ListAccountsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Accounts []*ListAccountsResponse_Account `protobuf:"bytes,1,rep,name=accounts,proto3" json:"accounts,omitempty"`
}

func (x *ListAccountsResponse) Reset() {
	*x = ListAccountsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListAccountsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListAccountsResponse) ProtoMessage() {}

func (x *ListAccountsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListAccountsResponse.ProtoReflect.Descriptor instead.
func (*ListAccountsResponse) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{7}
}

func (x *ListAccountsResponse) GetAccounts() []*ListAccountsResponse_Account {
	if x != nil {
		return x.Accounts
	}
	return nil
}

type ListAccountsResponse_Account struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Address string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	Name    string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *ListAccountsResponse_Account) Reset() {
	*x = ListAccountsResponse_Account{}
	if protoimpl.UnsafeEnabled {
		mi := &file_services_am_accountmanager_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListAccountsResponse_Account) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListAccountsResponse_Account) ProtoMessage() {}

func (x *ListAccountsResponse_Account) ProtoReflect() protoreflect.Message {
	mi := &file_services_am_accountmanager_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListAccountsResponse_Account.ProtoReflect.Descriptor instead.
func (*ListAccountsResponse_Account) Descriptor() ([]byte, []int) {
	return file_services_am_accountmanager_proto_rawDescGZIP(), []int{7, 0}
}

func (x *ListAccountsResponse_Account) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

func (x *ListAccountsResponse_Account) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

var File_services_am_accountmanager_proto protoreflect.FileDescriptor

var file_services_am_accountmanager_proto_rawDesc = []byte{
	0x0a, 0x20, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2f, 0x61, 0x6d, 0x2f, 0x61, 0x63,
	0x63, 0x6f, 0x75, 0x6e, 0x74, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x0f, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73,
	0x2e, 0x61, 0x6d, 0x22, 0x6a, 0x0a, 0x14, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x41, 0x63, 0x63,
	0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x63,
	0x68, 0x61, 0x69, 0x6e, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x09, 0x63, 0x68, 0x61, 0x69, 0x6e, 0x54, 0x79, 0x70, 0x65, 0x12, 0x1f, 0x0a, 0x0b, 0x70, 0x72,
	0x69, 0x76, 0x61, 0x74, 0x65, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52,
	0x0a, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x4b, 0x65, 0x79, 0x12, 0x12, 0x0a, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22,
	0x64, 0x0a, 0x15, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x64, 0x64, 0x72,
	0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61, 0x64, 0x64, 0x72, 0x65,
	0x73, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1d, 0x0a, 0x0a, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63,
	0x5f, 0x6b, 0x65, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x09, 0x70, 0x75, 0x62, 0x6c,
	0x69, 0x63, 0x4b, 0x65, 0x79, 0x22, 0x75, 0x0a, 0x12, 0x53, 0x69, 0x67, 0x6e, 0x50, 0x61, 0x79,
	0x6c, 0x6f, 0x61, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x63,
	0x68, 0x61, 0x69, 0x6e, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x09, 0x63, 0x68, 0x61, 0x69, 0x6e, 0x54, 0x79, 0x70, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61,
	0x74, 0x61, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x12, 0x18,
	0x0a, 0x07, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x07, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x33, 0x0a, 0x13,
	0x53, 0x69, 0x67, 0x6e, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x09, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72,
	0x65, 0x22, 0x47, 0x0a, 0x17, 0x47, 0x65, 0x74, 0x53, 0x74, 0x6f, 0x72, 0x65, 0x64, 0x41, 0x63,
	0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07,
	0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61,
	0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x67, 0x0a, 0x18, 0x47, 0x65,
	0x74, 0x53, 0x74, 0x6f, 0x72, 0x65, 0x64, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73,
	0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73,
	0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1d, 0x0a, 0x0a, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x5f, 0x6b,
	0x65, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x09, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63,
	0x4b, 0x65, 0x79, 0x22, 0x36, 0x0a, 0x13, 0x4c, 0x69, 0x73, 0x74, 0x41, 0x63, 0x63, 0x6f, 0x75,
	0x6e, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1f, 0x0a, 0x0b, 0x6e, 0x61,
	0x6d, 0x65, 0x5f, 0x66, 0x69, 0x6c, 0x74, 0x65, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0a, 0x6e, 0x61, 0x6d, 0x65, 0x46, 0x69, 0x6c, 0x74, 0x65, 0x72, 0x22, 0x9a, 0x01, 0x0a, 0x14,
	0x4c, 0x69, 0x73, 0x74, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x49, 0x0a, 0x08, 0x61, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x73,
	0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x2d, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x41, 0x63, 0x63,
	0x6f, 0x75, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x41, 0x63,
	0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x08, 0x61, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x73, 0x1a,
	0x37, 0x0a, 0x07, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x64,
	0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x61, 0x64, 0x64,
	0x72, 0x65, 0x73, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x32, 0x8d, 0x03, 0x0a, 0x11, 0x55, 0x62, 0x74,
	0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x12, 0x5e,
	0x0a, 0x0d, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12,
	0x25, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61,
	0x6d, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x26, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x41,
	0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x61,
	0x0a, 0x0a, 0x47, 0x65, 0x74, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x28, 0x2e, 0x75,
	0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x47,
	0x65, 0x74, 0x53, 0x74, 0x6f, 0x72, 0x65, 0x64, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x29, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x74, 0x6f, 0x72,
	0x65, 0x64, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x5b, 0x0a, 0x0c, 0x4c, 0x69, 0x73, 0x74, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74,
	0x73, 0x12, 0x24, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73,
	0x2e, 0x61, 0x6d, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x73,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x25, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x41, 0x63,
	0x63, 0x6f, 0x75, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x58,
	0x0a, 0x0b, 0x53, 0x69, 0x67, 0x6e, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x12, 0x23, 0x2e,
	0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d, 0x2e,
	0x53, 0x69, 0x67, 0x6e, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x24, 0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x73, 0x2e, 0x61, 0x6d, 0x2e, 0x53, 0x69, 0x67, 0x6e, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0xb6, 0x01, 0x0a, 0x13, 0x63, 0x6f, 0x6d,
	0x2e, 0x75, 0x62, 0x74, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x6d,
	0x42, 0x13, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x2c, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x75, 0x62, 0x74, 0x72, 0x2f, 0x75, 0x62, 0x74, 0x2f, 0x67, 0x6f, 0x2f,
	0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x73, 0x2f, 0x61, 0x6d, 0xa2, 0x02, 0x03, 0x55, 0x53, 0x41, 0xaa, 0x02, 0x0f, 0x55, 0x62,
	0x74, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x41, 0x6d, 0xca, 0x02, 0x0f,
	0x55, 0x62, 0x74, 0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41, 0x6d, 0xe2,
	0x02, 0x1b, 0x55, 0x62, 0x74, 0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41,
	0x6d, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x11,
	0x55, 0x62, 0x74, 0x3a, 0x3a, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x3a, 0x3a, 0x41,
	0x6d, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_services_am_accountmanager_proto_rawDescOnce sync.Once
	file_services_am_accountmanager_proto_rawDescData = file_services_am_accountmanager_proto_rawDesc
)

func file_services_am_accountmanager_proto_rawDescGZIP() []byte {
	file_services_am_accountmanager_proto_rawDescOnce.Do(func() {
		file_services_am_accountmanager_proto_rawDescData = protoimpl.X.CompressGZIP(file_services_am_accountmanager_proto_rawDescData)
	})
	return file_services_am_accountmanager_proto_rawDescData
}

var file_services_am_accountmanager_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_services_am_accountmanager_proto_goTypes = []interface{}{
	(*CreateAccountRequest)(nil),         // 0: ubt.services.am.CreateAccountRequest
	(*CreateAccountResponse)(nil),        // 1: ubt.services.am.CreateAccountResponse
	(*SignPayloadRequest)(nil),           // 2: ubt.services.am.SignPayloadRequest
	(*SignPayloadResponse)(nil),          // 3: ubt.services.am.SignPayloadResponse
	(*GetStoredAccountRequest)(nil),      // 4: ubt.services.am.GetStoredAccountRequest
	(*GetStoredAccountResponse)(nil),     // 5: ubt.services.am.GetStoredAccountResponse
	(*ListAccountsRequest)(nil),          // 6: ubt.services.am.ListAccountsRequest
	(*ListAccountsResponse)(nil),         // 7: ubt.services.am.ListAccountsResponse
	(*ListAccountsResponse_Account)(nil), // 8: ubt.services.am.ListAccountsResponse.Account
}
var file_services_am_accountmanager_proto_depIdxs = []int32{
	8, // 0: ubt.services.am.ListAccountsResponse.accounts:type_name -> ubt.services.am.ListAccountsResponse.Account
	0, // 1: ubt.services.am.UbtAccountManager.CreateAccount:input_type -> ubt.services.am.CreateAccountRequest
	4, // 2: ubt.services.am.UbtAccountManager.GetAccount:input_type -> ubt.services.am.GetStoredAccountRequest
	6, // 3: ubt.services.am.UbtAccountManager.ListAccounts:input_type -> ubt.services.am.ListAccountsRequest
	2, // 4: ubt.services.am.UbtAccountManager.SignPayload:input_type -> ubt.services.am.SignPayloadRequest
	1, // 5: ubt.services.am.UbtAccountManager.CreateAccount:output_type -> ubt.services.am.CreateAccountResponse
	5, // 6: ubt.services.am.UbtAccountManager.GetAccount:output_type -> ubt.services.am.GetStoredAccountResponse
	7, // 7: ubt.services.am.UbtAccountManager.ListAccounts:output_type -> ubt.services.am.ListAccountsResponse
	3, // 8: ubt.services.am.UbtAccountManager.SignPayload:output_type -> ubt.services.am.SignPayloadResponse
	5, // [5:9] is the sub-list for method output_type
	1, // [1:5] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_services_am_accountmanager_proto_init() }
func file_services_am_accountmanager_proto_init() {
	if File_services_am_accountmanager_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_services_am_accountmanager_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateAccountRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateAccountResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SignPayloadRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SignPayloadResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetStoredAccountRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetStoredAccountResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListAccountsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListAccountsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_services_am_accountmanager_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListAccountsResponse_Account); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_services_am_accountmanager_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_services_am_accountmanager_proto_goTypes,
		DependencyIndexes: file_services_am_accountmanager_proto_depIdxs,
		MessageInfos:      file_services_am_accountmanager_proto_msgTypes,
	}.Build()
	File_services_am_accountmanager_proto = out.File
	file_services_am_accountmanager_proto_rawDesc = nil
	file_services_am_accountmanager_proto_goTypes = nil
	file_services_am_accountmanager_proto_depIdxs = nil
}

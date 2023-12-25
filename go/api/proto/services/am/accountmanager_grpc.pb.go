// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: services/am/accountmanager.proto

package am

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	UbtAccountManager_CreateAccount_FullMethodName = "/ubt.services.am.UbtAccountManager/CreateAccount"
	UbtAccountManager_GetAccount_FullMethodName    = "/ubt.services.am.UbtAccountManager/GetAccount"
	UbtAccountManager_ListAccounts_FullMethodName  = "/ubt.services.am.UbtAccountManager/ListAccounts"
	UbtAccountManager_SignPayload_FullMethodName   = "/ubt.services.am.UbtAccountManager/SignPayload"
)

// UbtAccountManagerClient is the client API for UbtAccountManager service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UbtAccountManagerClient interface {
	// Create new account
	CreateAccount(ctx context.Context, in *CreateAccountRequest, opts ...grpc.CallOption) (*CreateAccountResponse, error)
	GetAccount(ctx context.Context, in *GetAccountRequest, opts ...grpc.CallOption) (*GetAccountResponse, error)
	ListAccounts(ctx context.Context, in *ListAccountsRequest, opts ...grpc.CallOption) (*ListAccountsResponse, error)
	SignPayload(ctx context.Context, in *SignPayloadRequest, opts ...grpc.CallOption) (*SignPayloadResponse, error)
}

type ubtAccountManagerClient struct {
	cc grpc.ClientConnInterface
}

func NewUbtAccountManagerClient(cc grpc.ClientConnInterface) UbtAccountManagerClient {
	return &ubtAccountManagerClient{cc}
}

func (c *ubtAccountManagerClient) CreateAccount(ctx context.Context, in *CreateAccountRequest, opts ...grpc.CallOption) (*CreateAccountResponse, error) {
	out := new(CreateAccountResponse)
	err := c.cc.Invoke(ctx, UbtAccountManager_CreateAccount_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ubtAccountManagerClient) GetAccount(ctx context.Context, in *GetAccountRequest, opts ...grpc.CallOption) (*GetAccountResponse, error) {
	out := new(GetAccountResponse)
	err := c.cc.Invoke(ctx, UbtAccountManager_GetAccount_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ubtAccountManagerClient) ListAccounts(ctx context.Context, in *ListAccountsRequest, opts ...grpc.CallOption) (*ListAccountsResponse, error) {
	out := new(ListAccountsResponse)
	err := c.cc.Invoke(ctx, UbtAccountManager_ListAccounts_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ubtAccountManagerClient) SignPayload(ctx context.Context, in *SignPayloadRequest, opts ...grpc.CallOption) (*SignPayloadResponse, error) {
	out := new(SignPayloadResponse)
	err := c.cc.Invoke(ctx, UbtAccountManager_SignPayload_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UbtAccountManagerServer is the server API for UbtAccountManager service.
// All implementations must embed UnimplementedUbtAccountManagerServer
// for forward compatibility
type UbtAccountManagerServer interface {
	// Create new account
	CreateAccount(context.Context, *CreateAccountRequest) (*CreateAccountResponse, error)
	GetAccount(context.Context, *GetAccountRequest) (*GetAccountResponse, error)
	ListAccounts(context.Context, *ListAccountsRequest) (*ListAccountsResponse, error)
	SignPayload(context.Context, *SignPayloadRequest) (*SignPayloadResponse, error)
	mustEmbedUnimplementedUbtAccountManagerServer()
}

// UnimplementedUbtAccountManagerServer must be embedded to have forward compatible implementations.
type UnimplementedUbtAccountManagerServer struct {
}

func (UnimplementedUbtAccountManagerServer) CreateAccount(context.Context, *CreateAccountRequest) (*CreateAccountResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateAccount not implemented")
}
func (UnimplementedUbtAccountManagerServer) GetAccount(context.Context, *GetAccountRequest) (*GetAccountResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAccount not implemented")
}
func (UnimplementedUbtAccountManagerServer) ListAccounts(context.Context, *ListAccountsRequest) (*ListAccountsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListAccounts not implemented")
}
func (UnimplementedUbtAccountManagerServer) SignPayload(context.Context, *SignPayloadRequest) (*SignPayloadResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignPayload not implemented")
}
func (UnimplementedUbtAccountManagerServer) mustEmbedUnimplementedUbtAccountManagerServer() {}

// UnsafeUbtAccountManagerServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UbtAccountManagerServer will
// result in compilation errors.
type UnsafeUbtAccountManagerServer interface {
	mustEmbedUnimplementedUbtAccountManagerServer()
}

func RegisterUbtAccountManagerServer(s grpc.ServiceRegistrar, srv UbtAccountManagerServer) {
	s.RegisterService(&UbtAccountManager_ServiceDesc, srv)
}

func _UbtAccountManager_CreateAccount_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateAccountRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtAccountManagerServer).CreateAccount(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtAccountManager_CreateAccount_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtAccountManagerServer).CreateAccount(ctx, req.(*CreateAccountRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UbtAccountManager_GetAccount_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetAccountRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtAccountManagerServer).GetAccount(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtAccountManager_GetAccount_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtAccountManagerServer).GetAccount(ctx, req.(*GetAccountRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UbtAccountManager_ListAccounts_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListAccountsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtAccountManagerServer).ListAccounts(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtAccountManager_ListAccounts_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtAccountManagerServer).ListAccounts(ctx, req.(*ListAccountsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UbtAccountManager_SignPayload_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignPayloadRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtAccountManagerServer).SignPayload(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtAccountManager_SignPayload_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtAccountManagerServer).SignPayload(ctx, req.(*SignPayloadRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// UbtAccountManager_ServiceDesc is the grpc.ServiceDesc for UbtAccountManager service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var UbtAccountManager_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "ubt.services.am.UbtAccountManager",
	HandlerType: (*UbtAccountManagerServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateAccount",
			Handler:    _UbtAccountManager_CreateAccount_Handler,
		},
		{
			MethodName: "GetAccount",
			Handler:    _UbtAccountManager_GetAccount_Handler,
		},
		{
			MethodName: "ListAccounts",
			Handler:    _UbtAccountManager_ListAccounts_Handler,
		},
		{
			MethodName: "SignPayload",
			Handler:    _UbtAccountManager_SignPayload_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services/am/accountmanager.proto",
}

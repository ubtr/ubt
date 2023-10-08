// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: services/block.proto

package services

import (
	context "context"
	proto "github.com/ubtools/ubt/go/api/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	UbtBlockService_GetBlock_FullMethodName      = "/ubt.services.UbtBlockService/getBlock"
	UbtBlockService_ListBlocks_FullMethodName    = "/ubt.services.UbtBlockService/listBlocks"
	UbtBlockService_GetAccount_FullMethodName    = "/ubt.services.UbtBlockService/getAccount"
	UbtBlockService_DeriveAccount_FullMethodName = "/ubt.services.UbtBlockService/deriveAccount"
)

// UbtBlockServiceClient is the client API for UbtBlockService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UbtBlockServiceClient interface {
	// Fetch block by ID
	GetBlock(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*proto.Block, error)
	// List blocks in range
	ListBlocks(ctx context.Context, in *ListBlocksRequest, opts ...grpc.CallOption) (UbtBlockService_ListBlocksClient, error)
	// get account
	GetAccount(ctx context.Context, in *GetAccountRequest, opts ...grpc.CallOption) (*proto.Account, error)
	// return account/address by public key
	DeriveAccount(ctx context.Context, in *DeriveAccountRequest, opts ...grpc.CallOption) (*proto.Account, error)
}

type ubtBlockServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewUbtBlockServiceClient(cc grpc.ClientConnInterface) UbtBlockServiceClient {
	return &ubtBlockServiceClient{cc}
}

func (c *ubtBlockServiceClient) GetBlock(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*proto.Block, error) {
	out := new(proto.Block)
	err := c.cc.Invoke(ctx, UbtBlockService_GetBlock_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ubtBlockServiceClient) ListBlocks(ctx context.Context, in *ListBlocksRequest, opts ...grpc.CallOption) (UbtBlockService_ListBlocksClient, error) {
	stream, err := c.cc.NewStream(ctx, &UbtBlockService_ServiceDesc.Streams[0], UbtBlockService_ListBlocks_FullMethodName, opts...)
	if err != nil {
		return nil, err
	}
	x := &ubtBlockServiceListBlocksClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type UbtBlockService_ListBlocksClient interface {
	Recv() (*proto.Block, error)
	grpc.ClientStream
}

type ubtBlockServiceListBlocksClient struct {
	grpc.ClientStream
}

func (x *ubtBlockServiceListBlocksClient) Recv() (*proto.Block, error) {
	m := new(proto.Block)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *ubtBlockServiceClient) GetAccount(ctx context.Context, in *GetAccountRequest, opts ...grpc.CallOption) (*proto.Account, error) {
	out := new(proto.Account)
	err := c.cc.Invoke(ctx, UbtBlockService_GetAccount_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ubtBlockServiceClient) DeriveAccount(ctx context.Context, in *DeriveAccountRequest, opts ...grpc.CallOption) (*proto.Account, error) {
	out := new(proto.Account)
	err := c.cc.Invoke(ctx, UbtBlockService_DeriveAccount_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UbtBlockServiceServer is the server API for UbtBlockService service.
// All implementations must embed UnimplementedUbtBlockServiceServer
// for forward compatibility
type UbtBlockServiceServer interface {
	// Fetch block by ID
	GetBlock(context.Context, *BlockRequest) (*proto.Block, error)
	// List blocks in range
	ListBlocks(*ListBlocksRequest, UbtBlockService_ListBlocksServer) error
	// get account
	GetAccount(context.Context, *GetAccountRequest) (*proto.Account, error)
	// return account/address by public key
	DeriveAccount(context.Context, *DeriveAccountRequest) (*proto.Account, error)
	mustEmbedUnimplementedUbtBlockServiceServer()
}

// UnimplementedUbtBlockServiceServer must be embedded to have forward compatible implementations.
type UnimplementedUbtBlockServiceServer struct {
}

func (UnimplementedUbtBlockServiceServer) GetBlock(context.Context, *BlockRequest) (*proto.Block, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetBlock not implemented")
}
func (UnimplementedUbtBlockServiceServer) ListBlocks(*ListBlocksRequest, UbtBlockService_ListBlocksServer) error {
	return status.Errorf(codes.Unimplemented, "method ListBlocks not implemented")
}
func (UnimplementedUbtBlockServiceServer) GetAccount(context.Context, *GetAccountRequest) (*proto.Account, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAccount not implemented")
}
func (UnimplementedUbtBlockServiceServer) DeriveAccount(context.Context, *DeriveAccountRequest) (*proto.Account, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeriveAccount not implemented")
}
func (UnimplementedUbtBlockServiceServer) mustEmbedUnimplementedUbtBlockServiceServer() {}

// UnsafeUbtBlockServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UbtBlockServiceServer will
// result in compilation errors.
type UnsafeUbtBlockServiceServer interface {
	mustEmbedUnimplementedUbtBlockServiceServer()
}

func RegisterUbtBlockServiceServer(s grpc.ServiceRegistrar, srv UbtBlockServiceServer) {
	s.RegisterService(&UbtBlockService_ServiceDesc, srv)
}

func _UbtBlockService_GetBlock_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BlockRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtBlockServiceServer).GetBlock(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtBlockService_GetBlock_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtBlockServiceServer).GetBlock(ctx, req.(*BlockRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UbtBlockService_ListBlocks_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(ListBlocksRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(UbtBlockServiceServer).ListBlocks(m, &ubtBlockServiceListBlocksServer{stream})
}

type UbtBlockService_ListBlocksServer interface {
	Send(*proto.Block) error
	grpc.ServerStream
}

type ubtBlockServiceListBlocksServer struct {
	grpc.ServerStream
}

func (x *ubtBlockServiceListBlocksServer) Send(m *proto.Block) error {
	return x.ServerStream.SendMsg(m)
}

func _UbtBlockService_GetAccount_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetAccountRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtBlockServiceServer).GetAccount(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtBlockService_GetAccount_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtBlockServiceServer).GetAccount(ctx, req.(*GetAccountRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UbtBlockService_DeriveAccount_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeriveAccountRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UbtBlockServiceServer).DeriveAccount(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UbtBlockService_DeriveAccount_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UbtBlockServiceServer).DeriveAccount(ctx, req.(*DeriveAccountRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// UbtBlockService_ServiceDesc is the grpc.ServiceDesc for UbtBlockService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var UbtBlockService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "ubt.services.UbtBlockService",
	HandlerType: (*UbtBlockServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "getBlock",
			Handler:    _UbtBlockService_GetBlock_Handler,
		},
		{
			MethodName: "getAccount",
			Handler:    _UbtBlockService_GetAccount_Handler,
		},
		{
			MethodName: "deriveAccount",
			Handler:    _UbtBlockService_DeriveAccount_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "listBlocks",
			Handler:       _UbtBlockService_ListBlocks_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "services/block.proto",
}
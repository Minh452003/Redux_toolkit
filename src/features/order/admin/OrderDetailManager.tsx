import { useGetBillByIdQuery, useRemoveBillMutation, useUpdateStatusMutation } from "@/api/billApi"
import { useNavigate, useParams } from "react-router-dom"
import { AiFillDelete, AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import { Button, Form, Image, Input, Select } from 'antd';
import { useGetStatusQuery } from "@/api/statusApi";
import { useEffect } from "react";

const OrderDetailManager = () => {
    const { id }: any = useParams()
    const { data: orderDetail } = useGetBillByIdQuery(id);
    const [removeBill] = useRemoveBillMutation();
    const navigate = useNavigate();
    const [updateStatus, { isLoading: isAddingStatus }] = useUpdateStatusMutation();
    const { data: status } = useGetStatusQuery()

    useEffect(() => {
        if (orderDetail) {
            setFields();
        }
    }, [orderDetail]);
    const [form] = Form.useForm();
    const setFields = () => {
        form.setFieldsValue({
            id: orderDetail?._id,
            statusId: orderDetail?.status?._id,
        });
    };
    const onFinish = async (values: any) => {
        try {
            updateStatus(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Status has been added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin/orders");
            })

        } catch (error) {
            console.error('Error uploading image:', error);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const deleteBill = (id: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xóa sản phẩm
                removeBill(id).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    navigate('/admin/orders');
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire(
                    'Cancelled',
                    'Your bill is safe :)',
                    'error'
                )
            }
        })
    }
    return (
        <div>
            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: '10px' }}>
                                <div className="card-header px-4 py-5">
                                    <h5 className="text-muted mb-0">Order details <span style={{ color: '#a8729a' }}></span>!</h5>
                                </div>
                                <div className="card-body p-4">

                                    <Form
                                        form={form}
                                        layout="vertical"
                                        name="basic"
                                        labelCol={{ span: 8 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item label="" name="id" style={{ display: 'none' }}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            className="small text-primary fw-bold mb-0 float-left"
                                            name="statusId"
                                            rules={[{ required: true, message: 'Danh mục không được để trống!' }]}
                                        >
                                            <Select className="input1">
                                                {status?.map((stt: any) => {
                                                    return (
                                                        <Select.Option key={stt?._id} value={stt._id} className="text-primary">
                                                            {stt.name}
                                                        </Select.Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item >
                                            <Button className="btnComent" htmlType="submit">
                                                {isAddingStatus ? (
                                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                                ) : (
                                                    <AiOutlinePlus />
                                                )}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    {orderDetail?.products.map((order: any) => (
                                        <div className="card shadow-0 border mb-4" key={order._id}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <Image
                                                            src={order?.image}
                                                            className="img-fluid" alt="Phone"
                                                        />
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0">{order?.name}</p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">${order?.price}</p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Qty: {order?.quantity}</p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Total: ${order?.price * order?.quantity}</p>
                                                    </div>
                                                </div>
                                                <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-md-2">
                                                        <p className="text-muted mb-0 small">Track Order</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-0">Order Details</p>
                                    </div>

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="text-muted mb-0">Phone Number : {orderDetail?.phone}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Invoice Date : {orderDetail?.createdAt}</p>
                                        <Button danger onClick={() => deleteBill(orderDetail?._id)}><AiFillDelete /></Button>
                                    </div>
                                </div>
                                <div className="card-footer border-0 px-4 py-5"
                                    style={{ backgroundColor: ' #a8729a', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                                        paid: <span className="h2 mb-0 ms-2">${orderDetail?.total}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default OrderDetailManager
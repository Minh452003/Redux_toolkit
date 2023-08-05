import { useGetUserByIdQuery } from '@/api/authApi';
import { useGetCartsQuery } from '@/api/cartApi';
import { getDecodedAccessToken } from '@/api/decoder';
import { Form, Input, Skeleton } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
const CartDetailPage = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const { data: carts, isLoading: cartsLoading, error: cartsError } = useGetCartsQuery(id);
    const { data: user, isSuccess: userSuccess } = useGetUserByIdQuery(id);

    const productsInCart = carts?.data.products;

    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            id: user?._id,
            name: user?.name,
            address: user?.address,
        });
    };

    useEffect(() => {
        if (userSuccess) {
            setFields();
        }
    }, [userSuccess]);

    const onFinish = async (values: any) => {
        // Xử lý khi hoàn thành form
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (cartsLoading) return <Skeleton />;

    if (cartsError) {
        if ("data" in cartsError && 'status' in cartsError) {
            return (
                <div>
                    {cartsError.status}-{JSON.stringify(cartsError.data)}
                </div>
            );
        }
    }
    if (!id) {
        return (
            <div className="cartdetail">
                <div className="bg-light p-2">
                    <p className="tb">Bạn chưa đăng nhập.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="cartdetail">
            <div className="container mt-4">
                <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

                <div className="py-5 text-center">
                    <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
                    <h2>PAY</h2>
                    <p className="lead">Please review the Customer Information and Cart Details before proceeding with the Order.</p>
                </div>

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">CART</span>
                            <span className="badge badge-secondary badge-pill"></span>
                        </h4>
                        <ul className="list-group mb-3">
                            {productsInCart?.map((cart: any) => (
                                <li className="list-group-item d-flex justify-content-between lh-condensed"
                                >
                                    <div>
                                        <img src={cart.image} className="ima" width="50" />
                                        <h6 className="my-0">{cart.name}</h6>
                                        <small className="text-muted">${cart.price * cart.quantity}.00</small>
                                    </div>
                                    <span className="text-muted">{cart?.quantity}</span>
                                </li>
                            ))}

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>${carts.data.total + 15}.00</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Customer Information</h4>
                        <Form
                            form={form}
                            layout="vertical"
                            name="basic"
                            labelCol={{ span: 8 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off" >
                            <Form.Item label="" name="id" style={{ display: 'none' }}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="User Name"
                                name="name"
                                className='label1'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input className='input1' />
                            </Form.Item>
                            <Form.Item
                                label="User Address"
                                name="address"
                                className='label1'
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input className='input1' />
                            </Form.Item>
                            <Form.Item
                                label="User Phone"
                                name="phone"
                                className='label1'
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input className='input1' />
                            </Form.Item>
                            <Form.Item
                                label="Notes"
                                name="notes"
                                className="label1"
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <TextArea rows={4} className="input1" />
                            </Form.Item>
                        </Form>
                        <br />
                        <h4 className="mb-3">Hình thức thanh toán</h4>

                        <div className="d-flex flex-column"> <label className="radio"> <input type="radio" name="gender"
                            value="MALE" checked />
                            <div className="d-flex justify-content-between"> <span>THANH TOÁN TẠI NHÀ</span></div>
                        </label> <label className="radio"> <input type="radio" name="gender" value="FEMALE" />
                                <div className="d-flex justify-content-between"> <span>THANH TOÁN ONLINE</span>
                                </div>
                            </label> </div>
                        <br />
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDetailPage
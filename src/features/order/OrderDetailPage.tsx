import { useGetBillByIdQuery, useRemoveBillMutation } from "@/api/billApi"
import { Button, Image } from "antd";
import { useParams } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const OrderDetailPage = () => {
    const { id }: any = useParams()
    const { data: orderDetail } = useGetBillByIdQuery(id);
    const [removeBill] = useRemoveBillMutation();
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
                                    <h5 className="text-muted mb-0">Thanks for your Order <span style={{ color: '#a8729a' }}></span>!</h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }} >Receipt</p>
                                        <p className="small text-primary fw-bold mb-0">{orderDetail?.status?.name}</p>
                                    </div>
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
            </section>
        </div>
    )
}

export default OrderDetailPage
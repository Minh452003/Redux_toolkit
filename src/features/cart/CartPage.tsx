import { useGetCartsQuery, useRemoveProductInCartMutation } from "@/api/cartApi";
import { getDecodedAccessToken } from "@/api/decoder";
import { Button, Skeleton } from "antd"
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai"
import { Link } from "react-router-dom"
import Swal from "sweetalert2";


const CartPage = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;

    const { data: carts, isLoading, error } = useGetCartsQuery(id);
    const [removeProductInCart, resultRemove] = useRemoveProductInCartMutation();
    if (isLoading) return <Skeleton />;
    if (error) {
        if ("data" in error && 'status' in error) {
            <div>
                {error.status}-{JSON.stringify(error.data)}
            </div>
        }
    }
    const productsInCart = carts?.data.products;
    const deleteCart = (productId: any) => {
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
                removeProductInCart({ userId: id, productId: productId }).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your cart has been deleted.',
                        'success'
                    )
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire(
                    'Cancelled',
                    'Your cart is safe :)',
                    'error'
                )
            }
        })
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
    // Check if there are products in the cart
    if (!productsInCart || productsInCart.length === 0) {
        return (
            <div className="cartdetail">
                <div className="bg-light p-2">
                    <p className="tb">Giỏ hàng trống.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart container-fluid">
            <div className="px-4 px-lg-0">
                <div className="container text-white py-5 text-center">
                    <h1 className="display-4">SHOPPING CART</h1>
                </div>

                <div className="pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase text-center">Quantity</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase text-center">Remove</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productsInCart.map((cart: any) => (
                                                <tr key={cart?._id}>
                                                    <th scope="row" className="border-0">
                                                        <div className="p-2 ">
                                                            <img src={cart.image} className="img-fluid rounded shadow-sm spc1" />
                                                            <div className="ml-3 d-inline-block align-middle">
                                                                <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{cart?.name}</a></h5>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <td className="border-0 align-middle"><strong>${cart?.price}</strong></td>
                                                    <td className="border-0 align-middle text-center"><strong>{cart?.quantity}</strong></td>
                                                    <td className="border-0 align-middle text-center">
                                                        <Button className="text-dark" danger onClick={() => deleteCart(cart?.productId)}>
                                                            {resultRemove.isLoading ? (
                                                                <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                                                            ) : (
                                                                <AiFillDelete />
                                                            )}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="row py-5 p-4 bg-white rounded shadow-sm">
                            <div className="col-lg-6">
                                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                                <div className="p-4">
                                    <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                    <div className="input-group mb-4 border rounded-pill p-2">
                                        <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
                                        <div className="input-group-append border-0">
                                            <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill">Apply coupon</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                                <div className="p-4">
                                    <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                                    <textarea name="" cols={30} rows={2} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                                <div className="p-4">
                                    <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${carts.data.total}.00</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$5.00</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                            <h5 className="font-weight-bold">
                                                ${carts.data.total + 15}.00
                                            </h5>
                                        </li>
                                    </ul>
                                    <Link to={''} className="btn btn-primary rounded-pill py-2 btn-bloc mr-5">Back to shopping</Link>
                                    <Link to={'/carts/pay'} className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
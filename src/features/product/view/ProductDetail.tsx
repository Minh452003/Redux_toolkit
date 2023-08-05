import { useAddCartMutation } from "@/api/cartApi";
import { getDecodedAccessToken } from "@/api/decoder";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/api/productApi";
import CommentPage from "@/features/comment/view/CommentPage";
import { IProduct } from "@/interfaces/products";
import { Button, Image, Skeleton } from "antd";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCartPlus, BsStar, BsStarHalf } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ProductDetail = () => {
    const { id: paramsId }: any = useParams();
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const { data: product, isLoading, error } = useGetProductByIdQuery(paramsId);
    const { data: products } = useGetProductsQuery();
    const [addCart, resultAdd] = useAddCartMutation();
    const similarProducts = products?.docs.filter((siproduct: IProduct) => siproduct.categoryId === product?.categoryId)
    const [quantity, setQuantity] = useState(1); // Sử dụng useState để quản lý số lượng
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); // Cập nhật số lượng
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1); // Cập nhật số lượng
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt
        });
    };
    // 
    const userId: string = id
    console.log(userId);

    const handleAddToCart = () => {
        if (product && userId) {
            const data: any = {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image?.url,
                quantity: quantity,
            };

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
                    addCart({ data, userId }).then(() => {
                        Swal.fire(
                            'Cart has been added successfully',
                            'Your product has been added.',
                            'success'
                        )
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Hiển thị thông báo hủy xóa sản phẩm
                    Swal.fire(
                        'Cancelled',
                        'Your product is safe :)',
                        'error'
                    )
                }
            })
        }
    };
    if (isLoading) return <Skeleton />;
    if (error) {
        if ("data" in error && 'status' in error) {
            <div>
                {error.status}-{JSON.stringify(error.data)}
            </div>
        }
    }


    return (
        <div className="container3">
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <Image
                                    style={{ width: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={product?.image?.url}
                                />
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    Deluxe FPT Food <br />
                                    <hr />
                                    {product?.name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <span className="star"><BsStar /></span>
                                        <span className="star"><BsStar /></span>
                                        <span className="star"><BsStar /></span>
                                        <span className="star"><BsStar /></span>
                                        <span className="star"><BsStarHalf /></span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">${product?.price}</span>
                                    <span className="text-muted"> /Each portion</span>
                                </div>

                                <p>
                                    {product?.description}
                                </p>

                                <div className="row">
                                    <dt className="col-3">Remaining:</dt>
                                    <dd className="col-9">{product?.reQuantity}</dd>
                                    <dt className="col-3">CreatedAt</dt>
                                    <dd className="col-9">{product?.createdAt}</dd>
                                </div>

                                <hr />

                                <div className="row mb-4">
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group il">
                                            <div id="updateQuantity">
                                                <span className="qua" onClick={decreaseQuantity}>-</span>
                                                <input
                                                    className="quainput"
                                                    value={quantity}
                                                    type="text"
                                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                />
                                                <span className="qua" onClick={increaseQuantity} >+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="buttonCart" onClick={handleAddToCart}>
                                    {resultAdd.isLoading ? (
                                        <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                                    ) : (
                                        <BsCartPlus className="bt" />
                                    )}
                                </Button>
                            </div>
                        </main>
                    </div>
                </div >
            </section >
            <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">
                        <div className="col-lg-8 mb-4">
                            <div className="border rounded-2 px-3 py-2 bg-white">
                                {/*  */}
                                <CommentPage productId={product?._id} />
                                {/*  */}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="px-0 border rounded-2 shadow-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Similar items</h5>
                                        {similarProducts?.map((product) => (
                                            <div className="d-flex mb-3" key={product._id}>
                                                <a href="#" className="me-3">
                                                    <Image className="img-md img-thumbnail" style={{ width: '96px', height: '96px', objectFit: 'cover' }} src={product?.image?.url} />
                                                </a>
                                                <div className="info">
                                                    <Link className="nav-link mb-1" to={`/products/${product._id}`} onClick={scrollToTop}>
                                                        {product?.name}
                                                    </Link>
                                                    <strong className="text-dark">{product?.price}</strong>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default ProductDetail
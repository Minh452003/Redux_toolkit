
import { useGetProductsQuery } from '@/api/productApi';
import './product.css'
import { useGetCategoriesQuery } from '@/api/categoryApi';
import { IProduct } from '@/interfaces/products';
import { Button, Pagination, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const ProductView = () => {
    const { data: products, error, isLoading: isLoadingFetching } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();
    // 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // 
    if (isLoadingFetching) return <Skeleton />;
    if (error) {
        if ("data" in error && "status" in error) {
            return (
                <div>
                    {error.status} - {JSON.stringify(error.data)}
                </div>
            );
        }
    }
    return (
        <div>
            {/* <!-- Start Menu --> */}
            <div className="menu-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Special Menu</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="special-menu text-center">
                                <div className="button-group filter-button-group">
                                    <button className="active" data-filter="*">All</button>
                                    {categories?.map((category) => (
                                        <button key={category._id}>
                                            <Link to={`/category/${category._id}`}> {category.name}</Link>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row special-list">
                        {products?.docs?.slice(startIndex, endIndex).map((product: IProduct) => (
                            <div className="col-lg-3 col-md-4 special-grid drinks" key={product._id}>
                                <div className="gallery-single fix">
                                    <img src={product.image?.url} className="img-fluid img1" alt="Image" />
                                    <div className="why-text">
                                        <h4>{product.name}</h4>
                                        <p>{product.description}</p>
                                        <h5>{product.price}</h5>
                                        <Button className='btn1'><Link to={`/products/${product._id}`}>Detail</Link></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className='float-right'
                        current={currentPage}
                        total={products?.docs?.length || 0}
                        pageSize={itemsPerPage}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
            {/* <!-- End Menu --> */}
        </div>
    )
}

export default ProductView
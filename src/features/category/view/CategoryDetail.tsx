import { useGetCategoriesQuery } from "@/api/categoryApi";
import { useGetProductsQuery } from "@/api/productApi";
import { IProduct } from "@/interfaces/products";
import { Button, Pagination, Skeleton } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryDetail = () => {
    const { id: paramsId }: any = useParams();
    const { data: products, error, isLoading: isLoadingFetching } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const handleCategoryClick = (categoryId: any) => {
        setActiveCategory(categoryId);
        setCurrentPage(1); // Reset page when changing category
    };
    const newProducts = products?.docs.filter((item: IProduct) => item.categoryId == paramsId);
    // 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
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
                                    <button data-filter="*">
                                        <Link to={`/`}>ALL</Link>
                                    </button>
                                    {categories?.map((category) => (
                                        <button
                                            className={activeCategory === category._id ? "active" : ""}
                                            onClick={() => handleCategoryClick(category._id)}
                                            key={category._id}>
                                            <Link to={`/category/${category._id}`}> {category.name}</Link>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row special-list">
                        {newProducts?.slice(startIndex, endIndex).map((product: IProduct) => (
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
                        total={newProducts?.length || 0}
                        pageSize={itemsPerPage}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
            {/* <!-- End Menu --> */}
        </div>
    )
}

export default CategoryDetail
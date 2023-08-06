import { IProduct } from "@/interfaces/products";
import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { GrEdit } from 'react-icons/gr'
import { ICategory } from "@/interfaces/category";
import Swal from "sweetalert2";
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/productApi";
import { useGetCategoriesQuery } from "@/api/categoryApi";
import { AiFillDelete } from "react-icons/ai";



const ProductManagerPage = () => {

    const { data: products, error, isLoading: isLoadingFetching } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();
    const [removeProduct] = useRemoveProductMutation();
    const deleteProduct = (id: any) => {
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
                removeProduct(id).then(() => {
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
                    'Your product is safe :)',
                    'error'
                )
            }
        })
    }

    const data = products?.docs?.map((product: IProduct) => {
        const category = categories?.find((category: ICategory) => category._id === product.categoryId);
        return {
            key: product._id,
            name: product.name,
            price: product.price,
            image: <img width={50} src={product.image?.url} alt="" />,
            desc: product.description,
            reQuantity: product.reQuantity,
            categoryId: category ? category.name : ''
        }
    });


    const columns: ColumnsType<any> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Product Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Remaining products',
            dataIndex: 'reQuantity',
            key: 'reQuantity',
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type="primary" style={{ border: '1px solid blue' }}><Link style={{ color: 'white' }} to={`/admin/products/${record.key}/update`}> <GrEdit /></Link></Button>
                    <Button danger onClick={() => deleteProduct(record.key)}><AiFillDelete /></Button>
                </Space>
            ),
        },

    ];



    if (isLoadingFetching) return <Skeleton />;
    if (error) {
        if ("data" in error && "status" in error) {
            return (
                <div>
                    {error.status} - {JSON.stringify(error.data)}
                </div>
            );
        }
    } return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl">PRODUCT MANAGEMENT</h2>
            </header>
            <Button type="primary" className="add1" danger ><Link className="add" to={'/admin/products/add'}></Link></Button>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />
        </div>

    )
}

export default ProductManagerPage
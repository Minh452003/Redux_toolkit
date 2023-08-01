import { getProducts, removeProduct } from "@/api/productApi";
import { IProduct } from "@/interfaces/products";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrEdit } from 'react-icons/gr'
import { getCategories } from "@/api/categoryApi";
import { ICategory } from "@/interfaces/category";
import Swal from "sweetalert2";



const ProductManagerPage = () => {
    const dispatch = useAppDispatch();
    const { products, isLoading, error } = useAppSelector((state: any) => state.products);
    const { categories } = useAppSelector((state: any) => state.categories);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

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
                dispatch(removeProduct(id)).then(() => {
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





    const data = products.map((product: IProduct) => {
        const category = categories.find((category: ICategory) => category._id === product.categoryId);
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
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: ColumnsType<DataType> = [
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



    if (isLoading) return <Skeleton />;
    if (error) return <div>{error}</div>;
    return (
        <div>
            <Button type="primary" className="add1" danger ><Link className="add" to={'/admin/products/add'}></Link></Button>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />
        </div>

    )
}

export default ProductManagerPage
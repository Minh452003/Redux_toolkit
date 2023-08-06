import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { GrEdit } from 'react-icons/gr'
import { ICategory } from "@/interfaces/category";
import Swal from "sweetalert2";
import { useGetCategoriesQuery, useRemoveCategoryMutation } from "@/api/categoryApi";
import { AiFillDelete } from "react-icons/ai";



const CategoryManagerPage = () => {
    const { data: categories, error, isLoading: isLoadingFetching } = useGetCategoriesQuery();
    const [removeCategory] = useRemoveCategoryMutation();

    const deleteCategory = (id: any) => {
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
                removeCategory(id).then(() => {
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
                    'Your category is safe :)',
                    'error'
                )
            }
        })
    }

    const data = categories?.map((category: ICategory) => {
        return {
            key: category._id,
            name: category.name,
        }
    });


    const columns: ColumnsType<any> = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type="primary" style={{ border: '1px solid blue' }}><Link style={{ color: 'white' }} to={`/admin/categories/${record.key}/update`}> <GrEdit /></Link></Button>
                    <Button danger onClick={() => deleteCategory(record.key)}><AiFillDelete /></Button>
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
                <h2 className="font-bold text-2xl">CATEGORY MANAGEMENT</h2>
            </header>
            <Button type="primary" className="add1" danger ><Link className="add" to={'/admin/categories/add'}></Link></Button>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />
        </div>

    )
}

export default CategoryManagerPage
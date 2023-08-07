import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { useGetCommentsQuery, useRemoveCommentMutation } from "@/api/commentApi";
import { IComment } from "@/interfaces/comment";
import { format } from "date-fns";

const CommentManagerPage = () => {
    const { data: commentsAll, error, isLoading: isLoadingFetching } = useGetCommentsQuery();
    const [removeComment] = useRemoveCommentMutation();
    const { comments } = commentsAll || {}; // Add this line to handle undefined commentsAll

    const deleteUser = (id: any) => {
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
                removeComment(id).then(() => {
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

    const data = comments?.map((comment: IComment) => {
        return {
            key: comment._id,
            productId: <span className="text-danger">{comment?.productId?.name}</span>,
            userId: <span className="fw-bold">{comment?.userId?.name}</span>,
            description: comment.description,
            createAt: format(new Date(comment?.createdAt), "HH:mm a dd/MM/yyyy"),
        }
    });


    const columns: ColumnsType<any> = [
        {
            title: 'User Name',
            dataIndex: 'userId',
            key: 'userId',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'User Comment',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Product',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Time',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteUser(record.key)}><AiFillDelete /></Button>
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
    }
    return (
        <div>
            <div>
                <header className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-2xl">CATEGORY MANAGEMENT</h2>
                </header>
                <Button type="primary" className="add1" danger ><Link className="add" to={'/admin/categories/add'}></Link></Button>
                <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />
            </div>
        </div>
    )
}

export default CommentManagerPage
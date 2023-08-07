import { useGetUserByIdQuery } from "@/api/authApi"
import { useAddCommentMutation, useGetCommentsQuery } from "@/api/commentApi"
import { getDecodedAccessToken } from "@/api/decoder"
import { Button, Form, Image, Pagination, Skeleton, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai"
import { format } from "date-fns";
import { useState } from "react"
import { Tooltip } from 'antd';


const CommentPage = ({ productId }: any) => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: user } = useGetUserByIdQuery(id);
    const { data: commentsData, isLoading, error } = useGetCommentsQuery();
    const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
    const comments = commentsData?.comments.filter((comment: any) => comment.productId && comment.productId._id === productId)

    const onFinish = async (values: any) => {
        await addComment({
            productId: productId, // Replace with actual product ID
            description: values.description,
            userId: user?._id, // Use the user ID from the fetched data
        }).unwrap()
            .then(async () => {
                form.resetFields();
                messageApi.open({
                    type: "success",
                    content: "Comment added successfully",
                });
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số bình luận hiển thị trên mỗi trang

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    // Tính toán chỉ số bắt đầu và kết thúc của danh sách bình luận hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
        <div>
            <div className="container">
                <div className="row ">
                    <div className="comment-wrapper">
                        {contextHolder}
                        <div className="panel panel-info">
                            <h5 className="card-title">Comments</h5>
                            <br />
                            <div className="panel-body">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off" >

                                    <Form.Item
                                        name="description"
                                        rules={[{ required: true, message: 'Please input your comment!' }]}
                                    >
                                        <Tooltip title={user ? '' : 'You are not logged in!'}>
                                            <TextArea rows={3} className="input1" disabled={!user} />
                                        </Tooltip>
                                    </Form.Item>
                                    <Form.Item >
                                        <Button className="btnComent" htmlType="submit">
                                            {isAddingComment ? (
                                                <AiOutlineLoading3Quarters className="animate-spin" />
                                            ) : (
                                                <AiOutlinePlus />
                                            )}
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="clearfix"></div>
                                <hr />
                                <ul className="media-list">
                                    {comments?.slice(startIndex, endIndex).map((item: any) => (
                                        <li className="media" key={item._id}>
                                            <a href="#" className="pull-left">
                                                <Image
                                                    src={item.userId.image.url}
                                                    className="img-circle"
                                                />
                                            </a>
                                            <div className="media-body">
                                                <span className="text-muted pull-right">
                                                    <small className="text-muted1">
                                                        {format(new Date(item.createdAt), "HH:mm a dd/MM/yyyy")}
                                                    </small>
                                                </span>
                                                <strong className="text-success">{item?.userId?.name}</strong>
                                                <p>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Pagination
                                    current={currentPage}
                                    total={comments?.length || 0}
                                    pageSize={itemsPerPage}
                                    onChange={handleChangePage}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CommentPage
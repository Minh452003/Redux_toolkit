import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '@/api/categoryApi';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCategoryPage = () => {
    const navigate = useNavigate();
    const { id }: any = useParams();

    const [updateCategory, resultAdd] = useUpdateCategoryMutation();
    const { data: category } = useGetCategoryByIdQuery(id);
    useEffect(() => {
        if (category) {
            setFields();
        }
    }, [category]);

    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            id: category?._id,
            name: category?.name,
        });
    };

    const onFinish = async (values: any) => {
        try {
            updateCategory(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Category has been added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin/categories");
            })

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off" >
                <Form.Item label="" name="id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category Name"
                    name="name"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input className='input1' />
                </Form.Item>
                <Form.Item >
                    <Button style={{ width: "100%", height: 35 }} type="primary" htmlType="submit" className='button1'>
                        {resultAdd.isLoading ? <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : "UPDATE CATEGORY"}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default UpdateCategoryPage
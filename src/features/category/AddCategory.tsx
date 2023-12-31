import { useAddCategoryMutation } from '@/api/categoryApi';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCategory = () => {
    const navigate = useNavigate();
    const [addCategory, resultAdd] = useAddCategoryMutation();

    const onFinish = async (values: any) => {
        try {
            addCategory(values).then(() => {
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
            <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl">ADD CATEGORY</h2>
            </header>
            <Form
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off" >
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
                        </div> : "ADD CATEGORY"}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddCategory
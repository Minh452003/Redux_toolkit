import { useSignUpMutation } from '@/api/authApi';
import './sign.css';
import { Button, Col, Form, Input, Row, Image, Upload, UploadProps, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from '@/store/hook';
import { AiOutlineUpload } from 'react-icons/ai';
import { addImage } from '@/api/uploadApi';
import Swal from 'sweetalert2';
const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signUp] = useSignUpMutation();

    const onFinish = async (values: any) => {
        try {
            // Gọi action addImage để upload ảnh
            const response: any = await dispatch(addImage(values.image.file.originFileObj));
            // Kiểm tra xem việc upload ảnh có thành công hay không
            if (response.meta.requestStatus === 'fulfilled') {
                // Lấy đường dẫn ảnh sau khi upload thành công từ dữ liệu trả về của action
                const imageUrl = response.payload.urls[0];
                console.log('Uploaded image successfully!', imageUrl);
                values.image = imageUrl;
                const data: any = await signUp(values);
                if (data.error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: data.error.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Register has been added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/signin");
                }
            } else {
                console.error('Error uploading image:', response.payload);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const props: UploadProps = {
        name: 'image',
        customRequest: async ({ file }: any) => {
            console.log(file);

        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className='sign'>
            <Row>
                <Col span={12}><Image
                    width={'80%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /></Col>
                <Col span={11}>
                    <Form
                        layout="vertical"
                        name="basic"
                        labelCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            className='label'
                            rules={[{ required: true, message: 'Name cannot be empty!' }]}
                        >
                            <Input className='input' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            className='label'
                            rules={[{ required: true, message: 'Email cannot be empty!' }, { type: 'email', message: 'Incorrect email format' }]}
                        >
                            <Input className='input' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            className='label'
                            rules={[{ required: true, message: 'Password cannot be empty!' }, { min: 6, message: 'Password must be at least 6 characters long' }]}
                        >
                            <Input.Password className='input' />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmpassword"
                            className='label'
                            rules={[{ required: true, message: 'Confirm password cannot be empty' }, { min: 6, message: 'Confirm password must be at least 6 characters long' }]}
                        >
                            <Input.Password className='input' />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            className='label'
                            rules={[{ required: true, message: 'Address cannot be empty' }]}
                        >
                            <Input className='input' />
                        </Form.Item>
                        <Form.Item
                            label="Avatar"
                            name="image"
                            className='label'
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <Upload {...props} fileList={[]}>
                                <Button className='input' icon={<AiOutlineUpload />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item >
                            <br />
                            <Button type="primary" htmlType="submit" className='button'>
                                SIGN UP
                            </Button>
                        </Form.Item>
                        <div className="form-group">
                            <p style={{ textAlign: 'center' }}>Account already exists?<Link to={'/signup'}>Sign in</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>

        </div>
    )
}

export default SignUp
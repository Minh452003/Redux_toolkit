import { signIn } from '@/api/authApi';
import './sign.css';
import { Button, Col, Form, Input, Row, Image } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/store/hook';

const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error } = useAppSelector((state: any) => state.users);

    const onFinish = async (values: any) => {
        const response: any = await dispatch(signIn(values));

        if (response.type == 'auth/signin/fulfilled') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login has been added successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/admin");
        } else if (response.type == 'auth/signin/rejected') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='sign'>
            <Row>
                <Col span={12} >
                    <Image
                        width={'80%'}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Col>
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
                        <Form.Item >
                            <br />
                            <Button type="primary" htmlType="submit" className='button'>
                                SIGN IN
                            </Button>
                        </Form.Item>
                        <div className="form-group">
                            <p style={{ textAlign: 'center' }}>Account does not exist?<Link to={'/signup'}>Sign up</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>

        </div>

    );
};

export default SignIn;

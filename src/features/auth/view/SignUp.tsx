import './sign.css';
import { Button, Col, Form, Input, Row, Image } from 'antd';
import { Link } from "react-router-dom";
const SignUp = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
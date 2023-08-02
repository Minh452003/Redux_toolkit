
import { useGetCategoriesQuery } from '@/api/categoryApi';
import { useAddProductMutation } from '@/api/productApi';
import { addImage } from '@/api/uploadApi';
import { useAppDispatch } from '@/store/hook';
import { Button, Form, Input, Select, Upload, UploadProps, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AiOutlineUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const AddProductPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();
    const [addProduct] = useAddProductMutation();

    const onFinish = async (values: any) => {
        try {
            // Gọi action addImage để upload ảnh
            const response: any = await dispatch(addImage(values.image.file.originFileObj));
            console.log(response);

            // Kiểm tra xem việc upload ảnh có thành công hay không
            if (response.meta.requestStatus === 'fulfilled') {
                // Lấy đường dẫn ảnh sau khi upload thành công từ dữ liệu trả về của action
                const imageUrl = response.payload.urls[0];
                console.log('Uploaded image successfully!', imageUrl);
                values.image = imageUrl;
                addProduct(values).then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product has been added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/admin/products");
                })

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
        <div>
            <Form
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off" >
                <Form.Item
                    label="Product Name"
                    name="name"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                    <Input className='input1' />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input className='input1' />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Upload {...props} fileList={[]}>
                        <Button className='input1' icon={<AiOutlineUpload />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Remaining products"
                    name="reQuantity"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your remaining products!' }]}
                >
                    <Input className='input1' />
                </Form.Item>
                <Form.Item label="Select" className='label1' name="categoryId" rules={[{ required: true, message: 'Danh mục không được để trống!' }]}>
                    <Select className='input1' >
                        {categories?.map((category: any) => {
                            return <Select.Option key={category?._id} value={category._id}>{category.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    className='label1'
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <TextArea rows={4} className='input1' />

                </Form.Item>
                <Form.Item >
                    <Button style={{ width: "100%", height: 35 }} type="primary" htmlType="submit" className='button1'>
                        ADD PRODUCT
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddProductPage
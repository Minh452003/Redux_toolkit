import { useGetCategoriesQuery } from '@/api/categoryApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/productApi';
import { updateImage } from '@/api/uploadApi';
import { useAppDispatch } from '@/store/hook';
import { Button, Form, Image, Input, Select, Upload, UploadProps, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateProductPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id }: any = useParams();

    const [updateProduct, resultUpdate] = useUpdateProductMutation();
    const { data: categories } = useGetCategoriesQuery();
    const { data: product } = useGetProductByIdQuery(id);

    useEffect(() => {
        if (product) {
            setFields();
        }
    }, [product]);

    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            id: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.image ? product.image : {}, // Nếu có ảnh, thêm vào mảng để hiển thị
            reQuantity: product?.reQuantity,
            description: product?.description,
            categoryId: product?.categoryId,
        });
    };

    const onFinish = async (values: any) => {
        try {
            // Kiểm tra xem có ảnh mới được chọn hay không
            if (values.image && values.image?.file?.originFileObj) {
                // Gọi action updateImage để upload ảnh mới
                const response: any = await dispatch(updateImage({
                    publicId: product?.image?.publicId, // Truyền publicId hiện tại của ảnh vào action
                    files: values.image.file.originFileObj,
                } as any));

                // Kiểm tra xem việc upload ảnh có thành công hay không
                if (response.meta.requestStatus === 'fulfilled') {
                    // Lấy đường dẫn ảnh sau khi upload thành công từ dữ liệu trả về của action
                    const imageUrl = response.payload.url;
                    const publicId = response.payload.publicId;
                    console.log('Uploaded image successfully!', imageUrl);

                    // Cập nhật đường dẫn và publicId ảnh mới cho sản phẩm
                    values.image = { url: imageUrl, publicId: publicId };
                } else {
                    console.error('Error uploading image:', response.payload);
                    return;
                }
            } else {
                // Nếu không có ảnh mới được chọn, giữ nguyên giá trị ảnh cũ
                values.image = product?.image;
            }

            // Gọi action updateProduct để cập nhật thông tin sản phẩm
            updateProduct(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product has been updated successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/admin/products');
            });
        } catch (error) {
            console.error('Error updating product:', error);
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
            <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl">UPDATE PRODUCT</h2>
            </header>
            {product?.image && (
                <Image
                    src={product.image.url}
                    alt="Product Image"
                    style={{ width: 150, height: 100, marginBottom: 16 }}
                />
            )}
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="" name="id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Name"
                    name="name"
                    className="label1"
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                    <Input className="input1" />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    className="label1"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input className="input1" />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    className="label1"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Upload {...props} fileList={[]}>
                        <Button className="input1" icon={<AiOutlineUpload />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Remaining products"
                    name="reQuantity"
                    className="label1"
                    rules={[{ required: true, message: 'Please input your remaining products!' }]}
                >
                    <Input className="input1" />
                </Form.Item>
                <Form.Item
                    label="Select"
                    className="label1"
                    name="categoryId"
                    rules={[{ required: true, message: 'Danh mục không được để trống!' }]}
                >
                    <Select className="input1">
                        {categories?.map((category: any) => {
                            return (
                                <Select.Option key={category?._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    className="label1"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <TextArea rows={4} className="input1" />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: '100%', height: 35 }} type="primary" htmlType="submit" className="button1">
                        {resultUpdate.isLoading ? <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : "UPDATE PRODUCT"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProductPage;


import { useGetBillsByUserQuery } from "@/api/billApi";
import { getDecodedAccessToken } from "@/api/decoder";
import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const OrderPage = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const { data: orders, isLoading: loadingSucces } = useGetBillsByUserQuery(id)


    const data = orders?.map((order: any) => {
        const number = order.total;
        const formattedNumber = number.toFixed(2);
        return {
            key: order._id,
            address: order.address,
            phone: order.phone,
            total: <span className="fw-bold">${formattedNumber}</span>,
            status: <span className="text-primary fw-bold">{order.status.name}</span>,
            createAt: format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy"),
            notes: order.notes,
            image: <img width={50} src={order.products[0].image} alt="" />,
        }
    });
    const columns: ColumnsType<any> = [
        {
            title: 'Order Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Order Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Order Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Order Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Order Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Order Time',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Order Note',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button danger style={{ border: '1px solid blue' }}><Link to={`/bill/${record.key}`}> <CgDetailsMore className='text-danger' /></Link></Button>
                </Space>
            ),
        },

    ];
    if (loadingSucces) return <Skeleton />;

    return (
        <div>
            <br />
            <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl">Your order</h2>
            </header>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />

        </div>
    )
}

export default OrderPage
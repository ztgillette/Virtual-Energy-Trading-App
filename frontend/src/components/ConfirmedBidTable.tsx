import React from 'react';
import { Table, type TableColumnProps } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import type { Bid } from './BidForm';


type Props = {
    title: string,
    data: Bid[]
};

const columns: TableColumnProps[] = [
  {
    title: 'Hour',
    dataIndex: 'hour',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'damPrice',
  },
  {
    title: 'RTM Avg Hourly Price',
    dataIndex: 'rtmPrice',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
  },
  
];



export default function BidTable({title, data}: Props) {

  return (

    <div>
        <h2>{title}</h2>
        <Table columns={columns} data={data ?? [] } pagination={false} noDataElement={<h3>No Contracts.</h3>} />
    </div>
    
  )
  
}
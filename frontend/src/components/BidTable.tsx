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
    title: 'Limit Price',
    dataIndex: 'price',
  },
  {
    title: 'Day Ahead Price',
    dataIndex: 'damPrice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  
];



export default function BidTable({title, data}: Props) {

  return (

    <div>
        <h2>{title}</h2>
        <Table columns={columns} data={data ?? []} pagination={false} noDataElement={<h3>No Bids.</h3>}/>
    </div>
    
  )
  
}
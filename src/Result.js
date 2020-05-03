import React from 'react';
import { Table } from 'antd';

class Result extends React.Component {

  dataSource = [
    {
      key: '1',
      rank: '1',
      menu: 'ส้มตำ',
      probability: '32%',
    },
    {
      key: '2',
      rank: '2',
      menu: 'ปลากะพง',
      probability: '22%',
    },
    {
      key: '3',
      rank: '3',
      menu: 'ผัดกะเพรา',
      probability: '0.02%',
    },
  ];
  
  columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Menu',
      dataIndex: 'menu',
      key: 'menu',
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
    },
  ];

  render() {
    return <Table dataSource={this.dataSource} columns={this.columns} pagination={false} />;
  }
}

export default Result;
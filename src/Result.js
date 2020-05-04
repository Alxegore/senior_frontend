import React from 'react';
import { Table } from 'antd';

class Result extends React.Component {

  state = {
    predictResult: []
  }

  setPredictResult(predictResult){
    predictResult = predictResult.map((value, index) => {
      return {
        key: index + 1,
        rank: index + 1,
        menu: value[0],
        probability: (value[1] * 100).toFixed(2)
      }
    })
    this.setState({predictResult: predictResult})
  }
  
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

  componentDidMount(){
    this.setPredictResult(this.props.predictResult)
  }

  componentWillReceiveProps(nextProps){
    this.setPredictResult(nextProps.predictResult)
  }

  render() {
    return <Table dataSource={this.state.predictResult} columns={this.columns} pagination={false} />;
  }
}

export default Result;
import React from 'react';
import { Upload, message, Select, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class Avatar extends React.Component {
  state = {
    loading: false,
    selectModel: 'effb2',
    models: []
  };

  async componentDidMount(){
    let response = await fetch('https://thai-food-api.herokuapp.com/models')
    let data = await response.json()
    this.setState({models: data})
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleChange2 = value => {
    this.setState({selectModel: value})
  }

  predict = async (model, image, setPredictResult) => {
    if(!model in this.state.models){
      message.error('Invalid model');
      return
    }
    if(!image){
      message.error('Please upload image!');
      return
    }

    const reqOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'modelName': model, 'image': image })
    }
    
    let response = await fetch('https://thai-food-api.herokuapp.com/predict', reqOption)
    let data = await response.json()
    setPredictResult(data.predict)
    
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <React.Fragment>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <div>
          <Select className="selectModel" defaultValue="effb2" style={{ width: 220 }} onChange={this.handleChange2}>
            {
              this.state.models.map((value, index)=>{
                return <Option key={index} value={value}>{value}</Option>
              })
            }
          </Select>
        </div>
        <Button type="primary" shape="round" onClick = {() => {this.predict(this.state.selectModel, this.state.imageUrl, this.props.setPredictResult)}}> Predict </Button>
      </React.Fragment>
    );
  }
}

export default Avatar;

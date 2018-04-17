import React from 'react';
import Dropzone from 'react-dropzone';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(files) {
    this.setState({
      imageFile: files[0],
    });

    if (this.props.input) {
      const {
        input: { onChange },
      } = this.props;
      onChange(files[0]);
    } else if (this.props.onChange) {
      this.props.onChange(files[0]);
    } else {
      console.warn('redux-form-dropzone => Forgot to pass onChange props ?');
    }
  }

  render() {
    return (
      <Dropzone onDrop={this.onChange} {...this.props}>
        {this.state.imageFile ? (
          <img className={'addNews'} src={this.state.imageFile.preview} />
        ) : (
          <p
            style={{
              'text-align': 'center',
              margin: '25%',
            }}
          >
            click or drop image here
          </p>
        )}
      </Dropzone>
    );
  }
}
export default FileInput;

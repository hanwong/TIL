import React, { Component, PropTypes } from 'react';
import { Memo } from 'components';

const propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func
};

const defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    onRemove: (id, index) => {
        console.error('onRemove function not defined');
    }
};

class MemoList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo
                            data={memo}
                            ownership={ (memo.writer === this.props.currentUser) }
                            key={memo._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                />);
            });
        };

        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;

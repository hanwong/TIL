import React, { Component, PropTypes } from 'react';
import { Memo } from 'components';

const propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string
};

const defaultProps = {
    data: [],
    currentUser: ''
};

class MemoList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const mapToComponents = (data) => {
            return data.map((memo, i) => {
                return (<Memo
                    data={memo}
                    ownership={(memo.writer === this.props.currentUser)}
                    key={memo._id}
                />);
            })
        }
        return(
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;

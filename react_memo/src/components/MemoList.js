import React from 'react';
import { Memo } from 'components';

class MemoList extends React.Component {
    render() {
        return (
            <div>
                <Memo/>
            </div>
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string
};

MemoList.defaultProps = {
    data: [],
    currentUser: ''
};

export default MemoList;
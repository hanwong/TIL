import React from 'react';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleEdit() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const { data, ownership } = this.props;

        const memoView = (
            <div className="card">
               <div className="info">
                   <a className="username">{this.props.data.writer}</a> wrote a log ·
                   <TimeAgo date={this.props.data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                   <div className="option-button">
                       <a className='dropdown-button'
                            id={`dropdown-button-${data._id}`}
                            data-activates={`dropdown-${data._id}`}>
                           <i className="material-icons icon-button">more_vert</i>
                       </a>
                       <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                           <li><a>Edit</a></li>
                           <li><a>Remove</a></li>
                       </ul>
                   </div>
               </div>
               <div className="card-content">
                   {data.contents}
               </div>
               <div className="footer">
                   <i className="material-icons log-footer-icon star icon-button">star</i>
                   <span className="star-count">{data.starred.length}</span>
               </div>
           </div>
        );

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                     id={`dropdown-button-${data._id}`}
                     data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container memo">
               {this.state.editMode ? editView : memoView}
           </div>
        );
    }

    componentDidUpdate() {
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true
        });
    }

    componentDidMount() {
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true
        });
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true
}

export default Memo;

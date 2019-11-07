import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CategoryForm extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <BootstrapTable
                remote
                bootstrap4
                striped
                hover
                keyField="_id"
                data={this.state.categories}
                columns={columns}
                pagination={paginationFactory({page, sizePerPage, totalSize})}
                onTableChange={this.handleTableChange}
            />
        )
    }
}

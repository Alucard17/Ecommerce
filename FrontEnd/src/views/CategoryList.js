import React, {Component} from 'react'
// import Datatable from 'react-bs-datatable';
import {ButtonGroup, Button, Modal} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export default class CategoryList extends Component {
    state = {
        categories: [],
        selectedCategory: null,
        showDeleteModal: false,
        page: 1,
        sizePerPage: 5,
        totalSize: 0
    }
    async componentDidMount() {
        await this.fetchCategories();
    }
    async fetchCategories() {
        const {page, sizePerPage: limit} = this.state;
        let res = await (await fetch(`http://localhost:8080/category?page=${page}&limit=${limit}`)).json();
        this.setState({categories: res.docs, totalSize: res.totalDocs});
    }

    async deleteCategory() {
        const categoryID = this.state.selectedCategory._id;
        let res = await (await fetch(`http://localhost:8080/category/${categoryID}/delete`)).json();
        this.fetchCategories();
        this.setState({showDeleteModal: false});
    } 100

    showDeleteModal(row) {
        this.setState({selectedCategory: row, showDeleteModal: true});
    }
    handleTableChange = (type, {page, sizePerPage}) => {
        console.log(type);
        this.setState({page, sizePerPage}, () => this.fetchCategories());
    }
    render() {
        const columns = [
            {text: 'Name', dataField: 'name' },
            {text: 'Status', dataField: 'isActive', formatter: val => val ? 'Active' : 'In Active'},
            {text: 'Created At', dataField: 'createdAt'},
            {text: 'Updated At', dataField: 'updatedAt'},
            {
                text: 'Actions',
                dataField: "_id",
                formatter: (_, row) =>
                    <ButtonGroup>
                        <Button variant="danger" onClick={() => this.showDeleteModal(row)}><FaTrash /></Button>
                        <Button><FaEdit /></Button>
                    </ButtonGroup>
            }
        ]
        const {page, sizePerPage, totalSize} = this.state;
        const { SearchBar } = Search;
        return (
            <>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Category List</h1>
                </div>
                <ToolkitProvider
                    keyField="_id"
                    columns={columns}
                    data={this.state.categories}
                    search
                >
                    {
                        toolkitProps => [
                            <SearchBar {...toolkitProps.searchProps} />,
                            <BootstrapTable
                                { ...toolkitProps.baseProps }
                                remote
                                bootstrap4
                                striped
                                hover
                                pagination={paginationFactory({page, sizePerPage, totalSize})}
                                onTableChange={this.handleTableChange}
                            />
                        ]
                    }
                </ToolkitProvider>
                {this.showModal()}
            </>
        )
    }

    showModal() {
        return <Modal show={this.state.showDeleteModal} >
            <Modal.Header>
                <Modal.Title>Are You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({showDeleteModal: false})}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => this.deleteCategory()}>
                    <FaTrash /> Delete
                </Button>
            </Modal.Footer>
        </Modal>;
    }
}

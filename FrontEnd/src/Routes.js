import CreateCategory from "./views/CreateCategory";
import CategoryList from "./views/CategoryList";

const Routes = [
    {
        name: 'Category List',
        route: '/list',
        component: CategoryList
    },
    {
    name: 'Create Category',
    route: '/',
    component: CreateCategory
}
]

export default Routes;